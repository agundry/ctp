Cards = new Mongo.Collection('cards');
Cards.schema = new SimpleSchema({
	title: {type: String},
	pageId: {type: Number},
	description: {type: String},
	category: {type: String, optional: true},
	thumbnail: {type: String},
	owner: {type: String},
	points_when_acquired: {type: Number, optional: true},
	points_earned: {type: Number, optional: true}
});

export default Cards;