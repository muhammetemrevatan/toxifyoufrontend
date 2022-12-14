import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import UserPage from '../pages/UserPage';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserLoginPage from '../pages/UserLoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import TopBar from '../components/TopBar';
import {useSelector} from 'react-redux';

const App = () => {
    const {isLoggedIn} = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn
    }));
    return (
        <div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    {!isLoggedIn && <Route path="/login" component={UserLoginPage}/>}
                    {!isLoggedIn && <Route path="/signup" component={UserSignupPage}/>}
                    <Route path="/user/:username" component={UserPage}/>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
