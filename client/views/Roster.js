import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import SearchBar from '../components/forms/SearchBar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const CardEntry = (props) => {
    dropCard = (cardId) => {
        Meteor.call('/cards/drop', cardId, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }.bind(this));
    };

    return (
        <ListItem
            primaryText={props.title}
            secondaryText={
                <p>
                    {props.category + ' • ' + props.points_earned}
                    <br/>
                    {props.description}
                </p>
            }
            secondaryTextLines={2}
            leftAvatar={<Avatar src={props.thumbnail} size={50}/>}
            rightIconButton={
                <IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onClick={() => dropCard(props._id)}>Delete</MenuItem>
                </IconMenu>
            }
        />
    );
};


class Roster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_card: null,
            isLoading: false,
            selectedCategory: "NBA Team",
        };
    }

    handleChange(e) {
        this.setState({selectedCategory: e.target.value});
    }

    searchWiki(inputValue) {
        Meteor.call('/cards/search', inputValue, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                this.setState({searched_card:result});
            }
        }.bind(this));
    }

    draftCard(title, pageId, description, thumbnail) {
        let card = this.state.searched_card;
        console.log(this.state);
        Meteor.call('/cards/draft', card.title, card.pageId, card.description, this.state.selectedCategory, card.thumbnail, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
            }
        }.bind(this));
    }

    clearSearch() {
        this.setState({
            searched_card: null
        });
        Meteor.call('/scores/nba', function (error, result) {
            if (error) {
                console.log(error);
            }
        });
    }

    render() {
        var select_category=
            <select name="category" id="category" onChange={this.handleChange.bind(this)}>
                <option selected value="NBA Team">NBA Team</option>
                <option value="MLB Team">MLB Team</option>
                <option value="NFL Team">NFL Team</option>
                <option value="NHL Team">NHL Team</option>
                <option value="College Football Team">College Football</option>
                <option value="UEFA Team">UEFA Team</option>
                <option value="Best Picture">Best Picture</option>
                <option value="Billboard Top 10">Billboard Top 10</option>
                <option value="National GDP">National GDP</option>
                <option value="Rotten Tomatoes Rating">Rotten Tomatoes Rating</option>
                <option value="Stock">Stock</option>
                <option value="Alcohol Sales">Alcohol Sales</option>
                <option value="Twitter Handle">Twitter Handle</option>
            </select>;

        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <h1>Search</h1>
                    <SearchBar isLoading={this.state.isLoading} onChange={this.searchWiki.bind(this)} clearSearch={this.clearSearch.bind(this)} />
                    {this.state.searched_card &&
                        <Paper className="ResultsList">
                            <List>
                                <ListItem
                                    primaryText={this.state.searched_card.title}
                                    secondaryText={
                                        <p>
                                            {this.state.searched_card.description}<br />
                                            {select_category}
                                        </p>
                                    }
                                    secondaryTextLines={2}
                                    leftAvatar={<Avatar src={this.state.searched_card.thumbnail} size={50}/>}
                                    rightIconButton={
                                        <IconButton onClick={this.draftCard.bind(this)} tooltip="Draft">
                                            <AddShoppingCart hoverColor="gray"/>
                                        </IconButton>
                                    }
                                />
                            </List>
                        </Paper>
                    }
                    <h1 className="TeamHeader">Your Team</h1>
                    {this.props.cards &&
                        <Paper className="Team">
                            <List>
                                {this.props.cards.map((item, i, items) => {
                                    return (
                                        <div key={item._id}>
                                            <CardEntry {...item}/>
                                            {i < items.length - 1 && <Divider />}
                                        </div>
                                    )
                                })}
                            </List>
                        </Paper>
                    }
                </div>
            </div>
        );
    }
}
Roster.propTypes = {
    cards: React.PropTypes.array,
    loading: React.PropTypes.bool,
    cardsExist: React.PropTypes.bool,
};

export default Roster;