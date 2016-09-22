import '../imports/startup/accounts-config.js';
import '../imports/ui/roster.js';
import '../imports/ui/navbar.html';
import '../imports/ui/standings.js';
import '../imports/ui/user_standing.js';

Router.configure({
	// default layout
	layoutTemplate: 'mainNav'
});

Router.route('/', function() {
	this.render('roster');
	this.layout('mainNav');
});

Router.route('/standings', function() {
	this.render('standings');
	this.layout('mainNav');
});