import React from 'react';
import EmailPasswordForm from '../components/forms/EmailPasswordForm';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    loginWithPassword(e) {
        e.preventDefault();
        const email = $('#email').val(),
            password = $('#password').val().trim()
            ;

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                console.log("There was an error:" + error.reason);
            } else {
                FlowRouter.go('/');
            }
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h1>Login</h1>
                    <EmailPasswordForm submitBtnLabel="Login" submitAction={this.loginWithPassword}/>
                    {this.props.registerLink}
                </div>
            </div>
        );
    }
}

Login.defaultProps = {
    registerLink: <p>Don't have an account? <a href="/register">Register</a></p>
}

export default Login;
