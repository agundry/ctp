/**
 * Created by austingundry on 10/4/16.
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Cards from '../lib/collections/cards_collection';
import Scores from '../lib/collections/scores_collection';

Meteor.methods({
    '/cards/search': function (term) {
        try {
            var result = HTTP.get('https://en.wikipedia.org/w/api.php',
                {
                    params: {
                        action: "query",
                        formatversion: 2,
                        prop: 'pageimages|pageterms',
                        titles: term,
                        format: 'json',
                        pilimit: 3
                    }
                });
            let query_set = JSON.parse(result.content);
            let top_item = query_set.query.pages[0];
            let return_set = {
                pageId: top_item.pageid, title: top_item.title,
                thumbnail: top_item.thumbnail.source, description: top_item.terms.description[0]
            };
            return return_set;
        } catch (e) {
            console.log("Error", e);
        }
    },
    '/cards/draft': function (title, pageId, description, category, thumbnail) {
        check(title, String);
        check(pageId, Number);
        check(category, String);
        check(description, String);
        check(thumbnail, String);

        // Check that user is logged in
        if (! Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }

        // Collision detection
        let already_drafted = Cards.findOne({pageId: pageId});
        if (already_drafted) {
            let current_owner = Meteor.users.findOne({_id: already_drafted.owner});
            throw new Meteor.Error(current_owner.emails[0].address + ' already has that card')
        }

        var new_card = {
            title,
            pageId,
            description,
            category,
            thumbnail,
            owner: Meteor.userId(),
            points_when_acquired: null,
        };

        Cards.schema.validate(new_card);

        Cards.insert(new_card);

        // Move user to bottom waiver spot
        Meteor.users.update({waiver_spot: { $gt: Meteor.user().waiver_spot }}, {$inc: {waiver_spot: -1}}, {multi: true});
        Meteor.users.update(Meteor.userId(), {$set: {waiver_spot: Meteor.users.find({}).count()}});

        return "success"
    },
    '/cards/drop'(cardId) {
        check(cardId, String);
        // Update scoring
        let card = Cards.findOne({_id: cardId});
        let user_score = Scores.findOne({user: card.owner});
        let new_points = card.points_earned - card.points_when_acquired;
        updateScoreField(user_score, card.category, card.points_earned - card.points_when_acquired);

        Cards.remove(cardId);
    },
});

updateScoreField = (score_object, category, points) => {
    // using this pattern allows for the increment field to be set dynamically
    let score_modifier = { $inc: {} };
    switch (category) {
        case "NBA Team":
            score_modifier.$inc['nba'] = points;
            break;
        case "NFL Team":
            score_modifier.$inc['nfl'] = points;
            break;
        case "NHL Team":
            score_modifier.$inc['nhl'] = points;
            break;
        default:
            // If not valid category, just pass in nba and 0 because we need to pass something
            score_modifier.$inc['nba'] = 0;
            break;
    }
    Scores.update({user: score_object.user}, score_modifier);
};