import React, {useEffect, useState} from "react";
import Input from '../components/Input'
import {useTranslation} from 'react-i18next'
import ButtonWithProgress from '../components/ButtonWithProgress';
import {useApiProgress} from '../shared/ApiProgress';
import {useDispatch} from "react-redux";
import {loginHandler} from "../redux/authActions";

const UserLoginPage = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);
    }, [username, password])

    const onClickLogin = async e => {
        e.preventDefault();
        const credits = {username, password};

        const {history} = props;
        const {push} = history;

        setError(undefined);
        try {
            await dispatch(loginHandler(credits));
            push('/');
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    }

    const {t} = useTranslation();
    const pendingApiCall = useApiProgress('post', '/api/1.0/auth');
    const buttonEnabled = username && password;

    const enterKeyClick = (e) => {
        if (e.code === "Enter") {
            onClickLogin(e)
                .then(r => {
                    console.log('Authenticate');
                })
                .catch(x => {
                    console.log('Not Authenticate');
                });
        }
    }

    return (<div className="container">
        <form onKeyDown={enterKeyClick}>
            <h1 className='text-center'>{t("Login")}</h1>
            <Input label={t("Username")} onChange={e => setUsername(e.target.value)}/>
            <Input label={t("Password")} onChange={e => setPassword(e.target.value)} type="password"/>
            {error && <div className="alert alert-danger mt-3">
                {error}
            </div>}
            <div className="text-center">
                <ButtonWithProgress
                    pendingApiCallBack={pendingApiCall}
                    onClick={onClickLogin}
                    disabled={!buttonEnabled || pendingApiCall}
                    text={t("Login")}
                />
            </div>
        </form>
    </div>)
}
export default UserLoginPage;