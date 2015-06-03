//home.js
var ReminderList = require("../models/reminderList");

module.exports = function(req, reply){
  var list = new ReminderList();
  list.load(function() {
    var data = list.toJSON();
    console.log(data);
    //list is now ready
    reply.view("home", {
      test: "It's alive!",
      reminders: data
    });
  });
};
