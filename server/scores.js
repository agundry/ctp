/**
 * Created by austingundry on 10/4/16.
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const cheerio = Meteor.npmRequire('cheerio');
Meteor.methods({
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

  		// Get currently owned nba team cards and update accordingly
  		let current_teams = Cards.find({category: 'NBA Team'}).fetch();
  		current_teams.forEach(function(card) {
  			team_wins = current_standings_dict[NBA_TEAMS_WIKI_TEAMS_MAPPER[card.title]];
  			Cards.update({_id: card._id}, {$set: {points_earned: team_wins}});
  		});
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

		// Get currently owned nba team cards and update accordingly
		let current_teams = Cards.find({category: 'NFL Team'}).fetch();
		current_teams.forEach(function(card) {
			team_wins = current_standings_dict[NFL_TEAMS_WIKI_TEAMS_MAPPER[card.title]];
			Cards.update({_id: card._id}, {$set: {points_earned: team_wins}});
		});

	}
});