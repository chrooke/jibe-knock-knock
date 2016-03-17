"use strict";

const fs = require('fs');
let path = require('path');
let jibo = require("jibo")

class Reactions {
  constructor() {
    let root = path.join(__dirname, '..', '..');
    let reactionsPath = path.join(root,'animations','reactions');
    this.basePath=root;
    this.reactionsPath=reactionsPath;
    // get the list of reactions
    let reactions = fs.readdirSync(this.reactionsPath);

    this.reactions=reactions;
    // for each reaction, build an array of keys files for that reaction and store it in the object
    for (let i = 0; i < reactions.length; i++) {
      let keysPath = path.join(this.reactionsPath,reactions[i]);
      let keysFiles = fs.readdirSync(keysPath);
      this[reactions[i]]=keysFiles;
    }
  }

  // Play a random key file of the given reaction
  playRandomReaction(reaction) {
    if (this[reaction]) {
      let keysFile=this[reaction][Math.round(Math.random()*((this[reaction].length)-1))];
      let animPath = path.join(this.reactionsPath,reaction,keysFile);
      //console.log('animPath: '+animPath);
      //console.log('root: '+this.basePath);
      jibo.animate.createAnimationBuilderFromKeysPath(animPath, this.basePath, function(builder) {
        builder.setDOFs(jibo.animate.dofs.ALL);
        builder.on(jibo.animate.AnimationEventType.STOPPED, function() {
        });
        builder.play();
      })
    }
  }
}

module.exports = Reactions;
