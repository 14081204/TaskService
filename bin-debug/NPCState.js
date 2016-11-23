var TaskNoneState = (function () {
    function TaskNoneState(npc) {
        this.npc = npc;
    }
    var d = __define,c=TaskNoneState,p=c.prototype;
    p.onEnter = function () {
        //console.log("Enter Task None State");
    };
    p.onExit = function () {
        //console.log("Exit Task None State");
    };
    return TaskNoneState;
}());
egret.registerClass(TaskNoneState,'TaskNoneState',["State"]);
var TaskAvilableState = (function () {
    function TaskAvilableState(npc) {
        this.taskSignX = 50;
        this.taskSignY = 20;
        this.taskSignWidth = 50;
        this.taskSignHeight = 50;
        this.npc = npc;
        this.taskSign = new egret.Bitmap();
    }
    var d = __define,c=TaskAvilableState,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        //console.log("Enter Task Avilable State");
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
        //console.log("Exit Task Avilable State");
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSignX;
        this.taskSign.y = this.taskSignY;
        this.taskSign.width = this.taskSignWidth;
        this.taskSign.height = this.taskSignHeight;
        this.taskSign.texture = RES.getRes(image.ACCEPTABLEimage);
    };
    return TaskAvilableState;
}());
egret.registerClass(TaskAvilableState,'TaskAvilableState',["State"]);
var TaskDuringState = (function () {
    function TaskDuringState(npc) {
        this.taskSignX = 55;
        this.taskSignY = 37;
        this.taskSignWidth = 70;
        this.taskSignHeight = 70;
        this.npc = npc;
        this.taskSign = new egret.Bitmap();
    }
    var d = __define,c=TaskDuringState,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        //console.log("Enter Task Avilable State");
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
        //console.log("Exit Task Avilable State");
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSignX;
        this.taskSign.y = this.taskSignY;
        this.taskSign.width = this.taskSignWidth;
        this.taskSign.height = this.taskSignHeight;
        this.taskSign.texture = RES.getRes(image.DURINGimage);
    };
    return TaskDuringState;
}());
egret.registerClass(TaskDuringState,'TaskDuringState',["State"]);
var TaskSubmitState = (function () {
    function TaskSubmitState(npc) {
        this.taskSignX = 55;
        this.taskSignY = 37;
        this.taskSignWidth = 70;
        this.taskSignHeight = 70;
        this.npc = npc;
        this.taskSign = new egret.Bitmap();
    }
    var d = __define,c=TaskSubmitState,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        //console.log("Enter Task Submit State");
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
        //console.log("Exit Task Submit State");
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSignX;
        this.taskSign.y = this.taskSignY;
        this.taskSign.width = this.taskSignWidth;
        this.taskSign.height = this.taskSignHeight;
        this.taskSign.texture = RES.getRes(image.CANSUBMITTEDimage);
    };
    return TaskSubmitState;
}());
egret.registerClass(TaskSubmitState,'TaskSubmitState',["State"]);
//# sourceMappingURL=NPCState.js.map