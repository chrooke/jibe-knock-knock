"use strict";

let Datastore = require('nedb');

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
      let skip = Math.floor(Math.random() * count)
//      console.log('count:',count);
//      console.log('skip:',skip)
      _this.jokes.find({}).limit(1).skip(skip).exec(function (err, doc) {
                console.log('in find: doc:',doc);
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

}

module.exports = JokeRepo;
