import React from 'react';
import { Meteor } from 'meteor/meteor';
import App from './App';
import { createContainer } from 'meteor/react-meteor-data';

AppContainer = createContainer( props  => {
    let currentUser;
    const
        subscription = Meteor.subscribe("userData"),
        subReady = subscription.ready()
    ;

    if (subReady) {
        currentUser = Meteor.user();
    };

    return {
        subReady: subReady,
        currentUser: currentUser,
        signedIn: Meteor.user() != null
    };
}, App);

export default AppContainer;