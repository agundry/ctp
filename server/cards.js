/**
 * Created by austingundry on 10/4/16.
 */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

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
        check(description, String);
        check(thumbnail, String);

        // Check that user is logged in
        if (! Meteor.user()) {
            throw new Meteor.Error('not-authorized');
        }

        // Collision detection
        let already_drafted = Cards.findOne({pageId: pageId});
        if (already_drafted) {
            throw new Meteor.Error(already_drafted.username + ' already has that card')
        }

        var new_card = {
            title,
            pageId,
            description,
            category,
            thumbnail,
            owner: Meteor.userId(),
        };

        Cards.schema.validate(new_card);

        Cards.insert(new_card);

        // Move user to bottom waiver spot
        Meteor.users.update({}, {$inc: {waiver_spot: -1}}, {multi: true});
        Meteor.users.update(Meteor.userId(), {$set: {waiver_spot: Meteor.users.find({}).count()}});

        return "success"
    },
    '/cards/drop'(cardId) {
        check(cardId, String);
        Cards.remove(cardId);
    },
});