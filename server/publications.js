/**
 * Created by austingundry on 10/1/16.
 */
import {Meteor} from 'meteor/meteor';
import Cards from '../lib/collections';

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
