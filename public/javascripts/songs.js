var app = {

  songData: {},

  init: function() {
    this.fetchSongs();
  },

  parseSongData: function(songs) {
    console.log('parsing data')
    // for (var key in songs) {
    //   var songInfo = songs[key];
    //   console.log(songInfo.mediaid)
    // }
  },

  fetchSongs: function(){
    var that = this;
    console.log('fetching songs')
    $.ajax({
      url: 'http://127.0.0.1:4000/songs',
      type: 'GET',
      data: 'json',
      success: function (urls) {
        console.log('urls recieved')
        console.log(urls)
      },
      error: function(err) {
        console.log("ERROR'd")
        console.log(err)
      }
    });
  }

}

$(document).ready(function() {
  
  app.init()

})

