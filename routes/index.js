var express = require('express');
var router = express.Router();
var hypemResolver = require('hypem-resolver')
var reqwest = require('reqwest');
var async = require('async')
var songResolvers = require('../public/javascripts/songResolvers.js')
var Promise = require("bluebird");

var songResolverPromises = Promise.promisifyAll(songResolvers)

var mediaIds = [];
var urls = [];

var getUrlsFromMediaId = Promise.promisifyAll(require("hypem-resolver"));

var getUrlsFromMediaId = function(Ids){
  Ids.forEach(function(id){
    hypemResolver.getById(id, function(err, url){
      if (err) {
        console.log('ERROR,', err);
        return null;
      } else {
        urls.push(url)
      }
    })
  })
}

/* GET home page. */
router.get('/', function (req, res, next){
  res.render('index', { title: 'jammie.party'});
})

router.get('/songs', function(req, res, next) {

  reqwest({
    url: "http://hypem.com/playlist/loved/jammiemountz/json/1/data.js",
    method: "GET",
    crossDomain: true,
    type: "json",
    success: function(songs) {
      return songs;
    }
  }).then(function(songs){
    console.log('got the songs')
    songData = songs;
    for (var key in songs) {
      var songInfo = songs[key];
      mediaIds.push(songInfo.mediaid)
    }
    getUrlsFromMediaId(mediaIds)
    setTimeout(function() {
      res.send(urls);
    }, 2000);
  });
  //   mySongs = songs;
  //   mediaIds = [];

  //   // put mySongs mediaIds into mediaIds array
  //   for (var key in mySongs) {
  //     if (mySongs[key].mediaid) {
  //       mediaIds.push(mySongs[key].mediaid)
  //     }
  //   }
  // });

  //   // make function for getting URLs from the Ids
  // function idGetter(id) {
  //   return hypemResolver.getById(id, function(err, url){
  //     if (err) {
  //       console.log('ERROR,', err);
  //       return null;
  //     } else {
  //       console.log('in the id getter, ', url);
  //       return url;
  //     }
  //   })
  // }
    
  // // map through the mediaIds array, run idGetter on them

  // async.map(mediaIds, idGetter, function(err, mediaUrls) {
  //   if (err) {
  //     console.log('---------------------------------------------------------------------')
  //     console.log(err);
  //   }
  //   console.log('async mapUrls: ', mediaUrls)
  //   // res.send(mediaUrls);
  //   res.render('index', { title: 'jammie.party', mediaUrls: mediaUrls });
  //   return mediaUrls
  // })


});

module.exports = router;
