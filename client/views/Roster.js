import React from 'react';
import SingleFieldSubmit from '../components/forms/SingleFieldSubmit';
// import { Meteor } from 'meteor/meteor';
import '../../imports/api/cards';

const Roster_Entry = (props) => {
    const openString = isOpen ? 'Open now' : 'Closed now';
    const availableString = [breakfast, lunch, snack].join(' ').trim();

    return (
        <ListItem
            primaryText={props.name}
            secondaryText={
                <p>
                    {props.street_address}<br />
                    {availableString && availableString + ' • '} <strong>{openString}</strong>
                </p>
            }
            secondaryTextLines={2}
            onTouchTap={maps_redirect(props)}
            rightIcon={(props.distance &&
                <Badge
                    badgeContent={(
                        <span
                            dangerouslySetInnerHTML={{__html: `${props.distance.toFixed(1)}&nbsp;mi`}} />
                    )}
                    badgeStyle={{background: "transparent"}}
                />
            )}
        />
    );
};

Result.defaultProps = {
    name: '',
    street_address: '',
    city: '',
    postal_code: '',
    meal_types: [],
    meal_hours: [],
    distance: 0
};


class Roster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_card: ''
        }
    }

    searchWiki(inputValue) {
        Meteor.call('/cards/search', inputValue, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                this.setState({searched_card:result});
            }
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h1>Roster</h1>
                    <SingleFieldSubmit
                        handleInput={this.searchWiki}
                    />
                    {this.props.loginLink}
                </div>
            </div>
        );
    }
}

export default Roster;