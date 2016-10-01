import React from 'react';
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
                password: password
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

Register.propTypes = {
    submitAction: React.PropTypes.func.isRequired,
}

Register.defaultProps = {
    loginLink: <p>Already have an account? <a href="/login">Sign In</a></p>,
}

export default Register;