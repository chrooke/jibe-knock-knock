"use strict";

let Datastore = require('nedb');
let parse = require('csv-parse');
const fs = require('fs');
let path = require('path');

class JokeRepo {
  constructor() {
    this.jokes = new Datastore({
      filename : "schemas/jokes.json",
      autoload : true
    });
    this.jokes.ensureIndex({ rnd: 1 });

  }

  randomJoke(callback) {
    let _this=this;
    this.jokes.count({}, function(err,count){
//      console.log(count," jokes available.")
      let skip = Math.floor(Math.random() * count);
      //console.log("Skipping to place ",skip);
//      console.log('count:',count);
//      console.log('skip:',skip)
      _this.jokes.find({}).limit(1).skip(skip).exec(function (err, doc) {
//                console.log('in find: doc:',doc);
                callback(err,{ setup: doc[0].setup, punchline: doc[0].punchline });
      });
   });

//  This method is theoretically faster for a large database, but fails if it picks a random number
//    higher than anything in the database. I'll keep this in mind if the performance starts to take a hit.
//    this.jokes.findOne({ rnd: { $gte: Math.random() } }).sort({ rnd: 1 }).exec(function (err, doc) {
//      console.log('in find: doc:',doc);
//      callback(err,{ setup: doc.setup, punchline: doc.punchline });
//    });;
  }

  loadNewJokes(callback){
    //read CSV file, send parse as a callback
      let _this=this;
      let csvFile=path.resolve(__dirname, '../../schemas/jokes.csv');
      fs.readFile(csvFile,'utf8',function(err,data){ //read in CSV file
        if (err) {
            console.log('No jokes.csv found. Skipping import.');
            callback();
        } else {
            parse(data,function(err,output){ //parse CSV file
              if (err) {
                  console.log('Error parsing CSV:',err);
                  callback();
              } else {
                  output.forEach(function(joke,callback) { //get one joke, look it up to see if it's there
                    _this.jokes.find({ setup: joke[0],punchline: joke[1] }, function(err,docs){
                        if (docs.length==0){ //it's not there, add it
//                          console.log('Adding',joke[0],joke[1]);
                          _this.jokes.insert({
                            setup : joke[0],
                            punchline : joke[1],
                            rnd : Math.random()
                          });
                        }
                    });
                  });
                  callback();
              }
          });
        }
      });
  }

}

module.exports = JokeRepo;
