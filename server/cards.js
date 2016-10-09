/**
 * Created by austingundry on 10/4/16.
 */
import { Meteor } from 'meteor/meteor';

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
    }
});