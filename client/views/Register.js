import React from 'react';
import {Meteor} from 'meteor/meteor';
import EmailPasswordForm from '../components/forms/EmailPasswordForm';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    createUser(e) {
        e.preventDefault();
        const
            email = $('#email').val(),
            password = $('#password').val().trim()
            ;

        Accounts.createUser(
            {
                email: email,
                password: password,
                waiver_spot: Meteor.users.find().count() + 1,
                points: 0
            },
            function(error) {
                if (error) {
                    console.log("there was an error: " + error.reason);
                } else {
                    FlowRouter.go('home');
                };
            }
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h1>Register</h1>
                    <EmailPasswordForm
                        submitBtnLabel="Register"
                        submitAction={this.createUser}
                    />
                    {this.props.loginLink}
                </div>
            </div>
        );
    }
}

Register.defaultProps = {
    loginLink: <p>Already have an account? <a href="/login">Sign In</a></p>,
};

export default Register;