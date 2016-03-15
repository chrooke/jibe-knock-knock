"use strict";

let jibo = require('jibo');
let path = require('path');
let GuiManager = require('./mim/debug-gui-manager');
let MimManager = require('./mim/mim-manager');

let Status = jibo.bt.Status;

let root = null;

function start() {
    let root = jibo.bt.create('../behaviors/KnockKnock', {
    });
    root.start();
    let intervalId = setInterval(function() {
        if (root.status !== Status.IN_PROGRESS) {
            clearInterval(intervalId);
            console.log('Behavior tree finished with status ' + root.status);
        } else {
            root.update();
        }
    }, 33);
}

jibo.init().then( function(){
    console.log('Setup');
    require('./behaviors/debug-behavior');
    require('./behaviors/mim');
    require('./behaviors/mim-gui');
    let eyeElement = document.getElementById('eye');
    jibo.visualize.createRobotRenderer(
      eyeElement,
      jibo.visualize.DisplayType.EYE,
      function() {
        start();
      }
    );
    let ui_div = document.getElementById('ui');
    GuiManager.init(ui_div);
    MimManager.init();
    MimManager.setGuiManager(GuiManager);
//    start();
}).catch( function(e) {
      console.error(e);
});
