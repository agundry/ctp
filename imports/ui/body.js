import { Template } from 'meteor/templating';

import { Cards } from '../api/cards.js';

import './card.js';
import './body.html';

if (Meteor.isClient) {
	Template.body.onCreated(function bodyOnCreated() {
	  this.state = new ReactiveDict();
	  Meteor.subscribe('tasks');
	  Meteor.subscribe('cards');
	});

	Template.body.helpers({
		tasks() {
		    const instance = Template.instance();
		    if (instance.state.get('hideCompleted')) {
		      // If hide completed is checked, filter tasks
		      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
		    }
		    // Otherwise, return all of the tasks
		    return Tasks.find({}, { sort: { createdAt: -1 } });
		},

		incompleteCount() {
			return Tasks.find({ checked: { $ne: true } }).count();
		},

		cards() {
			return Cards.find({}, { sort: { name: -1 } });
		},
		userRosterCount() {
			return Cards.find({}).count();
		},

		currentCard() {
			return Session.get('searched_card');
		},
	});

	Template.body.events({
	  'submit .new-task'(event) {
	  	console.log(event);
	    // Prevent default browser form submit
	    event.preventDefault();

	    // Get value from form element
	    const target = event.target;
	    const text = target.text.value;

	    // Insert a task into the collection
	    Meteor.call('tasks.insert', text);

	    // Clear form
	    target.text.value = '';
	  },
	  'change .hide-completed input'(event, instance) {
	    instance.state.set('hideCompleted', event.target.checked);
	  },
	  'submit .new-card-search'(event, instance) {
	  	console.log(event);
	    // Prevent default browser form submit
	    event.preventDefault();

	    // Get value from form element
	    const target = event.target;
	    const text = target.text.value;

	    Meteor.call('getCardInfo', text, function(error, result) {
	    	if (error) {
	    		console.log(error);
	    	} else {
		    	console.log(result);
		    	Session.set('searched_card', result);
		    }
	    });

	    Meteor.call("get_nba_standings", function(err,result){ console.log(result) } );

	    // Clear form
	    target.text.value = '';
	  },
	});
}