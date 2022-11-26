import React, { Component } from "react";
import Input from '../components/Input'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { withTranslation } from 'react-i18next'
import { login } from '../api/apiCalls'
import ButtonWithProgress from '../components/ButtonWithProgress';
//import { withApiProgress } from '../shared/ApiProgress';
import { Authentication } from '../shared/AuthenticationContext';

class UserLoginPage extends Component {

    static contextType = Authentication; //react tools component kısmında context alanının geldiğini göreceksin. Bu işi yapıyor.

    state = {
        username: null,
        password: null,
        error: null,
        pendingApiCall: false
    };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        })
    }

    onClickLogin = async e => {
        e.preventDefault();
        const { username, password } = this.state;
        const { onLoginSuccess } = this.context;
        const credits = {
            username,
            password
        };

        const { push } = this.props.history;

        this.setState({
            error: null
        });

        this.setState({ pendingApiCall: true })

        try {
            const response = await login(credits);
            push('/');
            const authState = {
                ...response.data,
                // username: username,
                // displayName: response.data.displayName,
                // image: response.data.image,
                password
            }
            onLoginSuccess(authState)
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }

        this.setState({ pendingApiCall: false })
    }

    render() {
        const { t } = this.props;
        const { username, password, error, pendingApiCall } = this.state;
        const buttonEnabled = username && password;

        return (
            <div className="container">
                <form>
                    <h1 className='text-center'>{t("Login")}</h1>
                    <Input name="username" label={t("Username")} onChange={this.onChange} />
                    <Input name="password" label={t("Password")} onChange={this.onChange} type="password" />
                    {error &&
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>}
                    <div className="text-center">
                        <ButtonWithProgress
                            pendingApiCallBack={pendingApiCall}
                            onClick={this.onClickLogin}
                            disabled={!buttonEnabled || pendingApiCall}
                            text={t("Login")}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

// const UserLoginPageWithTranslation = withApiProgress(UserLoginPage, '/api/1.0/auth');

export default withTranslation()(UserLoginPage);