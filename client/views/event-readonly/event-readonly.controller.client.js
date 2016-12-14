(function(){
    angular
        .module("nugwc")
        .controller("EventListReadonlyController", EventListReadonlyController)
        .controller("EventDetailReadonlyController", EventDetailReadonlyController);

    function EventListReadonlyController($location, $routeParams, EventService, UserService) {
        var vm = this;
        vm.pageIdx = $routeParams.page ? parseInt($routeParams.page) : 1;
        vm.isAttending = isAttending;
        vm.attendEvent = attendEvent;
        vm.unattendEvent = unattendEvent;
        vm.getNumber = getNumber;
        vm.reachLastPage = reachLastPage;

        function init() {
            getEventCnt();
            getEvents();
            getCurrentUser();
        }
        init();

        function getEventCnt() {
            EventService
                .findEventCnt()
                .success(function(eventCnt) {
                    vm.eventCnt = parseInt(eventCnt);
                    vm.pageCnt = Math.ceil(vm.eventCnt / 10);
                })
                .error(function(error) {
                    console.log(error);
                });
        }

        function getEvents() {
            EventService
                .findEvents(vm.pageIdx)
                .success(function(events) {
                    vm.events = events;

                    for (var i = 0; i < vm.events.length; i++) {
                        var datetime = new Date(vm.events[i].date);

                        vm.events[i].month = datetime.toLocaleString("en-us", {month: "short"});
                        vm.events[i].day = datetime.toLocaleString("en-us", {day: "numeric"});
                        vm.events[i].weekday = datetime.toLocaleString("en-us", {weekday: "short"});
                    }
                });
        }

        function getCurrentUser() {
            UserService
                .findCurrentUser()
                .success(function(user) {
                    vm.user = user;
                });
        }

        function isAttending(eventId) {
            if(!vm.user)
                return false;
            var event = vm.events.find(function(e) {return e._id === eventId; });
            var aaa = event.attendees.indexOf(vm.user._id) !== -1;
            return event.attendees.indexOf(vm.user._id) !== -1;
        }

        function attendEvent(eventID) {
            if(!vm.user)
                $location.url("/login/client");
            else
                EventService
                    .attendEvent(vm.user._id, eventID)
                    .then(
                        function() {
                            init();
                        }
                    );
        }

        function unattendEvent(eventID) {
            if(!vm.user)
                $location.url("/login/client");
            else
            EventService
                .unattendEvent(vm.user._id, eventID)
                .then(
                    function() {
                        init();
                    }
                );
        }

        function getNumber(num) {
            return new Array(num);
        }

        function reachLastPage() {
            return vm.pageIdx === vm.pageCnt;
        }
    }

    function EventDetailReadonlyController($location, $routeParams, EventService, UserService) {
        var vm = this;
        vm.eventID = $routeParams.eventID;
        vm.isAttending = isAttending;
        vm.attendEvent = attendEvent;
        vm.unattendEvent = unattendEvent;

        function init() {

            EventService
                .findEventById(vm.eventID)
                .success(function(event) {
                    vm.event = event;

                    var datetime = new Date(vm.event.date);

                    vm.event.datestring = ("0" + datetime.getDate()).slice(-2) + "-" + ("0"+(datetime.getMonth()+1)).slice(-2) + "-" +
                        datetime.getFullYear() + " " + ("0" + datetime.getHours()).slice(-2) + ":" + ("0" + datetime.getMinutes()).slice(-2);

                    vm.event.month = datetime.toLocaleString("en-us", { month: "short" });
                    vm.event.day = datetime.toLocaleString("en-us", { day: "numeric" });
                    vm.event.weekday = datetime.toLocaleString("en-us", { weekday: "short" });

                    EventService
                        .findAttendeesByEventId(vm.eventID)
                        .success(function(event) {
                            vm.attendees = event.attendees;

                            UserService
                                .findCurrentUser()
                                .success(function(user) {
                                    vm.user = user;
                                })
                        })
                });
        }
        init();

        function isAttending() {
            if(!vm.user)
                return false;
            return vm.event.attendees.indexOf(vm.user._id) !== -1;
        }

        function attendEvent() {
            if(!vm.user)
                $location.url("/login/client");
            else
                EventService
                    .attendEvent(vm.user._id, vm.eventID)
                    .then(
                        function() {
                            init();
                        }
                    );
        }

        function unattendEvent() {
            if(!vm.user)
                $location.url("/login/client");
            else
                EventService
                    .unattendEvent(vm.user._id, vm.eventID)
                    .then(
                        function() {
                            init();
                        }
                    );
        }
    }
})();