var express = require('express');
var sentiment = require('sentiment');
var Twitter = require('twitter');
var router = express.Router();

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var resp;
var tw, arr ;


/* GET twit listing. */
router.get('/:username', function (req, res, next) {
    var params = {screen_name: req.params.username};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tw = tweets;
            arr = [];
        }
        tw.forEach(function (item) {
            obj = {
                'date': item.created_at,
                'message': item.text,
                'sentiment': sentiment(item.text)
            };
            arr.push(obj);
        });
        res.send(arr);
    });
});

module.exports = router;
