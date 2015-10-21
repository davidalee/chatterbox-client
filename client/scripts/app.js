var app = {

  cache: {},
  user: {
    username: '',
    message: {},
    friends: {},
    room: 'lobby'
  },

  rooms: {},

  init: function () {
    this.user.username = window.location.search.match(/\w+$/gi).join('');
    setInterval(this.fetch, 500);
  },

  send: function (message) {

    //Refactor app.send to make an Ajax request
    $.ajax({
      //set url: to chatterbox on PARSE
      url: 'https://api.parse.com/1/classes/chatterbox',
      //set type: to 'POST'
      type: 'POST',
      //set data: to JSON stringified message variable
      data: JSON.stringify(message),
      //set content/type: to application/json
      contentType: 'application/json',
      //set success: to return on delivery
      success: function () {
        console.log('message was sent!');
      },
      //set error: to return vague message if it goes to hell.
      error: function () {
        console.log('Error sending message!');
      }
    });
  },


  fetch: function() {
    //Refactor app.send to make an Ajax request

    $.ajax({
      //set url: to chatterbox on PARSE
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt&limit=1',
      //set type: to 'POST'
      type: 'GET',
      //set content/type: to application/json
      contentType: 'application/json',
      //set success: to return on delivery
      success: function (data) {
        app.processMessages(data);
      },
      //set error: to return vague message if it goes to hell.
      error: function () {
        console.log('Error fetching message!');
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  addMessage: function(message) {
    if (message.username in this.user.friends){
      $('.chatroom').append('<li class=\"username\"><b>' + message.username + '</b></li>');

    } else {
        $('.chatroom').append('<li class=\"username\">' + message.username + '</li>').on('click', '.username', function (){
        console.log('friend added!');
        app.addFriend(message.username);
      });
    }
    $('.chatroom').append('<li class=\"message\">' + message.text + '</li>');

    // Modify addMessages
  },

  processMessages: function(data) {
    if( data.results[0].objectId !== this.cache.objectId && data.results[0].roomname === this.user.room){
      this.cache.objectId = data.results[0].objectId;
      this.addMessage(data.results[0]);
    }
  },

  addRoom: function(roomname) {
    $('#roomSelect').append('<option value=\"' + roomname + '\">' + roomname + '</option>');
    this.rooms[roomname] = true;
  },

  addFriend: function(friend) {
    this.user.friends[friend] = 'bff';
  },

  handleSubmit: function(text){
    this.user.message.username = this.user.username;
    this.user.message.text = text;
    this.user.message.roomname = this.user.room;

    this.send(this.user.message);
    console.log('message was sent');
  }
};

app.init();

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };