import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Cards = new Mongo.Collection('cards');
Cards.schema = new SimpleSchema({
	title: {type: String},
	pageId: {type: Number},
	description: {type: String},
	category: {type: String, optional: true},
	thumbnail: {type: String},
	owner: {type: String},
	username: {type: String}
})

if (Meteor.isServer) {
  // This code only runs on the server
  var cheerio = Meteor.npmRequire('cheerio');
  Meteor.publish('cards', function cardsPublication() {
    return Cards.find({ owner: this.userId });
  });
  Meteor.methods({
  	getCardInfo: function(term) {
  		try {
			var result = HTTP.get('https://en.wikipedia.org/w/api.php',
				{ params : { action: "query", formatversion: 2, prop: 'pageimages|pageterms', titles: term, format: 'json', pilimit: 3} });
			let query_set = JSON.parse(result.content);
			let top_item = query_set.query.pages[0];
			let return_set = {pageId: top_item.pageid, title: top_item.title,
				thumbnail: top_item.thumbnail.source, description: top_item.terms.description[0]};
			return return_set;
		} catch(e) {
			console.log("Error", e);
		}
  	},
  	get_nba_standings: function() {
  		let $ = cheerio.load(Meteor.http.get("http://www.nba.com/standings/team_record_comparison/conferenceNew_Std_Cnf.html?ls=iref:nba:gnav").content);
  		let current_standings = {}
  		current_standings['teams'] = $('.team').children('a').map(function(i, el) {
  			return $(this).text();
  		}).get();
  		current_standings['wins'] = $('.team').next().map(function(i, el) {
  			return $(this).text();
  		}).get();
  		return current_standings;
  	}
  })
}

Meteor.methods({
	'cards.draft'(title, pageId, description, category, thumbnail) {
		check(title, String);
		check(pageId, Number);
		check(description, String);
		check(thumbnail, String);

		// Check that user is logged in
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		var new_card = {
			title,
			pageId,
			description,
			category,
			thumbnail,
			owner: this.userId,
			username:Meteor.users.findOne(this.userId).username,
		};

		Cards.schema.validate(new_card);

		Cards.insert(new_card);
	},
	'cards.drop'(cardId) {
		check(cardId, String);

		Cards.remove(cardId);
	},
});