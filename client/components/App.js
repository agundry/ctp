import React from 'react';
import AppHeader from './layout/AppHeader';
import Dropdown from './navigation/Dropdown';

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

            <div className="app-container">
                <AppHeader appTitle="Chicken Tender Party" userNav={this.showUserNav()}/>
                <main className="container">
                    {this.props.content}
                </main>
            </div>
        :
            <div className="app-container">
                Loading...
            </div>
        ;
    }
}

App.propTypes = {
    subReady: React.PropTypes.bool,
    currentUser: React.PropTypes.object,
    signedIn: React.PropTypes.bool
};

export default App;