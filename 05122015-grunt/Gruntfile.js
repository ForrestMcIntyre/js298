module.exports = function(grunt){
  // locate all JS fiels inside src/js
  // "src/js/**/*.js"
  // will find:
  //  src/js/lib/share.min.js
  //  src/js/main.js
  // will not find:
  //  src/js/index.html
  //  src/404.js

  grunt.registerTask("hello", function(){
  console.log("Hello from Grunt!");
  grunt.file.write("build/test.txt",
  "This file is written sync");
  });




  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-nodemon");

  grunt.registerTask("default", ["autoprefixer", "concurrent"]);


  grunt.initConfig({
    concurrent:{
      dev:{
        tasks: ["watch", "nodemon"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon:{
      dev:{
        script: "index.js"
      }
    },
    watch:{
      prefix: {
        files: "src/css/**/*.css",
        tasks: ["autoprefixer"]
      }
    },
    autoprefixer: {
      dev: {
        expand:true,
        flatten: true,
        src: "src/css/**/*.css",
        dest: "build/css/"
      }
    }
  });

};
