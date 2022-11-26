import React, { Component } from 'react'

export const Authentication = React.createContext();

class AuthenticationContext extends Component {
    state = { //stateful bir component
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    onLoginSuccess = authState => { // state icerisini degistirebilen callback fonksiyonu
        this.setState({
            ...authState, // asagida yoruma aldigin yer ile ayni seyi yapiyor. auth state json objesi gibi asagidaki sekilde gonderilecek.
            // username: authState.username,
            // displayName: authState.displayName,
            // password: authState.password,
            // image: authState.image,
            isLoggedIn: true
        });
    };

    onLogoutSuccess = () => { // state icerisini degistirebilen callback fonksiyonu
        this.setState({
            username: undefined,
            isLoggedIn: false
        });
    };

    render() {
        return (
            <Authentication.Provider value={{
                state: { ...this.state },
                onLoginSuccess: this.onLoginSuccess,
                onLogoutSuccess: this.onLogoutSuccess
            }}>
                {this.props.children} {/*index.js icerisinde AuthenticationContext icindeki App buradaki children'a denk geliyor.*/}
            </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;
