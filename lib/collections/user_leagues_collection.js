UserLeagues = new Mongo.Collection('user_leagues');
UserLeagues.schema = new SimpleSchema({
	league_id: {type: String}, // Id of league
	user_id: {type: String}, // Id of user
});

export default UserLeagues;