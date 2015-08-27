module.exports = {


  // get my songs from HypeM
  getHypemFavoriteSongs: function(cb) {
    $.ajax({
      url: 'http://127.0.0.1:4000/songs',
      type: 'GET',
      data: 'json',
      success: function (urls) {
        console.log('SUCCESS: urls recieved')
        cb(urls);
      },
      error: function(err) {
        console.log('ERROR', err);
      }
    })
  },

  // get URL from media Id
  getUrlsFromMediaId: function(Ids, cb){
    Ids.forEach(function(id){
      hypemResolver.getById(id, function(err, url){
        if (err) {
          console.log('ERROR,', err);
          return null;
        } else {
          cb(url)
        }
      })
    })
  },

  //extract soundcloud songs
  extractSoundcloudSongs: function(songs, cb){
    // lalala
  },

  // create the URL to send to the soundcloud API to get the stream URI
  createStreamResolverUrl: function(url) {
    return "http://api.soundcloud.com/resolve?url=" + url + "&client_id=d87cbb575fd8bbaa7e99d2c711c62be0";
  },


  // use the get URL to get the song URI
  getStreamUri: function(streamLookup, cb) {
    $.ajax({
      url: streamLookup,
      type: 'GET',
      data: 'json',
      success: function(soundcloudData) {
        console.log('success')
        cb(soundcloudData.uri);
      },
      error: function(err) {
        console.log('error', err);
      }
    })
  }

}