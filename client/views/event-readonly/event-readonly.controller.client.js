(function(){
    angular
        .module("nugwc")
        .controller("EventListReadonlyController", EventListReadonlyController)
        .controller("EventDetailReadonlyController", EventDetailReadonlyController);

    function EventListReadonlyController($location, EventService, UserService) {
        var vm = this;
        vm.isAttending = isAttending;
        vm.attendEvent = attendEvent;
        vm.unattendEvent = unattendEvent;

        function init() {
            EventService
                .findEvents()
                .success(function(events){
                    vm.events = events;
                    UserService
                        .findCurrentUser()
                        .success(function(user) {
                            vm.user = user;
                        })
                });
        }
        init();

        function isAttending(eventId) {
            if(!vm.user)
                return false;
            var event = vm.events.find(function(e) {return e._id === eventId; });
            var aaa = event.attendees.indexOf(vm.user._id) !== -1;
            return event.attendees.indexOf(vm.user._id) !== -1;
        }

        function attendEvent(eventID) {
            // if(!vm.user)
            //     $location.url("/login/client");
            // else
                EventService
                    .attendEvent(vm.user._id, eventID)
                    .then(
                        function() {
                            init();
                        }
                    );
        }

        function unattendEvent(eventID) {
            // if(!vm.user)
            //     $location.url("/login/client");
            // else
            EventService
                .unattendEvent(vm.user._id, eventID)
                .then(
                    function() {
                        init();
                    }
                );
        }
    }

    function EventDetailReadonlyController($location, $routeParams, EventService) {
        var vm = this;
        vm.eventID = $routeParams.eventID;

        function init() {
            EventService
                .findEventById(vm.eventID)
                .success(function(event) {
                    vm.event = event;

                    EventService
                        .findAttendeesByEventId(vm.eventID)
                        .success(function(event) {
                            vm.attendees = event.attendees;
                        })
                });
        }
        init();



        // vm.createEvent = createEvent;
        //
        // function createEvent(name, location,  description) {
        //     var event = {
        //         name: name,
        //         location: location,
        //         description: description
        //     };
        //     EventService
        //         .createEvent(event)
        //         .success(function () {
        //             $location.url("/event");
        //         })
        //         .error(function(error) {
        //             vm.error = error;
        //         });
        // }
    }
})();