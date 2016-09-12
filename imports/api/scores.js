import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

export const Scores = new Mongo.Collection('scores');
Scores.schema = new SimpleSchema({
	username: {type: String},
	nba_team: {type: Number},
	nfl_team: {type: Number},
	nhl_team: {type: Number},
	mlb_team: {type: Number},
	best_picture: {type: Number},
	gdp: {type: Number},
	billboard: {type: Number},
	gdp: {type: Number},
	gdp: {type: Number},
	gdp: {type: Number},
	college_football: {type: Number},
	uefa_team: {type: Number},
	stock: {type: Number}
})

if (Meteor.isServer) {
  // This code only runs on the server
  var cheerio = Meteor.npmRequire('cheerio');
  Meteor.publish('cards', function cardsPublication() {
    return Cards.find({ owner: this.userId });
  });
  Meteor.methods({
  	update_nba_scores: function() {
      let $ = cheerio.load(Meteor.http.get("http://www.nba.com/standings/team_record_comparison/conferenceNew_Std_Cnf.html?ls=iref:nba:gnav").content);
      let current_standings = {}
      current_standings['teams'] = $('.team').children('a').map(function(i, el) {
        return $(this).text();
      }).get();
      current_standings['wins'] = $('.team').next().map(function(i, el) {
        return $(this).text();
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
  	}
  })
}