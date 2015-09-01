var express = require('express');
var router = express.Router();
var hypemResolver = require('hypem-resolver')
var reqwest = require('reqwest');
var async = require('async')
var songResolvers = require('../songs/songResolvers')
var Promise = require("bluebird");


var mediaIds = [];
var urls = [];



/* GET home page. */
router.get('/', function (req, res, next){
  res.render('index', { title: 'jammie.party'});
})


/* GET song data. */
router.get('/songs', function(req, res, next) {

  console.log('in the router')
  var songData = {}

  reqwest({
    url: 'http://hypem.com/playlist/loved/jammiemountz/json/1/data.js',
    method: 'GET',
    crossDomain: true,
    type: 'json',
    success: function (urls) {
      console.log('SUCCESS: urls recieved')
      songData = urls;

      async.forEachOf(songData, function(value, key){

      }, function(err){
        console.log(err)
      })

      // for (var key in songData) {
      //   hypemResolver.getById(songData[key].mediaid, function(err, url){
      //     console.log(url, '   ', key)
      //     songData[key].songurl = url;
      //   })
      // }
      res.send(songData);
    },
    error: function(err) {
      console.log('ERROR', err);
    }
  })


});

module.exports = router;
