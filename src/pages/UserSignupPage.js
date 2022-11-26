import React, { Component } from "react";
import { signup } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';

class UserSignupPage extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        const { value, name } = event.target;
        const errors = { ...this.state.errors };
        const { t } = this.props
        errors[name] = undefined;
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
                errors.password = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.password = t('Password mismatch');
                errors.passwordRepeat = t('Password mismatch');
            } else {
                errors.passwordRepeat = undefined;
                errors.password = undefined;
            }
        }
        this.setState({
            [name]: value, errors
        });
    };

    onClickSignup = async event => {
        event.preventDefault();

        const { username, displayName, password } = this.state;

        const body = {
            username,
            displayName,
            password
        }

        try {
            await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
    };

    render() {

        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t, pendingApiCall } = this.props;

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Sign up')}</h1>
                    <Input name="username" label={t("Username")} error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange} />
                    <Input name="password" label={t("Password")} error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.onChange} type="password" />
                    <div className='text-center'>
                        <ButtonWithProgress
                            pendingApiCallBack={pendingApiCall}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            onClick={this.onClickSignup}
                            text={t('Sign up')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, '/api/1.0/users')

export default withTranslation()(UserSignupPageWithApiProgress);           
