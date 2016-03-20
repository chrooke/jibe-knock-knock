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
    this.jokes.find({}).limit(1).skip(Math.floor(Math.random() * this.jokes.count({}))).exec(function (err, doc) {
              console.log('in find: doc:',doc);
              callback(err,{ setup: doc[0].setup, punchline: doc[0].punchline });
    });
  }

}

module.exports = JokeRepo;
