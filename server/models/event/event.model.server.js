module.exports = function () {

    var model = {};
    var mongoose = require("mongoose");
    var EventSchema = require("./event.schema.server")();
    var EventModel = mongoose.model("EventModel", EventSchema);

    var api = {
        createEvent: createEvent,
        findEvents: findEvents,
        findEventById: findEventById,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        isAttending: isAttending,
        findAttendeesByEventId: findAttendeesByEventId,
        attendEvent: attendEvent,
        unattendEvent: unattendEvent,
        setModel: setModel
    };
    return api;

    function createEvent(event) {
        return EventModel.create(event);
    }

    function findEvents() {
        return EventModel.find();
    }

    function findEventById(eventId) {
        return EventModel.findById(eventId);
    }

    function updateEvent(eventId, event) {
        return EventModel
            .update(
                {
                    _id: eventId
                },
                {
                    name: event.name,
                    location: event.location,
                    description: event.description,
                    capacity: event.capacity,
                    date: event.date,
                    imageUrl: event.imageUrl
                }
            );
    }

    function deleteEvent(eventId) {
        return EventModel
            .remove({_id: eventId});
    }

    function isAttending(eventID, userID) {
        EventModel
            .findById(eventId)
            .then(
                function(eventObj) {
                    if(eventObj.attendees.indexOf(userID) === -1)
                        return false;
                    return true;
                },
                function(error) {
                    console.log(error)
                }
            );
    }

    function findAttendeesByEventId (eventID) {
        return EventModel
            .findById(eventID)
            .populate("attendees")
            .exec();

            // .then(
            //     function(eventObj) {
            //         var attendees = [];
            //         for(var i=0; i<eventObj.attendees.length;) {
            //             model
            //                 .userModel
            //                 .findUserById(eventObj.attendees[i])
            //                 .then(
            //                     function(userObj) {
            //                         attendees.push(userObj.name);
            //                         if(i++ === eventObj.attendees.length - 1)
            //                             return attendees;
            //                     }
            //                 );
            //         }
            //     }
            // );
    }

    function attendEvent(userID, eventID) {
        return EventModel
            .findById(eventID)
            .then(
                function(eventObj) {
                    model
                        .userModel
                        .findUserById(userID)
                        .then(
                            function(userObj) {
                                eventObj.attendees.push(userObj);
                                eventObj.save();
                                userObj.events.push(eventObj);
                                return userObj.save();
                            }
                        );
                }
            );
    }

    function unattendEvent(userID, eventID) {
        return EventModel
            .findById(eventID)
            .then(
                function(eventObj) {
                    model
                        .userModel
                        .findUserById(userID)
                        .then(
                            function(userObj) {
                                eventObj.attendees.splice(eventObj.attendees.indexOf(userID), 1);
                                userObj.events.splice(userObj.events.indexOf(eventID), 1);
                                eventObj.save();
                                return userObj.save();
                            }
                        );
                }
            );
    }

    function setModel(_model) {
        model = _model;
    }
};