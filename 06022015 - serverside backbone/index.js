/*
/views - templates go here
/assets | /public - css, js, images
/handlers - controllers
/models - Backbone models
routes.js - contains all routing
database.js - start and config SQLite
*/
var hapi = require("hapi");
var server = new hapi.Server();
server.connection({port:8000});
server.views({
  engines:{
    html: require("handlebars")
  },
  path: "./views",
  isCached:false
});

var Reminder = require("./models/reminder");

var sql = require("./database");
sql.init(function(){
  console.log("database is ready!");
  var reminder = new Reminder({
    task: "Start Server"
  });
  reminder.create(function(err){
    if (err){
      console.error(err);
    }
    // sql.connection.all("SELECT * FROM reminders", function(err, results){
    //   console.log(err, results);
    // });
  });
  server.start();
});

var routes = require("./routes");
server.route(routes);
