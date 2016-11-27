import React from 'react';
import AppHeader from './layout/AppHeader';
import Dropdown from './navigation/Dropdown';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    showUserNav(){
        let userNavOptions = [
            {
                label: "Sign Out",
                path: "/logout"
            },
            {
                label: "My Profile",
                path: "/profile"
            }
        ];

        return  this.props.signedIn?
            <Dropdown
                dropDownTitle={this.props.currentUser.emails[0].address}
                dropDownOptions={userNavOptions}
            />
            :
            <ul className="nav navbar-nav navbar-right"><li><a href="/login">Login</a></li> <li><a href="/register">Register</a></li></ul>
            ;

    }

    render() {
        return this.props.subReady?

            <MuiThemeProvider>
                <div className="app-container">
                    <AppHeader appTitle="Chicken Tender Party" userNav={this.showUserNav()}/>
                    <main className="container">
                        {this.props.content}
                    </main>
                    <Alert stack={{limit: 3}} timeout={2000} />
                </div>
            </MuiThemeProvider>
        :
            <MuiThemeProvider>
                <div className="app-container">
                    Loading...
                </div>
            </MuiThemeProvider>
        ;
    }
}

App.propTypes = {
    subReady: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
    signedIn: React.PropTypes.bool
};

export default App;