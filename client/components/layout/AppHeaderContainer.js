import React from 'react';

class AppHeaderContainer extends React.Component {
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

        return  this.data.signedIn?
            <Dropdown
                dropDownTitle={this.data.currentUser.emails[0].address}
                dropDownOptions={userNavOptions}
            />
            :
            <ul className="nav navbar-nav navbar-right"><li><a href="/login">Login</a></li> <li><a href="/register">Register</a></li></ul>
            ;

    }

    render() {
        return (
            <div>Hello, world.</div>
        );
    }
}

export default AppHeaderContainer;