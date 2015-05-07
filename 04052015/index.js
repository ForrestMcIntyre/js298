var hapi = require("hapi");
var fs = require("fs");
var server = new hapi.Server();

server.connection({
  port:8000
});

server.start();



server.views({
  path: "templates",
  engines: {
    html: require("handlebars"),
  },
  layoutPath: "layouts",
  layout: "default",
  partialsPath:"templates/partials",
  isCached: false
});

server.route({
  method: "GET",
  path: "/projects",
  handler: function(req, reply){
    fs.readFile("classes.json", "utf8", function(err, data){
      reply.view("classes", {
        title: "Classes",
        classes: JSON.parse(data)
      });
    })
  }
})

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply){
    reply.view("index", {
      title: "Home"
    });
  }
});

server.route({
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: "public"
    }
  }
});
