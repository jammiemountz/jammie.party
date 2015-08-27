var app = {

  songData: {},

  init: function() {
    var mediaPlayer = document.getElementById("player");
    this.fetchSongs(mediaPlayer);
  },

  parseSongData: function(songs) {
    console.log('parsing data')
    // for (var key in songs) {
    //   var songInfo = songs[key];
    //   console.log(songInfo.mediaid)
    // }
  },

  fetchSongs: function(player){
    var that = this;
    console.log('fetching songs')
    $.ajax({
      url: 'http://127.0.0.1:4000/songs',
      type: 'GET',
      data: 'json',
      success: function (urls) {
        console.log('urls recieved')
        console.log(urls[0])
        // player.src="http://api.soundcloud.com/tracks/148976759/stream?client_id=201b55a1a16e7c0a122d112590b32e4a";
        // player.play();

        SC.initialize({
          client_id: 'd87cbb575fd8bbaa7e99d2c711c62be0'
        });

        var streamLookup = "http://api.soundcloud.com/resolve?url=" + urls[0] + "&client_id=d87cbb575fd8bbaa7e99d2c711c62be0"

        $.ajax({
          url: streamLookup,
          type: 'GET',
          data: 'json',
          success: function(data) {
            console.log('success')
            console.log(data);
          },
          error: function(err) {
            console.log('error')
            console.log(err);
          }
        })

        // stream track id 293
        // this is currSong.uri
        SC.stream("https://api.soundcloud.com/tracks/216101530", function(sound){
          sound.play();
        });


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

