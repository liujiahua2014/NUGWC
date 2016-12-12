(function(){
    angular
        .module("nugwc")
        .controller("EventListController", EventListController)
        .controller("NewEventController", NewEventController)
        .controller("EditEventController", EditEventController);

    function EventListController($routeParams, EventService) {
        var vm = this;

        function init() {
            EventService
                .findEvents()
                .success(function(events){
                    vm.events = events;
                });
        }

        init();
    }

    function NewEventController($location, $routeParams, EventService) {
        var vm = this;
        vm.createEvent = createEvent;

        function createEvent(event) {
            var datetime = new Date(event.date);
            datetime.setTime( datetime.getTime() - datetime.getTimezoneOffset()*60*1000 );
            event.date = datetime.toString();

            EventService
                .createEvent(event)
                .success(function () {
                    $location.url("/event");
                })
                .error(function(error) {
                    vm.error = error;
                });
        }
    }

    function EditEventController($location, $routeParams, EventService) {
        var vm = this;
        vm.eventID = $routeParams.eventID;
        vm.deleteEvent = deleteEvent;
        vm.updateEvent = updateEvent;

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

        function deleteEvent() {
            EventService
                .deleteEvent(vm.eventID)
                .success(function() {
                    $location.url("/event");
                })
                .error(function(err) {
                    vm.error = err;
                });
        }

        function updateEvent() {
            var datetime = new Date(vm.event.date);
            datetime.setTime( datetime.getTime() - datetime.getTimezoneOffset()*60*1000 );
            vm.event.date = datetime.toString();

            EventService
                .updateEvent(vm.event)
                .success(function() {
                    $location.url("/event");
                })
                .error(function(err) {
                    vm.error = err;
                });
        }
    }
})();