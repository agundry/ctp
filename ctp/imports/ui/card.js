import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './card.html';

Template.card.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.card.events({
  'click .draft'() {
    Meteor.call('cards.draft', this.title, this.pageId, this.description, this.thumbnail);
  },
  'click .drop'() {
    Meteor.call('cards.drop', this._id);
  },
});