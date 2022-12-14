import React, {useEffect, useState} from 'react';
import {getUsers} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import UserListItem from "./UserListItem";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "./Spinner";

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0
    })

    const [fail, setFail] = useState(false);

    const pendingApiCall = useApiProgress('get','/api/1.0/users?page');

    useEffect(() => {
        loadUsers();
    }, []);

    const nextOnClick = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }

    const previousOnClick = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = async (number) => {
        setFail(false);
        try{
            const response = await getUsers(undefined,number);
            setPage(response.data);
        } catch (e) {
            setFail(true);
        }
        // getUsers(undefined, number).then(response => {
        //     setPage(response.data);
        // }).catch(error => {
        // })
    }

    const {t} = useTranslation();
    const {content: users, first, last} = page;

    let actionDiv = (<div>
        {first === false &&
            <button className="btn btn-sm btn-light" onClick={previousOnClick}>{t('Previous')}</button>}
        {last === false &&
            <button className="btn btn-sm btn-light float-end" onClick={nextOnClick}>{t('Next')}</button>}
    </div>)

    if(pendingApiCall) {
        actionDiv = (
            <Spinner />
        )
    }

    return (
        <div className="card">
            <h3 className="card-header text-center">{t("Users")}</h3>
            <div className="list-group list-group-flush">
                {users.map(user => <UserListItem key={user.username} user={user}/>)}
            </div>
            {actionDiv}
            {fail && <div className="text-danger text-center">{t("Fail Load")}</div>}
        </div>
    );
}

export default UserList;