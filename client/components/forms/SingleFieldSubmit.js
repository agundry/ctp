import React from 'react';

class SingleFieldSubmit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.props.inputValue
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(e){
        this.setState({inputValue: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleInput(this.state.inputValue.trim());
        this.setState({ inputValue: "" });
    }

    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input
                        className="form-control full-width"
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.state.inputValue}
                        onChange={this.updateInputValue}
                    />
                </div>
            </form>
        )
    }
};


SingleFieldSubmit.propTypes = {
    handleInput: React.PropTypes.func.isRequired
};

SingleFieldSubmit.defaultProps = {
    inputValue:  "",
    placeholder: "New..."
};


export default SingleFieldSubmit;