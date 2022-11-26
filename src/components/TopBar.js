import React, { Component } from 'react';
import logo from '../assets/logo.PNG';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Authentication } from '../shared/AuthenticationContext';

class TopBar extends Component {

    static contextType = Authentication;

    render() {
        const { t } = this.props;
        const { state, onLogoutSuccess } = this.context;
        const { isLoggedIn, username } = state;
        let links = (
            <ul className='navbar-nav ms-auto'>
                <li>
                    <Link className='nav-link' to="/login">
                        {t('Login')}
                    </Link>
                </li>
                <li>
                    <Link className='nav-link' to="/signup">
                        {t('Sign up')}
                    </Link>
                </li>
            </ul>
        );
        if (isLoggedIn) {
            links = (
                <ul className='navbar-nav ms-auto'>
                    <li>
                        <Link className='nav-link' to={`/user/${username}`}>
                            {username}
                        </Link>
                    </li>
                    <li className='nav-link' style={{ cursor: 'pointer' }} onClick={onLogoutSuccess}>
                        {t('Logout')}
                    </li>
                </ul>
            )
        }
        return (
            <div className='shadow-sm bg-light mb-2'>
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" height="60" className="d-inline-block align-top" alt="Toxifyou Logo" />
                        ToxifYou
                    </Link>
                    {links}

                </nav>
            </div>
        )
    }
}

export default withTranslation()(TopBar);