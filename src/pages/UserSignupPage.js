import React from 'react';
import { signup, changeLanguage } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next'
import "/node_modules/flag-icons/css/flag-icons.min.css";

class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCallBack: false,
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

        this.setState({ pendingApiCallBack: true });

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }
        this.setState({ pendingApiCallBack: false })
    };

    render() {

        const { pendingApiCallBack, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t } = this.props;

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Sign up')}</h1>
                    <Input name="username" label={t("Username")} error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange} />
                    <Input name="password" label={t("Password")} error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} onChange={this.onChange} type="password" />
                    <div className='text-center'>
                        <button className='btn btn-primary mt-3' type='button' disabled={pendingApiCallBack || passwordRepeat !== undefined} onClick={this.onClickSignup}>
                            {pendingApiCallBack && <span className='spinner-border spinner-border-sm me-2'></span>}
                            {t('Sign up')}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withTranslation()(UserSignupPage);              
