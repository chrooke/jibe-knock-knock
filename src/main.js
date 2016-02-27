import jibo from 'jibo';
import path from 'path';
import GuiManager from './mim/debug-gui-manager';
import MimManager from './mim/mim-manager';

let {Status, factory} = jibo.bt;

let root = null;

let blackboard = {};
let notepad = {};

function start() {
    let root = factory.create('../behaviors/KnockKnock', {
      blackboard: blackboard,
      notepad: notepad
    });
    root.start();
    let intervalId = setInterval(() => {
        if (root.status !== Status.IN_PROGRESS) {
            clearInterval(intervalId);
        }
        else {
            root.update();
        }
    }, 33);
}

jibo.init().then(() => {
    console.log('Setup');
    require('./behaviors/debug-behavior');
    require('./behaviors/mim');
    require('./behaviors/mim-gui');
    let eyeElement = document.getElementById('eye');
    jibo.visualize.createRobotRenderer(eyeElement, jibo.visualize.DisplayType.EYE);
    let ui_div = document.getElementById('ui');
    GuiManager.init(ui_div);
    MimManager.init();
    MimManager.setGuiManager(GuiManager);
    start();
}).catch(e => {
    console.error(e);
});
