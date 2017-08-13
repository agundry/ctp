import React from 'react';
import TextField from 'material-ui/TextField';

const renderTextField = props => (
    <TextField hintText={props.label}
               floatingLabelText={props.label}
               {...props}
    />
);

class CreateLeagueForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            avatar: ''
        }
    }

    handleSubmit = () => {
        this.props.submitAction(this.state.name, this.state.password, this.state.avatar);
    };

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };
    handleAvatarChange = (event) => {
        this.setState({avatar: event.target.value});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField name="name" hintText="League Name" floatingLabelText="League Name" label="League Name" onChange={this.handleNameChange}/>
                </div>
                <div>
                    <TextField name="password" hintText="Password" floatingLabelText="Password" label="Password" onChange={this.handlePasswordChange}/>
                </div>
                <div>
                    <TextField name="avatar" hintText="Avatar Link" floatingLabelText="Avatar Link" label="Avatar Link" onChange={this.handleAvatarChange}/>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

CreateLeagueForm.propTypes = {
    submitAction: React.PropTypes.func.isRequired,
};

CreateLeagueForm.defaultProps = {
    submitBtnLabel: "Submit",
};

export default CreateLeagueForm;
