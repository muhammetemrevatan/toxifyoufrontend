import React, {useState} from "react";
import Input from '../components/Input';
import {useTranslation} from 'react-i18next'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ButtonWithProgress from '../components/ButtonWithProgress';
import {useApiProgress} from '../shared/ApiProgress';
import {signupHandler} from "../redux/authActions";
import {useDispatch} from "react-redux";

const UserSignupPage = (props) => {

    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        email: null,
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const onChange = event => {
        const {value, name} = event.target;
        // const errorsCopy = {...errors};
        // errorsCopy[name] = undefined;
        // setErrors(errorsCopy);
        setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
        // const formCopy = {...form};
        // formCopy[name] = value;
        // setForm(errorsCopy);
        setForm((previousForm) => ({...previousForm, [name]: value}));
    };

    const onClickSignup = async event => {
        event.preventDefault();

        const {username, displayName, password, email} = form;

        const {history} = props;
        const {push} = history;

        const body = {
            username,
            displayName,
            password,
            email
        }

        try {
            await dispatch(signupHandler(body));
            push('/');
        } catch (error) {
            console.log(error)
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    };

    const {
        username: usernameError, displayName: displayNameError, password: passwordError, email: emailError
    } = errors;
    const pendingApiCallSignup = useApiProgress('post', '/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post', '/api/1.0/auth');
    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;
    const {t} = useTranslation();

    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch');
    }
    return (
        <div className='container'>
            <form>
                <h1 className='text-center'>{t('Sign up')}</h1>
                <Input name="username" label={t("Username")} error={usernameError}
                       onChange={onChange}/>
                <Input name="email" label={t("Email")} error={emailError}
                       onChange={onChange}/>
                <Input name="displayName" label={t("Display Name")} error={displayNameError}
                       onChange={onChange}/>
                <Input name="password" label={t("Password")} error={passwordError}
                       onChange={onChange}
                       type="password"/>
                <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeatError}
                       onChange={onChange} type="password"/>
                <div className='text-center'>
                    <ButtonWithProgress
                        pendingApiCallBack={pendingApiCall}
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        onClick={onClickSignup}
                        text={t('Sign up')}
                        className = 'btn btn-primary mt-2'
                    />
                </div>
            </form>
        </div>
    );
}
export default UserSignupPage;
