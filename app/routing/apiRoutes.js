/*

Your apiRoutes.js file should contain two routes:
	A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
	A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

*/

var friends = require('../data/friends');
var path = require('path');
var compatibility = [];

module.exports = function(app) {
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		var newFriend = {
			name: '',
			photo: '',
			score: 1000
		};

		//run through all friends in database
		var friendData = req.body;
		var friendScore = friendData.scores;
		var totalScore = 0;

		//for loop for each friend's score in database
		for (var i = 0; i < friends.length; i++) {
			totalScore = 0;

			for (var j = 0; j < friends[i].scores[j]; j++) {
				//calculate score
				//Math.abs prevents negative numbers
				totalScore += Math.abs(parseInt(friendScore[j]) - parseInt(friends[i].scores[j]));

				if (totalScore <= newFriend.score) {
					newFriend.name = friends[i].name;
					newFriend.photo = friends[i].photo;
					newFriend.score = totalScore;
				}
			}
		}
		//save new friend to database
		friends.push(friendData);
		res.json(newFriend);
	})
}