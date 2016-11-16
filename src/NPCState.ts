class TaskNoneState implements State {

    private npc: NPC;

    constructor(npc: NPC) {
        this.npc = npc;

    }

    onEnter() {
        //console.log("Enter Task None State");

    }

    onExit() {
        //console.log("Exit Task None State");
    }

}

class TaskAvilableState implements State {

    private npc: NPC;

    taskSign: egret.Bitmap;
    taskSignX = 50;
    taskSignY = 20;
    taskSignWidth = 50;
    taskSignHeight = 50;

    constructor(npc: NPC) {
        this.npc = npc;
        this.taskSign = new egret.Bitmap();

    }

    onEnter() {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        //console.log("Enter Task Avilable State");

    }

    onExit() {
        this.npc.npcStage.removeChild(this.taskSign);
        //console.log("Exit Task Avilable State");

    }

    drawTaskSign() {
        this.taskSign.x = this.taskSignX;
        this.taskSign.y = this.taskSignY;
        this.taskSign.width = this.taskSignWidth;
        this.taskSign.height = this.taskSignHeight;
        this.taskSign.texture=RES.getRes(image.ACCEPTABLEimage);

    }

}

class TaskDuringState implements State {

    private npc: NPC;

    taskSign: egret.Bitmap;
    taskSignX = 55;
    taskSignY = 37;
    taskSignWidth = 70;
    taskSignHeight = 70;

    constructor(npc: NPC) {
        this.npc = npc;
        this.taskSign = new egret.Bitmap();

    }

    onEnter() {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        console.log("Enter Task Avilable State");

    }

    onExit() {
        this.npc.npcStage.removeChild(this.taskSign);
        console.log("Exit Task Avilable State");

    }

    drawTaskSign() {
        this.taskSign.x = this.taskSignX;
        this.taskSign.y = this.taskSignY;
        this.taskSign.width = this.taskSignWidth;
        this.taskSign.height = this.taskSignHeight;
        this.taskSign.texture=RES.getRes(image.DURINGimage);

    }
}

class TaskSubmitState implements State {

    private npc: NPC;

    taskSign: egret.Bitmap;
    taskSignX = 55;
    taskSignY = 37;
    taskSignWidth = 70;
    taskSignHeight = 70;

    constructor(npc: NPC) {
        this.npc = npc;
         this.taskSign = new egret.Bitmap();

    }

    onEnter() {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        console.log("Enter Task Submit State");

    }

    onExit() {
        this.npc.npcStage.removeChild(this.taskSign);
        console.log("Exit Task Submit State");

    }

    drawTaskSign() {
        this.taskSign.x = this.taskSignX;
        this.taskSign.y = this.taskSignY;
        this.taskSign.width = this.taskSignWidth;
        this.taskSign.height = this.taskSignHeight;
        this.taskSign.texture=RES.getRes(image.CANSUBMITTEDimage);

    }

}