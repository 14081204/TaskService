var image = {
    npc_0: "NPC05_png",
    npc_1: "NPC04_png",
    ACCEPTABLEimage: "isaccept_png",
    DURINGimage: "processing_png",
    CANSUBMITTEDimage: "canputin_png",
    UNACCEPTABLEimage: "unaccept_png"
};
var NPC = (function () {
    function NPC(npcId, npcName, taskService, NPCtalkpanel) {
        //tileSize: number = 100;
        this.npcimageX = 0;
        this.npcimageY = 64;
        this.npcStageWidth = 64;
        this.npcStageHeight = 128;
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.npcimage = new egret.Bitmap();
        this.npcId = npcId;
        this.npcName = npcName;
        this.taskService = taskService;
        this.taskService.Attach(this, "NPC");
        this.taskNoneState = new TaskNoneState(this);
        this.taskAvilableState = new TaskAvilableState(this);
        this.taskDuringState = new TaskDuringState(this);
        this.taskSubmitState = new TaskSubmitState(this);
        this.taskStateMachine = new StateMachine(this.taskNoneState);
        this.Dialoguepanel = NPCtalkpanel;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getTask = function () {
        this.task = this.taskService.getTaskByCustomRole(this.rule, this.npcId);
        //console.log("This Task State: " + this.task.status);
        this.checkState();
    };
    p.setnpcimage = function () {
        this.npcimage.texture = RES.getRes(image.npc_0);
        this.npcimage.x = this.npcimageX;
        this.npcimage.y = this.npcimageY;
        this.npcimage.width = 150;
        this.npcimage.height = 230;
    };
    p.setnpcimage1 = function () {
        this.npcimage.texture = RES.getRes(image.npc_1);
        this.npcimage.x = this.npcimageX;
        this.npcimage.y = this.npcimageY;
        this.npcimage.width = 150;
        this.npcimage.height = 230;
        //this.npcimage.width = this.tileSize;
        //this.npcimage.height = this.tileSize;
    };
    p.setNpc1 = function (npcX, npcY, npcColor) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setnpcimage1();
    };
    p.setNpc = function (npcX, npcY, npcColor) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setnpcimage();
    };
    p.drawNpcShape = function () {
        this.npcStageShape.graphics.drawRect(0, 0, this.npcStageWidth, this.npcStageHeight);
        this.npcStageShape.graphics.endFill();
    };
    p.drawNpc = function () {
        this.drawNpcShape();
        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;
        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.npcimage);
        this.npcimage.touchEnabled = true;
        //this.npcStage.touchEnabled = true;
        this.npcimage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    };
    p.checkState = function () {
        switch (this.task.status) {
            case TaskStatus.UNACCEPTABLE:
            case TaskStatus.SUBMITTED:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;
            case TaskStatus.ACCEPTABLE:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskAvilableState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.DURING:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskDuringState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskSubmitState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
        }
    };
    p.onNpcClick = function (e, task, npcid) {
        if (task === void 0) { task = this.task; }
        if (npcid === void 0) { npcid = this.npcId; }
        this.taskService.checkTaskRules(task, npcid, this.Dialoguepanel);
    };
    p.onChange = function (task) {
        this.task = task;
        this.checkState();
    };
    p.rule = function (taskList, npcId) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                //console.log("Find");
                return taskList[i];
            }
        }
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map