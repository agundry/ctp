import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './card.html';

Template.card.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.card.events({
	// Gets values returned in card template as well as current value of category field
  'click .draft': function(event, template) {
    Meteor.call('cards.draft', this.title, this.pageId, this.description, template.find('#category').value, this.thumbnail);
  },
  'click .drop'() {
    Meteor.call('cards.drop', this._id);
  },
});