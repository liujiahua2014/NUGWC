module.exports = function () {
    var mongoose = require("mongoose");

    var EventSchema = mongoose.Schema({
        name: {type: String, required: true},
        location: String,
        description: String,
        attendees: [{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        dateCreated: {type: Date, default: Date.now},
        date: Date,
        capacity: Number,
        imageUrl: String
    }, {collection: "event"});

    return EventSchema;
};