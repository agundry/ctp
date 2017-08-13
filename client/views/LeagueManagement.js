import React from 'react';
import Paper from 'material-ui/Paper';
import CreateLeague from '../components/forms/CreateLeague'
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import SearchBar from '../components/forms/SearchBar';
import StandingsBar from '../views/StandingsBar';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import AddBox from 'material-ui/svg-icons/content/add-box';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Alert from 'react-s-alert';

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

// const CardEntry = (props) => {
//     dropCard = (cardId) => {
//         Meteor.call('/cards/drop', cardId, function(error, result) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(result);
//             }
//         }.bind(this));
//     };
//
//     return (
//         <ListItem
//             primaryText={props.title}
//             secondaryText={
//                 <p>
//                     {props.category + ' • ' + props.points_earned}
//                     <br/>
//                     {props.description}
//                 </p>
//             }
//             secondaryTextLines={2}
//             leftAvatar={<Avatar src={props.thumbnail} size={50}/>}
//             rightIconButton={
//                 <IconMenu iconButtonElement={iconButtonElement}>
//                     <MenuItem onClick={() => dropCard(props._id)}>Delete</MenuItem>
//                 </IconMenu>
//             }
//         />
//     );
// };

class LeagueManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searched_card: null,
            isLoading: false,
            selectedCategory: "NBA Team",
            selected_league: null,
            selected_league_users: null,
        };
    }

    handleChange(e) {
        this.setState({selectedLeague: e.target.value});
    }

    showLeagueUsers(league_id) {
        user_ids = UserLeagues.find({league_id: league_id});
        this.setState({selected_league: league_id, selected_user_cards: Meteor.users.find({_id: {$in: user_ids}})});
    }

    // searchWiki(inputValue) {
    //     Meteor.call('/cards/search', inputValue, function(error, result) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             this.setState({searched_card:result});
    //         }
    //     }.bind(this));
    // }

    createLeague(name, token, avatar) {
        Meteor.call('/leagues/create', name, token, avatar, function(error, result) {
            if (error) {
                console.log(error);
                Alert.error(error.error, {position: 'top-right', timeout: 3000});
            } else {
                console.log(result);
            }
        }.bind(this));

    }

    clearSearch() {
        this.setState({
            searched_card: null
        });
        Meteor.call('/scores/nfl', function (error, result) {
            if (error) {
                console.log(error);
            }
        });
        Meteor.call('/scores/nhl', function (error, result) {
            if (error) {
                console.log(error);
            }
        });
        Meteor.call('/scores/nba', function (error, result) {
            if (error) {
                console.log(error);
            }
        });
        Meteor.call('/scores/roster', function (error, result) {
            if (error) {
                console.log(error);
            }
        });
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <Paper className="LeaguesList">
                        <div className="col-md-3">
                            <h1 className="LeaguesListHeader">Your Leagues</h1>
                            <List>
                                {this.props.leagues.map((item, i, items) => {
                                    return (
                                        <div key={item.name}>
                                            <ListItem primaryText={item.name}/>
                                            <Divider />
                                        </div>
                                    )
                                })}
                                <ListItem primaryText="Create New" rightIcon={<AddBox />} />
                            </List>
                        </div>
                        <div className="col-md-9">
                            <CreateLeague submitAction={this.createLeague}/>
                        </div>
                    </Paper>
                </div>
                {/* If there is a selected_user, show standings bar*/}
                {/*{this.state.selected_user &&*/}
                    {/*<StandingsBarContainer onChange={this.showUserTeam.bind(this)} selectedUser={this.state.selected_user}/>*/}
                {/*}*/}
                {/*<div className="col-md-6">*/}
                    {/*<h1 className="TeamHeader">Your Leagues</h1>*/}
                    {/*{this.state.selected_user_cards &&*/}
                        {/*<Paper className="Team">*/}
                            {/*<List>*/}
                                {/*{this.state.selected_user_cards.map((item, i, items) => {*/}
                                    {/*return (*/}
                                        {/*<div key={item._id}>*/}
                                            {/*<CardEntry {...item}/>*/}
                                            {/*{i < items.length - 1 && <Divider />}*/}
                                        {/*</div>*/}
                                    {/*)*/}
                                {/*})}*/}
                            {/*</List>*/}
                        {/*</Paper>*/}
                    {/*}*/}
                {/*</div>*/}
            </div>
        );
    }
}
LeagueManagement.propTypes = {
    loading: React.PropTypes.bool,
    leaguesExist: React.PropTypes.bool,
    leagues: React.PropTypes.array,
};

export default LeagueManagement;