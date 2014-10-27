frpz:who
========

This is a [Meteor](http://meteor.com) package that allows you to see who's on your Meteor app.
##Install
Installation is as usual:
```sh
meteor add frpz:who
```

##Usage

###Accessing the data

First you have to publish the collection **frpzWho** on the server:
```javascript
if (Meteor.isServer) {
	Meteor.publish('frpzWho', function (u) {
		return frpzWho.find();
	});
}
```

You can controle who has access to the collection, if you are using "role":

```javascript
if (Meteor.isServer) {
	Meteor.publish('frpzWho', function (u) {
		return u && Roles.userIsInRole(u, ['admin']) ? frpzWho.find(): false;
	});
}
```

Or share only partial infos:
```javascript
if (Meteor.isServer) {
	Meteor.publish('frpzWho', function (u) {
		return frpzWho.find({},{fields: {"_id": 1, "user": 1, "when": 1, "httpHeaders": 1, "agent": 1}});
	});
}
```
Avalables fields are:
- user: user object
- id: user id
- realip: ip address
- agent: user agent
- when: connection date and time
- page: uri as shown by iron:router
- httpHeaders: headers received by the *Meteor.onConnection* function.

###Display

You can use the template included:
```
{{> frpzwho}}
```

or you can use your own and access **frpzWho** collection directly.

###Log

You can turn on the logs with this (on server and client):
```javascript
Meteor.startup(function () {
  Meteor.frpzWhoLog = true;
});
```

###Iron:router

If the package **iron:router** is installed, it will automatically update the "page" section.

##Notes
This is my first Meteor package, so don't hesitate if you have advice, or any requests.
