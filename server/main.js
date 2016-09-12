import { Meteor } from 'meteor/meteor';
import '../imports/api/cards.js';

Accounts.onCreateUser(function(options, user) {
    user.waiver_spot = Meteor.users.find().count() + 1;

    return user;
});

Meteor.startup(() => {
  // code to run on server at startup
});