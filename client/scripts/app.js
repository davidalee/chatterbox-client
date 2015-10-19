var app = {

  message: {},

  init: function () {
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
        return true;
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
      url: 'https://api.parse.com/1/classes/chatterbox',
      //set type: to 'POST'
      type: 'GET',
      //set data: to JSON stringified message variable
      data: JSON.stringify(message),
      //set content/type: to application/json
      contentType: 'application/json',
      //set success: to return on delivery
      success: function (message) {
        this.message = message;
        return true;
      },
      //set error: to return vague message if it goes to hell.
      error: function () {
        console.log('Error sending message!');
      }
    });
    
  },
};
