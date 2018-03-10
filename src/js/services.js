// Asynchronous fetching of the room. This is so that the mobile app can use the
// same controller. It doesn't know the room straight away
angular.module('opentok-meet').factory('RoomService', ['$http', 'baseURL', '$window', 'room',
  function ($http, baseURL, $window, room) {
    return {
      getRoom: function () {
        // return $http.get(baseURL + room).then(function(response) {
        //   return response.data;
        // });

        return new Promise((resolved, reject) => {
          try {
            let roomData = {};

            $.ajax({
              url: 'http://localhost:3000/user/room',
              type: 'post',
              headers:{
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization':window.localStorage.getItem('authorization')
              },
              contentType: 'application/json',
              data: {
                'room': window.localStorage.getItem('room'),
                'username':window.localStorage.getItem('username')
              },
              dataType: 'json'
            }).done(function (e) {
              roomData.p2p = false;
              roomData.room = e.room;
              roomData.apiKey = e.apiKey;
              roomData.sessionId = e.sessionId;
              roomData.token = e.token;
              resolved(roomData);
            }).fail(function (e) {
              // window.location.href = './loginUser.html';
              console.error(e);
            });
          }
          catch (e) {
            reject(e);
          }
        });
      },
      changeRoom: function () {
        $window.location.href = baseURL;
      }
    };
  }
]);
