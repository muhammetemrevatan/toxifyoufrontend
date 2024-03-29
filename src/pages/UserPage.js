import React, {useEffect, useState} from 'react';
import ProfileCard from '../components/ProfileCard';
import {getUser} from "../api/apiCalls";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useApiProgress} from "../shared/ApiProgress";
import Spinner from "../components/Spinner";
import PostFeed from "../components/PostFeed";

const UserPage = () => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    // const {username} = props.match.params;
    const {username} = useParams();

    const {t} = useTranslation();

    const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
                setNotFound(false);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadUser();
    }, [username]);

    if (notFound) {
        return (<div className="container">
            <div className="alert alert-danger text-center">
                <div>
                    <i className="material-icons" style={{fontSize: '48px'}}>
                        new_releases
                    </i>
                </div>
                {t('User not found')}
            </div>
        </div>)
    }

    if (pendingApiCall || user.username !== username) {
        return <Spinner/>;
    }


    return (
        <div className='container'>
            <ProfileCard user={user}/>
            <PostFeed />
        </div>);
};

export default UserPage;