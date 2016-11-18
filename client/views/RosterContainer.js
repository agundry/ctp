import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Roster from './Roster';

export default RosterContainer = createContainer(props => {
    const cards_subscription = Meteor.subscribe("cards");
    const loading = !cards_subscription.ready();
    const user_cards = Cards.find({owner: Meteor.userId()});
    const user_cards_exist = !loading && !!user_cards;
    return {
        loading: loading,
        cardsExist: user_cards_exist,
        cards: user_cards_exist ? user_cards.fetch() : [],
    };
}, Roster);