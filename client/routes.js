/**
 * Created by austingundry on 10/1/16.
 */

import App from './components/App';
import Login from './views/Login';
import Roster from './views/Roster';
import Register from './views/Register';
import { mount } from 'react-mounter';

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        mount(App, {
            content: <Roster />
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        mount(App, {
            content: <Login />
        });
    }
});

FlowRouter.route('/register', {
    name: 'register',
    action: function() {
        mount(App, {
            content: <Register />
        });
    }
});

FlowRouter.notFound = {
    action: function() {
        FlowRouter.go('home');
    }
};
