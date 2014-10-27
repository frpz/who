/*
 * Package "frpzWho" for Meteor
 *  by Francis Pugnère
 *
 * This package allows you to see who's on your Meteor app
 * 
 * frpz:who-client.js
 * All the actions on the client side
 *
 */

Meteor.subscribe('frpzWho',typeof Meteor.user != 'undefined' ? Meteor.user() : null);
frpzWho = new Meteor.Collection('frpzWho');

Deps.autorun(function(){
	if(Meteor.status().connected){
		if(Meteor.frpzWhoLog) console.log("frpzWho: Monitoring status connect...");
		Meteor.call("addUserToConnexions");
		if(typeof Router != "undefined" && Router.current()) Meteor.call("changeRoute",Router.current().path, "Deps Connected");
	}
});

Deps.autorun(function(){
	if(typeof Meteor.user != 'undefined' && Meteor.user()){
		// if(Meteor.frpzWhoLog) console.log("frpzWho: Autorun user : [ %s ] logged",Meteor.user().username);
		Meteor.call("addUserToConnexions");
	}else{
		// if(Meteor.frpzWhoLog) console.log("frpzWho: Autorun user : deleting user.");
		Meteor.call("delUserToConnexions");
	}
});

Template.frpzwho.helpers({
	ip: function(){
		var x = this.realip;
		var i = this.clientAddress;
		return x == i ? x : x+" (via "+i+")";
	},
	moimeme: function(){
		return Meteor.connection._lastSessionId == this._id ? '<i class="fa fa-hand-o-right">*</i> ' : "";
	},
	frpzWho: function(){
		return frpzWho.find({},{});
	}
});

