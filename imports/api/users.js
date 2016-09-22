import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('userList', function () {
    return Meteor.users.find({});
  });
}