/**
 * Created by austingundry on 10/4/16.
 */
import { Meteor } from 'meteor/meteor';

const cheerio = Meteor.npmRequire('cheerio');
Meteor.methods({
	'/scores/roster': function () {
		// Scores for a user should be set to the previously recorded score value plus the value of their current cards
	    let users = Meteor.users.find({}).fetch();

		users.forEach(function (user) {
			// First, get scores of user's current cards
			let user_cards = Cards.find({owner: user._id}).fetch();
            var new_score = 0;
            user_cards.forEach(function (card) {
            	new_score += parseInt(card.points_earned - card.points_when_acquired);
			});

			// Next, get recorded scores of each category
			let user_scores = Scores.findOne({user: user._id});
			if (!user_scores) {
				let score_object = {
					user: user._id,
					nba: 0,
					nfl: 0,
					nhl: 0,
					mlb: 0,
					best_picture: 0,
					gdp: 0,
					billboard: 0,
					college_football: 0,
					uefa: 0,
					stock: 0
				};
				Scores.insert(score_object);
			} else {
				new_score += (user_scores.nba +
								user_scores.nfl +
								user_scores.nhl +
                                user_scores.mlb +
                                user_scores.best_picture +
                                user_scores.gdp +
                                user_scores.billboard +
                                user_scores.college_football +
                                user_scores.uefa +
								user_scores.stock)
			}
			Meteor.users.update(user._id, {$set: {points: new_score}});
		});
	},
    '/scores/nba': function () {
  		let $ = cheerio.load(Meteor.http.get("http://www.espn.com/nba/standings").content);
  		let current_standings = {};
  		current_standings['teams'] = $('.team-names').map(function(i, el) {
  			return $(this).text();
  		}).get();
  		current_standings['wins'] = $('.standings-row').map(function(i, el) {
			return $(this).children('td').next().first().text();
		}).get();

  		current_standings_dict = {};
  		let iter = null;

  		for (let i = 0; i < current_standings['teams'].length; i++) {
  			iter = {};
  			current_standings_dict[current_standings['teams'][i]] = current_standings['wins'][i];
  		};

		update_cards_with_scores('NBA Team', NBA_TEAMS_WIKI_TEAMS_MAPPER, current_standings_dict);
    },
	'/scores/nfl': function() {
    	let $ = cheerio.load(Meteor.http.get("http://www.espn.com/nfl/standings").content);

		let current_standings = {};
		current_standings['teams'] = $('.team-names').map(function(i, el) {
			return $(this).text();
		}).get();
		current_standings['wins'] = $('.standings-row').map(function(i, el) {
			return $(this).children('td').next().first().text();
		}).get();

		current_standings_dict = {};
		let iter = null;

		for (let i = 0; i < current_standings['teams'].length; i++) {
			iter = {};
			current_standings_dict[current_standings['teams'][i]] = current_standings['wins'][i];
		};

		update_cards_with_scores('NFL Team', NFL_TEAMS_WIKI_TEAMS_MAPPER, current_standings_dict);

	},
	'/scores/nhl': function() {
		let $ = cheerio.load(Meteor.http.get("http://www.espn.com/nhl/standings").content);

		let current_standings = {};
		// Get current teams
		current_standings['teams'] = [].concat(
			$('.oddrow').map(function(i, el) {return $(this).children('td').first().text().trim();}).get()
		).concat(
			$('.evenrow').map(function(i, el) {return $(this).children('td').first().text().trim();}).get()
		);

		// Get current win count
		current_standings['wins'] = [].concat(
			$('.oddrow').map(function(i, el) {return $(this).children('td').next().next().first().text().trim();}).get()
		).concat(
			$('.evenrow').map(function(i, el) {return $(this).children('td').next().next().first().text().trim();}).get()
		);

		current_standings_dict = {};
		let iter = null;

		for (let i = 0; i < current_standings['teams'].length; i++) {
			iter = {};
			current_standings_dict[current_standings['teams'][i]] = current_standings['wins'][i];
		};

        update_cards_with_scores('NHL Team', NHL_TEAMS_WIKI_TEAMS_MAPPER, current_standings_dict);
	}
});

update_cards_with_scores = (card_category, mapping_dict, standings_dict) => {
    // Search for cards in category, then update them with scores
	let current_cards_in_category = Cards.find({category: card_category}).fetch();
	current_cards_in_category.forEach(function(card) {
		team_wins = standings_dict[mapping_dict[card.title]];
		if (card.points_when_acquired == null) {
			Cards.update({_id: card._id}, {$set: {points_earned: team_wins, points_when_acquired: team_wins}});
		} else {
			Cards.update({_id: card._id}, {$set: {points_earned: team_wins}});
		}
	});
};
