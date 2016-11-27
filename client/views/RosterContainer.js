import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Roster from './Roster';

export default RosterContainer = createContainer(props => {
    // Subscriptions
    const cards_subscription = Meteor.subscribe("cards");
    const all_users_subscription = Meteor.subscribe("allUsers");

    // If subscription is ready, page is done loading
    const loading = !cards_subscription.ready();

    // Users in descending order of points
    const all_users = Meteor.users.find({}, {sort: { points: -1 }}).fetch();

    // All cards for current user
    const user_cards = Cards.find({owner: Meteor.userId()});
    const user_cards_exist = !loading && !!user_cards;

    return {
        loading: loading,
        users: all_users,
        cardsExist: user_cards_exist,
        cards: user_cards_exist ? user_cards.fetch() : [],
    };
}, Roster);
