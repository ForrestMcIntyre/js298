var hapi = require('hapi');
var fs = require('fs');
var server = new hapi.Server();

server.connection({port:8000});
server.start();

server.views({
  path: "templates",
  engines: {
    html: require("handlebars")
  },
  layoutPath: "layouts",
  layout: "default",
  isCached: false
});

server.route({
  method: "GET",
  path:"/assets/{param*}",
  handler: {
    directory:{
      path: "public"
    }
  }
});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply){
    reply.view("index");
  }
});

server.route({
  method: "GET",
  path: "/movies",
  handler: function(req, reply){
    fs.readFile("movies.json", "utf8", function(err, data){
      console.log(data);
      reply.view("movieList", JSON.parse(data));
    });
  }
});

server.route({
  method: "GET",
  path: "/movies/{movieID}",
  handler: function(req, reply){
    fs.readFile("movies.json", "utf8", function(err, data){
      reply.view("movieView", {
        movie: JSON.parse(data).movies[req.params.movieID]
      });
    });
  }
})
