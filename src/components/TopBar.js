import React from 'react';
import logo from '../assets/logo.PNG';
import {Link, useHistory, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {logoutSuccess} from '../redux/authActions';
import LanguageSelector from "./LanguageSelector";

const TopBar = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {username, isLoggedIn} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username
    }));

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
        push('/');
    }

    let links = (
        <ul className='navbar-nav'>
            <li>
                <Link className='nav-link text-light ' to="/login">
                    {t('Login')}
                </Link>
            </li>
            <li>
                <Link className='nav-link text-light text-nowrap' to="/signup">
                    {t('Sign up')}
                </Link>
            </li>
        </ul>
    );
    if (isLoggedIn) {
        links = (
            <ul className='navbar-nav'>
                <li>
                    <Link className='nav-link btn btn-outline-warning text-light' to={`/user/${username}`}>
                         {username}
                    </Link>
                </li>
                <li className='nav-link btn btn-outline-danger ms-2 text-nowrap text-light' style={{cursor: 'pointer'}}
                    onClick={onLogoutSuccess}>
                    {t('Logout')}
                </li>
            </ul>
        )
    }
    return (
        <div className='shadow-sm mb-2 bg-primary'>
            <nav className="navbar navbar-light container navbar-expand">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60" height="60" className="me-2" alt="Toxifyou Logo"/>
                    <div className='d-inline nav-link text-light'>ToxifYou</div>
                </Link>
                <div className="d-flex ms-auto">
                    {links}
                    <LanguageSelector/>
                </div>
            </nav>
        </div>
    )
}
export default TopBar;