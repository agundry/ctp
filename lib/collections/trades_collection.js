Trades = new Mongo.Collection('trades');
Scores.schema = new SimpleSchema({
    trade_id: {type: Number},
    origin: {type: String},
    destination: {type: String},
    card_id: {type: String},
    card_title: {type: String},
    proposed_at: {type: Number},
    accepted_at: {type: Number}
});

export default Trades;
