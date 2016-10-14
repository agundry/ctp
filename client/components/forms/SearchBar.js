import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Clear from 'material-ui/svg-icons/content/clear';
import {blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import NearMe from 'material-ui/svg-icons/maps/near-me';
import Paper from 'material-ui/Paper';
import Search from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldValue: ''
        }
    }

    clearField() {
        this.setState({textFieldValue: ''});
        this.props.clearSearch();
    };

    handleTextFieldChange(e) {
        this.setState({textFieldValue: e.currentTarget.value});
    };

    searchClickHandler (e) {
        this.state.textFieldValue && this.props.onChange(this.state.textFieldValue, false);
    };

    enterKeyHandler (e) {
        if (e.key == 'Enter') {
            this.props.onChange(this.state.textFieldValue, false);
        }
    };

    nearMeClickHandler (e) {
        this.props.onChange(null, true);
        this.setState({textFieldValue: 'Current location'});
    };

    render() {
        const nearButton = navigator.geolocation ? (
            <div className="SearchBar-near">
                <IconButton
                    onTouchTap={this.nearMeClickHandler.bind(this)}
                    tooltip="Use my location"
                    tooltipPosition="bottom-right"
                >
                    <NearMe color={blue500}/>
                </IconButton>
            </div>
        ) : null;
        const clearButton = this.props.isLoading ? (
            <div className="SearchBar-clear">
                <CircularProgress size={.33} />
            </div>
        ) : (
            <div className="SearchBar-clear">
                <IconButton onTouchTap={this.clearField.bind(this)} tooltip="Clear">
                    <Clear hoverColor="gray"/>
                </IconButton>
            </div>
        );

        return (
            <Paper className="SearchBar">
                {nearButton}
                <TextField
                    value={this.state.textFieldValue}
                    onChange={this.handleTextFieldChange.bind(this)}
                    underlineShow={false}
                    className="SearchBar-field"
                    hintText="Search by address"
                    onKeyPress={this.enterKeyHandler.bind(this)}
                />
                <IconButton
                    onTouchTap={this.searchClickHandler.bind(this)}
                    tooltip="Search"
                >
                    <Search hoverColor="gray"/>
                </IconButton>
                {this.state.textFieldValue && clearButton}
            </Paper>
        );
    }
}

export default SearchBar;