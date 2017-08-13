/**
 * Created by austingundry on 10/1/16.
 */

import Login from './views/Login';
import Register from './views/Register';
import { mount } from 'react-mounter';
import Alert from 'react-s-alert';

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        mount(AppContainer, {
            content: <RosterContainer />
        });
    }
});

FlowRouter.route('/leagues', {
    name: 'leagues',
    action: function() {
        mount(AppContainer, {
            content: <LeagueContainer />
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        mount(AppContainer, {
            content: <Login />
        });
    }
});

FlowRouter.route('/register', {
    name: 'register',
    action: function() {
        mount(AppContainer, {
            content: <Register />
        });
    }
});

FlowRouter.route('/logout', {
    name: 'logout',
    action: function() {
        Meteor.logout(function(){
            FlowRouter.go('home');
            Alert.info("You've been signed out.", {effect: 'stackslide', position: 'top-right', timeout: 3000});
        });
    }
});

FlowRouter.notFound = {
    action: function() {
        FlowRouter.go('home');
    }
};
