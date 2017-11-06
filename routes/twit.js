var express = require('express');
var sentiment = require('sentiment');
var Twitter = require('twitter');
var router = express.Router();

var client = new Twitter({
    consumer_key: 'BoDeBDz4oHUER9Ygroonq9NP9',
    consumer_secret: 'QTMIpXVduSch3EH14ZOCU4DpAAAekgjP1b8DGqgyEDLYxmWEkE',
    access_token_key: '20355623-Di2itgy7QJneBlZDRMEA3zXXVItYVVlJP6fwiA15K',
    access_token_secret: 'LXeZUqts7xUYCO99ljvCtz5VyjYfTnkPSDzUK1vJxkaY6'

    // consumer_key: process.env.TWITTER_CONSUMER_KEY,
    // consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    // access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    // access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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
