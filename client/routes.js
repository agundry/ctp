/**
 * Created by austingundry on 10/1/16.
 */

import Login from './views/Login';
import Roster from './views/Roster';
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
            Alert.info("You've been signed out.", {effect: 'stackslide', position: 'top-right'});
        });
    }
});

FlowRouter.notFound = {
    action: function() {
        FlowRouter.go('home');
    }
};
