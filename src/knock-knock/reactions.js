"use strict";

const fs = require('fs');
let path = require('path');
let async = require('async');
let jibo = require("jibo");

class Reactions {
  constructor() {
    let root = path.join(__dirname, '..', '..');
    let reactionsPath = path.join(root,'animations','reactions');
    let _this=this;
    this.basePath=root;
    this.reactionsPath=reactionsPath;
    // get the list of reactions
    let reactions = fs.readdirSync(this.reactionsPath);

    this.reactions=reactions;

//taking array reactions and for each reaction I'm:
    //setting a keyspath based on that reaction
    //reading in the files in that keysPath
    //setting a this variable for the reaction to that array
    async.each(reactions,function(reaction,callback){
//      console.log('getting keys file list for reaction ',reaction);
      let keysPath = path.join(_this.reactionsPath,reaction);
      let keysFiles = fs.readdirSync(keysPath);
      _this[reaction]=keysFiles;
      //taking array this[reaction] and for each file I'm:
        //setting the animPath
        //setting _this
        //creating the animation builder
      async.each(_this[reaction], function(keysFile,callback){
        let animPath = path.join(_this.reactionsPath,reaction,keysFile);
//        console.log('creating builder for ',animPath,_this.basePath);
        async.series([
          function(callback){
            jibo.animate.createAnimationBuilderFromKeysPath(animPath, _this.basePath, function(builder) {
              builder.setDOFs(jibo.animate.dofs.ALL);
          //    builder.on(jibo.animate.AnimationEventType.STOPPED, function() {
          //    });
              _this.registerAnimationBuilder(reaction, keysFile, builder);
            });
            callback();
          }
        ], function(err){
          callback();
        });
      }, function (err) {
          if (err) {
            console.log('Error creating builders:', err);
          };
      });
      callback();
    }, function(err) {
        if (err) {
          console.log('Error processing reactions:',err);
        };
    });

  }

  registerAnimationBuilder(reaction, keysFile, builder) {
//    console.log('registerAnimationBuilder:',reaction, keysFile, builder);
    let builder_tag='builder_'+reaction+'_'+keysFile;
//    console.log('registerAnimationBuilder:',builder_tag);
    this[builder_tag]=builder;
//    console.log('registerAnimationBuilder:',this[builder_tag]);
  }

  // Play a random key file of the given reaction
  playRandomReaction(reaction) {
//    console.log('in playRandomReaction');
//    console.log(this);
    if (this[reaction]) {
      let keysFile=this[reaction][Math.round(Math.random()*((this[reaction].length)-1))];
      let builder_tag='builder_'+reaction+'_'+keysFile;
//      console.log('playRandomReaction: ',builder_tag);
      this[builder_tag].play();
    }
  }
}

module.exports = Reactions;
