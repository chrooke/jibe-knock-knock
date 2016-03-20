"use strict";

let Datastore = require('nedb');

let db = new Datastore({
  filename : "schemas/jokes.json",
  autoload : true,
  onload: function(err){
    if (err) {
      console.log("Uh-oh, NeDB load error:",err)
    }
  }
});

let jokes = [
    ['canoe','Canoe help me with my homework?'],
    ['orange','Orange you going to let me in?'],
    ['needle','Needle little money for the movies.']
];

db.ensureIndex({ rnd: 1 });

for (let i=0; i<jokes.length; i++) {
  db.insert({
    _id: i+1,
    setup : jokes[i][0],
    punchline : jokes[i][1],
    rnd : Math.random()
  })
}
