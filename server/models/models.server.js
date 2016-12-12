module.exports = function() {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/nugwc');

    var userModel = require("./user/user.model.server")();
    var eventModel = require("./event/event.model.server")();

    var model = {
        userModel: userModel,
        eventModel: eventModel
    };

    eventModel.setModel(model);
    // userModel.setModel(model);

    return model;
};