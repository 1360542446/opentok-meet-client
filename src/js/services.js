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
            roomData.p2p = false;
            roomData.room = getQueryVariable('room');
            roomData.apiKey = getQueryVariable('apiKey');
            roomData.sessionId = getQueryVariable('sessionId');
            roomData.token = getQueryVariable('token');
            resolved(roomData);
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
