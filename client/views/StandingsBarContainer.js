import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import StandingsBar from './StandingsBar';

export default StandingsBarContainer = createContainer(props => {
    // Subscriptions
    const all_users_subscription = Meteor.subscribe("allUsers");
    const scores_subscription = Meteor.subscribe("recordedScores");

    // If subscription is ready, page is done loading
    const loading = !all_users_subscription.ready();

    // Users in descending order of points
    const all_users = Meteor.users.find({}, {sort: { points: -1 }}).fetch();

    return {
        users: all_users,
        onChange: props.onChange,
        selectedUser: props.selectedUser,
    };
}, StandingsBar);
