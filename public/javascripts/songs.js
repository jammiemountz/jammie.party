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
    // var iframeElement   = document.querySelector('iframe');
    // app.widget1 = SC.Widget(iframeElement);
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
      var classStr = 'song-data ' + key
      var songTitle = $('<div></div>').addClass(classStr).text(urls[key].title)
      $('#data').append(songTitle)
    }
  },

  playSong: function(song) {
    // stream track id 293
    // this is currSong.uri

    var stream = "https://api.soundcloud.com" + song.pathname;
    
    SC.stream(stream, function(sound){
      app.sound = sound;
      app.sound.play()
      sound.on('stateChange', function(evt){
        console.log('i change: ', evt)
      })
    });
  },

  getSongData: function(data) {
    $.ajax({
      url: 'http://127.0.0.1:4000/songs',
      type: 'POST',
      data: data,
      success: function (uri) {
        console.log('soundcloud URI recieved - ', uri)
      },
      error: function(err) {
        console.log("ERROR'd")
        console.log(err)
      }
    }).then(function(uri){
      app.playSong(uri)
    })
    
  }

}

$(document).ready(function() {
  
  app.init();

  $("#play").click(function(){
    console.log(app.songData[0].mediaid)
    var data = {mediaId: app.songData[0].mediaid}
    app.getSongData(data);

  })

  $("#forward").click(function(){
    app.sound.pause();
    app.count = app.count + 1;
    var data = {mediaId: app.songData[app.count].mediaid}
    console.log(data)
    app.getSongData(data)
  })

  $("#backward").click(function(){
    app.sound.pause();
    app.count = app.count + -1;
    var data = {mediaId: app.songData[app.count].mediaid}
    console.log(data)
    app.getSongData(data)
  })


})

