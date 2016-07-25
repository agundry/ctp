import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Cards = new Mongo.Collection('cards');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('cards', function cardsPublication() {
    return Cards.find({ owner: this.userId });
  });
  Meteor.methods({
  // 	newwikisearch: function(term) {
		// HTTP.get('https://en.wikipedia.org/w/api.php',
		// 	{ params : { action: "opensearch", format: 'json', search: term, limit: 10} },
		// 	function (error, result) {
		// 		if (!error) {
		//           console.log(result);
		//         }
		//     }
		// );
  // 	},
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
  })
}

Meteor.methods({
	'cards.draft'(title, pageId, description, thumbnail) {
		check(title, String);
		check(pageId, Number);
		check(description, String);
		check(thumbnail, String);

		// Check that user is logged in
		if (! this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Cards.insert({
			title,
			pageId,
			description,
			thumbnail,
			owner: this.userId,
			username:Meteor.users.findOne(this.userId).username,
		});
	},
	'cards.drop'(cardId) {
		check(cardId, String);

		Cards.remove(cardId);
	},
	// 'cards.wikisearch'(term) {
	// 	console.log(term);
	// 	console.log("HEYYY");

	// 	// Get value from form element
	// 	HTTP.get('//en.wikipedia.org/w/api.php',
	// 		{ params : { action: "opensearch", search: term, limit: 10} },
	// 		function (error, result) {
	// 			if (!error) {
	// 	          console.log(result);
	// 	        }
	// 	    }
	// 	);
	// },
});