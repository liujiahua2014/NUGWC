(function(){
    angular
        .module("nugwc")
        .factory("EventService", EventService);

    function EventService($http) {
        var api = {
            createEvent: createEvent,
            findEvents: findEvents,
            findEventById: findEventById,
            updateEvent: updateEvent,
            deleteEvent: deleteEvent,
            isAttending: isAttending,
            findAttendeesByEventId: findAttendeesByEventId,
            attendEvent: attendEvent,
            unattendEvent: unattendEvent
        };
        return api;

        function createEvent(event) {
            var url = "/api/event";
            return $http.post(url, event);
        }

        function findEvents() {
            var url = "/api/event";
            return $http.get(url);
        }

        function findEventById(eventID) {
            var url = "/api/event/"+eventID;
            return $http.get(url);
        }

        function updateEvent(event) {
            var url = "/api/event/" + event._id;
            return $http.put(url, event);
        }

        function deleteEvent(eventID) {
            var url = "/api/event/" + eventID;
            return $http.delete(url);
        }

        function isAttending(userID, eventID) {
            var url = "/api/event/" + eventID + "/user/" + userID;
            return $http.get(url);
        }

        function attendEvent(userID, eventID) {
            var url = "/api/event/" + eventID + "/user/" + userID + "/attend";
            return $http.post(url);
        }

        function unattendEvent(userID, eventID) {
            var url = "/api/event/" + eventID + "/user/" + userID + "/unattend";
            return $http.post(url);
        }

        function findAttendeesByEventId(eventID) {
            var url = "/api/event/" + eventID + "/attendees";
            return $http.get(url);
        }
    }
})();