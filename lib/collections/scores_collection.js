Scores = new Mongo.Collection('scores');
Scores.schema = new SimpleSchema({
    user: {type: String},
    nba: {type: Number},
    nfl: {type: Number},
    nhl: {type: Number},
    mlb: {type: Number},
    best_picture: {type: Number},
    gdp: {type: Number},
    billboard: {type: Number},
    college_football: {type: Number},
    uefa: {type: Number},
    stock: {type: Number}
});

export default Scores;
