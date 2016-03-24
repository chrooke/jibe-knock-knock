"use strict";

let Datastore = require('nedb');
let parse = require('csv-parse');
const fs = require('fs');
let path = require('path');

//let jokes = [
//    ['canoe','Canoe help me with my homework?'],
//    ['orange','Orange you going to let me in?'],
//    ['needle','Needle little money for the movies.']
//];

//read CSV file, send parse as a callback
let readCSV=function(){
  let csvFile=path.resolve(__dirname, '../../schemas/jokes.csv');
  fs.readFile(csvFile,'utf8',function(err,data){
    if (err) {
      console.log('No jokes.csv found. Skipping import.')
    } else {
      parseCSV(data);
    }
  });
}

//parse CSV file, for each line send add if needed to db as a callback
let parseCSV=function(input) {
  parse(input, function(err,output){
    output.forEach(addJokeIfNeeded);
  });
}

//gets an array representing one joke, attempts to look it up to see if it's there.
//  If it's not, it adds it.
let addJokeIfNeeded=function(joke,callback) {
  db.find({ setup: joke[0],punchline: joke[1] }, function(err,docs){
      if (docs.length==0){
        db.insert({
          setup : joke[0],
          punchline : joke[1],
          rnd : Math.random()
        });
      }
    }
  );
}


//load the database
let db = new Datastore({
  filename : "schemas/jokes.json",
  autoload : true,
  onload: function(err){
    if (err) {
      console.log("Uh-oh, NeDB load error:",err);
    } else {
      readCSV();
    }
  }
});

db.ensureIndex({ rnd: 1 });
