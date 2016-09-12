Cards = new Mongo.Collection('cards');
Cards.schema = new SimpleSchema({
	title: {type: String},
	pageId: {type: Number},
	description: {type: String},
	category: {type: String, optional: true},
	thumbnail: {type: String},
	owner: {type: String},
	username: {type: String},
	points_when_acquired: {type: Number, optional: true},
	points_earned: {type: Number, optional: true}
})

Scores = new Mongo.Collection('scores');
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