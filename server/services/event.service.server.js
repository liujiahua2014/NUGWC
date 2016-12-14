module.exports = function(app, model) {

    // var multer = require('multer');
    // var upload = multer({ dest: __dirname+'./../uploads' });

    app.post("/api/event", createEvent);
    app.get("/api/event", findEvents);
    app.get("/api/event/cnt", findEventCnt);
    app.get("/api/event/:eventID", findEventById);
    app.put("/api/event/:eventID", updateEvent);
    app.delete("/api/event/:eventID", deleteEvent);
    app.get("/api/event/:eventID/user/:userID", isAttending);
    app.get("/api/event/:eventID/attendees", findAttendeesByEventId);
    app.post("/api/event/:eventID/user/:userID/attend", attendEvent);
    app.post("/api/event/:eventID/user/:userID/unattend", unattendEvent);
    // app.post ("/api/event/uploads", upload.single('myFile'), uploadImage);

    function createEvent(req, res) {
        var event = req.body;
        model.eventModel
            .createEvent(event)
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findEvents(req, res) {
        model.eventModel
            .findEvents(req.query.page)
            .then(
                function(events) {
                    res.json(events);
                }
            );
    }

    function findEventCnt(req, res) {
        model.eventModel
            .findEventCnt()
            .then(
                function(eventCnt) {
                    res.json(eventCnt);
                }
            );
    }

    function findEventById(req, res) {
        var eventID = req.params.eventID;
        model.eventModel
            .findEventById(eventID)
            .then(
                function(event) {
                    res.json(event);
                }
            );
    }

    function updateEvent(req, res) {
        var event = req.body;
        var eventID = req.params.eventID;
        model
            .eventModel
            .updateEvent(eventID, event)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteEvent(req, res) {
        var eventID = req.params.eventID;
        model
            .eventModel
            .deleteEvent(eventID)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function isAttending(req, res) {
        var eventID = req.params.eventID;
        var userID = req.params.userID;
        model.
            eventModel
            .isAttending(eventID, userID)
            .then(
                function (result) {
                    res.send(result);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAttendeesByEventId(req, res) {
        var eventID = req.params.eventID;
        model
            .eventModel
            .findAttendeesByEventId(eventID)
            .then(
                function (event) {
                    res.json(event);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function attendEvent(req, res) {
        var eventID = req.params.eventID;
        var userID = req.params.userID;

        model
            .eventModel
            .attendEvent(userID, eventID)
            .then(
                function (user) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function unattendEvent(req, res) {
        var eventID = req.params.eventID;
        var userID = req.params.userID;

        model
            .eventModel
            .unattendEvent(userID, eventID)
            .then(
                function (user) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    // function uploadImage(req, res) {
    //
    //     var eventID = req.body.eventID;
    //     var event = JSON.parse(req.body.event);
    //     var filename = req.file.filename;
    //
    //     event.imageUrl = "./../server/uploads/" + filename + ".jpg";
    //
    //     model
    //         .eventModel
    //         .updateEvent(eventID, event)
    //         .then(
    //             function (status) {
    //                 res.send(200);
    //             },
    //             function (error) {
    //                 res.sendStatus(400).send(error);
    //             }
    //         );
    //
    //     res.redirect("/#/event/"+eventID);
    // }

}