// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';
// import { HTTP } from 'meteor/http';
//
// if (Meteor.isServer) {
//   // This code only runs on the server
//   var cheerio = Meteor.npmRequire('cheerio');
//   Meteor.publish('cards', function cardsPublication() {
//     return Cards.find({ owner: this.userId });
//   });
//   Meteor.methods({
//   	// '/cards/search': function(term) {
//   	// 	try {
// 		// 	var result = HTTP.get('https://en.wikipedia.org/w/api.php',
// 		// 		{ params : { action: "query", formatversion: 2, prop: 'pageimages|pageterms', titles: term, format: 'json', pilimit: 3} });
// 		// 	let query_set = JSON.parse(result.content);
// 		// 	let top_item = query_set.query.pages[0];
// 		// 	let return_set = {pageId: top_item.pageid, title: top_item.title,
// 		// 		thumbnail: top_item.thumbnail.source, description: top_item.terms.description[0]};
// 		// 	return return_set;
// 		// } catch(e) {
// 		// 	console.log("Error", e);
// 		// }
//   	// },
//   	get_nba_standings: function() {
//   		let $ = cheerio.load(Meteor.http.get("http://www.nba.com/standings/team_record_comparison/conferenceNew_Std_Cnf.html?ls=iref:nba:gnav").content);
//   		let current_standings = {}
//   		current_standings['teams'] = $('.team').children('a').map(function(i, el) {
//   			return $(this).text();
//   		}).get();
//   		current_standings['wins'] = $('.team').next().map(function(i, el) {
//   			return $(this).text();
//   		}).get();
//
//   		current_standings_dict = {};
//   		let iter = null;
//
//   		for (let i = 0; i < current_standings['teams'].length; i++) {
//   			iter = {};
//   			current_standings_dict[current_standings['teams'][i]] = current_standings['wins'][i];
//   		};
//
//   		// Get currently owned nba team cards and update accordingly
//   		let current_teams = Cards.find({category: 'NBA Team'}).fetch();
//   		current_teams.forEach(function(card) {
//   			team_wins = current_standings_dict[NBA_TEAMS_WIKI_TEAMS_MAPPER[card.title]];
//   			Cards.update({_id: card._id}, {$set: {points_earned: team_wins}});
//   		});
//   	}
//   })
// }
//
// Meteor.methods({
// 	'cards.draft'(title, pageId, description, category, thumbnail) {
// 		check(title, String);
// 		check(pageId, Number);
// 		check(description, String);
// 		check(thumbnail, String);
//
// 		// Check that user is logged in
// 		if (! this.userId) {
// 			throw new Meteor.Error('not-authorized');
// 		}
//
//         // Collision detection
// 		let already_drafted = Cards.findOne({pageId: pageId});
// 		if (already_drafted) {
// 			throw new Meteor.Error(already_drafted.username + ' already has that card')
// 		}
//
// 		var new_card = {
// 			title,
// 			pageId,
// 			description,
// 			category,
// 			thumbnail,
// 			owner: this.userId,
// 			username:Meteor.users.findOne(this.userId).username,
// 		};
//
// 		Cards.schema.validate(new_card);
//
// 		Cards.insert(new_card);
//
// 		// Move user to bottom waiver spot
// 		Meteor.users.update({}, {$inc: {waiver_spot: -1}}, {multi: true});
// 		Meteor.users.update(Meteor.userId(), {$set: {waiver_spot: Meteor.users.find({}).count()}});
// 	},
// 	'cards.drop'(cardId) {
// 		check(cardId, String);
//
// 		Cards.remove(cardId);
// 	},
// });
