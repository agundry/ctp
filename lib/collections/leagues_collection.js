Leagues = new Mongo.Collection('leagues');
Leagues.schema = new SimpleSchema({
	name: {type: String}, // League Name
	admin: {type: String}, // User id of owner
	token: {type: String}, // Hash of token users need for entry
	avatar: {type: String} // Link to avatar
});

export default Leagues;