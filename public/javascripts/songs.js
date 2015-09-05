var app = {

  songData: {},
  count: 0,

  init: function() {
    var that = this;
    var mediaPlayer = document.getElementById("player");
    app.fetchSongs(mediaPlayer);
    SC.initialize({
      client_id: 'd87cbb575fd8bbaa7e99d2c711c62be0'
    });
    // SC.bind(SC.Widget.Events.FINISH, function(){
    //   count++;
    //   that.playSong(songData[count])
    // })
  },

  fetchSongs: function(player){
    console.log('fetching songs')
    $.ajax({
      url: 'http://127.0.0.1:4000/songs',
      type: 'GET',
      data: 'json',
      success: function (urls) {
        console.log('urls recieved')
      },
      error: function(err) {
        console.log("ERROR'd")
        console.log(err)
      }
    }).then(function(urls){
      console.log('in the then with: ', urls)
      app.songData = urls;
      app.showSongs(urls)
      // that.playSong(that.songData[0])
    })
  },

  showSongs: function(urls){
    console.log('in the showsongs')
    for (var key in urls) {
      var songTitle = $('<div></div>').addClass('song-data').text(urls[key].title)
      $('#data').append(songTitle)
    }
  },

  playSong: function(song) {
    // stream track id 293
    // this is currSong.uri
    
    console.log('in the playsong', song);
    console.log('in the playsong', mediaid);
    SC.stream("https://api.soundcloud.com/tracks/216101530", function(sound){
      // sound.play()
    });
  }

}

$(document).ready(function() {
  
  app.init();

  $("#play").click(function(){
    console.log(app.songData[0])
    var data = {mediaId: app.songData[0].mediaid}
    $.ajax({
      url: 'http://127.0.0.1:4000/songs',
      type: 'POST',
      data: data,
      success: function (uri) {
        console.log('soundcloud URI recieved')
      },
      error: function(err) {
        console.log("ERROR'd")
        console.log(err)
      }
    }).then(function(uri){
      console.log('in the then with uri: ', uri)
    })

  })

})

