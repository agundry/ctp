import React from 'react';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    getDropdownItems(){
        return this.props.dropDownOptions.map((item, index) => {
            return <li key={index}>
                <a href={item.path}>{item.label}</a>
            </li>;
        });
    }

    render() {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.dropDownTitle} <span className="caret"></span></a>
                    <ul className="dropdown-menu">
                        {this.getDropdownItems()}
                    </ul>
                </li>
            </ul>
        );
    }
}

Dropdown.propTypes = {
    dropDownOptions: React.PropTypes.array.isRequired
}

Dropdown.defaultProps = {
    dropDownTitle: "Select..."
}

export default Dropdown;