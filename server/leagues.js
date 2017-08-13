/**
 * Created by austingundry on 10/4/16.
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Cards from '../lib/collections/cards_collection';
import Scores from '../lib/collections/scores_collection';

Meteor.methods({
    '/leagues/create': function (name, token, avatar) {
        check(name, String);
        check(token, String);
        check(avatar, String);

        // Check that user is logged in
        if (! Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }
        let user_id = Meteor.userId();

        var new_league = {
            name,
            admin: user_id,
            token,
            avatar
        };

        Leagues.schema.validate(new_league);

        // TODO transaction safety
        league_id = Leagues.insert(new_league);
        var new_user_league = {league_id: league_id, user_id: user_id};
        UserLeagues.schema.validate(new_user_league);
        UserLeagues.insert(new_user_league);

        return "success"
    },
    '/leagues/delete'(league_id) {
        check(league_id, String);
        // Update scoring
        let league = Leagues.findOne({_id: league_id});

        if (Meteor.userId() != league.admin) {
            throw new Meteor.error('Only the league admin can delete a league');
        }

        UserLeagues.remove({league_id: league_id});
        Cards.remove({league_id: league_id});
        Leagues.remove(league_id);
    },
});

// updateScoreField = (score_object, category, points) => {
//     // using this pattern allows for the increment field to be set dynamically
//     let score_modifier = { $inc: {} };
//     switch (category) {
//         case "NBA Team":
//             score_modifier.$inc['nba'] = points;
//             break;
//         case "NFL Team":
//             score_modifier.$inc['nfl'] = points;
//             break;
//         case "NHL Team":
//             score_modifier.$inc['nhl'] = points;
//             break;
//         default:
//             // If not valid category, just pass in nba and 0 because we need to pass something
//             score_modifier.$inc['nba'] = 0;
//             break;
//     }
//     Scores.update({user: score_object.user}, score_modifier);
// };