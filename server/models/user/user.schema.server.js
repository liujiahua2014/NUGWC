module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        google:   {
            id:    String,
            token: String
        },
        facebook: {
            id: String,
            token: String
        },
        dateCreated: {type: Date, default: Date.now},
        role: {type: String, enum: ['ADMIN', 'CLIENT']},
        events: [{type: mongoose.Schema.Types.ObjectId, ref:'EventModel'}]
    }, {collection: "user"});
    return UserSchema;
};