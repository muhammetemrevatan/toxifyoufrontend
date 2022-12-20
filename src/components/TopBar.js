import React, {useEffect, useRef, useState} from 'react';
import logo from '../assets/logo.PNG';
import {Link, useHistory, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {logoutSuccess} from '../redux/authActions';
import LanguageSelector from "./LanguageSelector";
import ProfileImage from "./ProfileImage";

const TopBar = (props) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {username, isLoggedIn, displayName, image} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image
    }));

    const [menuVisible, setMenuVisible] = useState("dropdown-menu p-1 shadow");

    useEffect(() => {
        document.addEventListener('click',menuClickTracker);
        return () => {
            document.removeEventListener('click',menuClickTracker);
        }
    },[isLoggedIn]);

    const menuClickTracker = (e) => {
        if (e.target.className.includes("dropdown-menu-control-tracker")) {
            setMenuVisible("dropdown-menu p-1 shadow show");
        }else{
            setMenuVisible("dropdown-menu p-1 shadow");
        }
    }

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
        push('/');
    }

    let links = (
        <ul className='navbar-nav'>
            <li>
                <Link className='nav-link text-light' to="/login">
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
                <li className="nav-item dropdown">
                    <div className="d-flex"
                         style={{cursor: "pointer"}}
                         onClick={() => setMenuVisible(menuVisible + " show")}
                    >
                        <ProfileImage image={image} width="32" height="32" className="rounded-circle m-auto dropdown-menu-control-tracker"/>
                        <span className="text-nowrap nav-link dropdown-toggle text-light dropdown-menu-control-tracker">{displayName}</span>
                    </div>
                    <div className={menuVisible}>
                        <Link className='dropdown-item d-flex p-2' to={`/user/${username}`}>
                            <i className="material-icons me-2 text-primary">
                                person
                            </i>
                            {t('My Profile')}
                        </Link>
                        <span className='dropdown-item d-flex p-2' style={{cursor: 'pointer'}}
                              onClick={onLogoutSuccess}>
                            <i className="material-icons me-2 text-danger">
                                power_settings_new
                            </i>
                            {t('Logout')}
                        </span>
                    </div>
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
                <div className="flex-md-fill ms-3 me-5">
                    <input type="search" className="form-control" placeholder="Search"/>
                </div>
                <div className="d-flex ms-auto">
                    {links}
                    <LanguageSelector/>
                </div>
            </nav>
        </div>
    )
}
export default TopBar;