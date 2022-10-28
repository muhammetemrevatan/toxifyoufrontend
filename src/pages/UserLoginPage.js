import React, { Component } from "react";
import Input from '../components/Input'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { withTranslation } from 'react-i18next'
import { login } from '../api/apiCalls'

class UserLoginPage extends React.Component {

    state = {
        username: null,
        password: null
    };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onClickLogin = e => {
        e.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        }
        login(creds);
    }

    render() {
        const { username, password } = this.state;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className='text-center'>{t("Login")}</h1>
                    <Input name="username" label={t("Username")} onChange={this.onChange} />
                    <Input name="password" label={t("Password")} onChange={this.onChange} type="password" />
                    <div className="text-center">
                        <button className='btn btn-primary mt-3' type='button' onClick={this.onClickLogin}>
                            {t("Login")}
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withTranslation()(UserLoginPage);