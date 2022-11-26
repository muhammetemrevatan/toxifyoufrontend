import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserLoginPage from '../pages/UserLoginPage';
import UserSignupPage from '../pages/UserSignupPage';
import TopBar from '../components/TopBar';
import { Authentication } from '../shared/AuthenticationContext';

class App extends React.Component {
  static contextType = Authentication;
  render() {
    const isLoggedIn = this.context.state.isLoggedIn;
    return (
      <Router>
        <div>
          <TopBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && <Route path="/login" component={UserLoginPage} />}
            <Route path="/signup" component={UserSignupPage} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
          <LanguageSelector />
        </div>
      </Router >
    );
  }
}

export default App;
