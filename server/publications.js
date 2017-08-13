/**
 * Created by austingundry on 10/1/16.
 */
import {Meteor} from 'meteor/meteor';
import Cards from '../lib/collections/cards_collection';
import Scores from '../lib/collections/scores_collection';

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId});
    } else {
        this.ready();
    }
});

Meteor.publish("allUsers", function () {
    if (this.userId) {
        return Meteor.users.find({});
    } else {
        this.ready();
    }
});

Meteor.publish("cards", function () {
    if (this.userId) {
        return Cards.find({});
    } else {
        this.ready();
    }
});

Meteor.publish("recordedScores", function () {
    if (this.userId) {
        return Scores.find({});
    } else {
        this.ready();
    }
});

Meteor.publish("leagues", function () {
    if (this.userId) {
        // user_league_ids = UserLeagues.find({user_id: this.user_id});
        // return Leagues.find({_id: {$in: user_league_ids}});
        return Leagues.find({});
    } else {
        this.ready();
    }
});
