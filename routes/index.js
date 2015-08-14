var express = require('express');
var router = express.Router();
var hypemResolver = require('hypem-resolver')
var reqwest = require('reqwest');
var async = require('async')

/* GET home page. */
router.get('/', function(req, res, next) {

  var mySongs = {};

  reqwest({
    url: "http://hypem.com/playlist/loved/jammiemountz/json/1/data.js",
    method: "GET",
    crossDomain: true,
    type: "json",
    success: function(songs) {
      return songs;
    }
  }).then(function(songs){
    
    mySongs = songs;
    mediaIds = [];

    // put mySongs mediaIds into mediaIds array
    for (var key in mySongs) {
      if (mySongs[key].mediaid) {
        mediaIds.push(mySongs[key].mediaid)
      }
    }

    // make function for getting URLs from the Ids
    function idGetter(id) {
      hypemResolver.getById(id, function(err, url){
        if (err) {
          console.log('ERROR,', err);
          return null;
        } else {
          console.log('in the id getter, ', url);
          return url;
        }
      })
    }
    
    // map through the mediaIds array, run idGetter on them
    async.map(mediaIds, idGetter, function(err, mediaUrls) {
      if (err) {
        console.log(err);
      }
      res.render('index', { title: 'jammie.party', mySongs: mySongs });
      console.log('async mapUrls: ', mediaUrls)
      return mediaUrls
    })

  })


});

module.exports = router;
