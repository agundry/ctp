import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LeagueManagement from './LeagueManagement';
import Leagues from '../../lib/collections/leagues_collection';

export default LeagueContainer = createContainer(props => {
    // Subscriptions
    const leagues_subscription = Meteor.subscribe("leagues");

    // If subscription is ready, page is done loading
    const loading = !leagues_subscription.ready();

    // All leagues for current user
    const user_leagues = Leagues.find({});
    const user_leagues_exist = !loading && !!user_leagues;

    return {
        loading: loading,
        leaguesExist: user_leagues_exist,
        leagues: user_leagues_exist ? user_leagues.fetch() : [],
    };
}, LeagueManagement);
