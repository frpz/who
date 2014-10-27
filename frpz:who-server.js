/*
 * Package "frpzWho" for Meteor
 *  by Francis Pugnère
 *
 * This package allows you to see who's on your Meteor app
 * 
 * frpz:who-server.js
 * All the actions on the server side
 *
 */

frpzWho = new Meteor.Collection('frpzWho');
// if(Meteor.frpzWhoLog) console.log("frpzWho: connexions: ",frpzWho.find().fetch());
//////////////////////////////////////////////
// Add custom permission rules if needed   //
frpzWho.allow({
	insert : function () {
		return false;
	},
	update : function () {
		return false;
	},
	remove : function () {
		return false;
	}
});
//Server
/*Meteor.publish('frpzWho', function (u) {
	// return u && Roles.userIsInRole(u, ['admin']) ? frpzWho.find(): false;
	return frpzWho.find();
});
*/
Meteor.onConnection(function(c){
	c._id  = c.id;
	c.when = new Date();
	c.realip = ((c.httpHeaders['x-real-ip'] != undefined ) ? c.httpHeaders['x-real-ip'] : c.clientAddress );
	c.agent  = c.httpHeaders['user-agent'];
	if(Meteor.frpzWhoLog) console.log("frpzWho: * New connection id: %s (%s)",c.id,c.realip);
	frpzWho.insert(c);

	c.onClose(function(){
		if(Meteor.frpzWhoLog) console.log("frpzWho: * End of connection id: %s (%s)",c.id,c.realip);
		frpzWho.remove({_id:c._id});
	});
});

Meteor.methods({
	addUserToConnexions: function(){
		var id = this.connection.id;
		if(typeof Meteor.user != 'undefined' && Meteor.user()){
			if(Meteor.frpzWhoLog) console.log("frpzWho: Add User [ %s ] to session [ %s ]",typeof Meteor.user().username == 'undefined' ? Meteor.user().emails[0].address : Meteor.user().username, id);
			frpzWho.update({_id:id},{$set: {user: Meteor.user()}});
		}else{
			if(Meteor.frpzWhoLog) console.log("frpzWho: Add User: No user to add to session [ %s ]",id);
		}
	},
	delUserToConnexions: function(){
		var id = this.connection.id;
		if(Meteor.frpzWhoLog) console.log("frpzWho: Del User from session [ %s ]",id);
		if(id) frpzWho.update({_id:id},{$unset: {user:1}});
	},
	changeRoute: function(route,who){
		var id = this.connection.id;
		if(Meteor.frpzWhoLog) console.log("frpzWho: User change route: %s for session [ %s ] by [ %s ]",route,id,who);
		if(id) frpzWho.update({_id:id},{$set: {page: route}});
	}
});

Meteor.startup(function () {
	frpzWho.remove({});
});

