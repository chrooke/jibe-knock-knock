"use strict";

class JokeRepo {
  constructor() {
    this.jokes = [
        ['canoe','Canoe help me with my homework?'],
        ['orange','Orange you going to let me in?'],
        ['needle','Needle little money for the movies.']
    ];
  }

  randomJoke() {
    let joke = this.jokes[Math.round(Math.random()*((this.jokes.length)-1))];

    return { setup: joke[0], punchline: joke[1]}
  }

}

module.exports = JokeRepo;
