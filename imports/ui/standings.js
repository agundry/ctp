import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './standings.html';
import './user_standing.js';

if (Meteor.isClient) {
	Template.standings.onCreated(function bodyOnCreated() {
	  Meteor.subscribe('userList');
	});

	Template.standings.helpers({
		userList() {
			return Meteor.users.find({});
		},
	});
}