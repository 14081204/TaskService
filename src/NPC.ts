var emojiimage = {
    npc_0: "NPC01_png",
    npc_1: "NPC02_png",
    ACCEPTABLEimage: "isaccept_png",
    DURINGimage: "processing_png",
    CANSUBMITTEDimage: "canputin_png",
    UNACCEPTABLEimage: "unaccept_png"
};

class NPC implements Observer {

    public npcStage: egret.DisplayObjectContainer;

    taskService: TaskService;

    task: Task;

    npcId: string;
    npcName: string;

    emoji: egret.Bitmap;
    tileSize: number = 64;
    emojiX: number = 0;
    emojiY: number = 64;

    npcStageShape: egret.Shape;
    npcStageX: number;
    npcStageY: number;
    npcStageWidth = 64;
    npcStageHeight = 128;
    
    Dialoguepanel:DialoguePanel;

    public constructor(npcId: string, npcName: string, taskService,Dialoguepanel:DialoguePanel) {
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.emoji = new egret.Bitmap();
        this.npcId = npcId;
        this.npcName = npcName;
        this.taskService = taskService;
        this.taskService.Attach(this, "NPC");

        this.Dialoguepanel=Dialoguepanel;
    }

    getTask() {
        this.task = this.taskService.getTaskByCustomRole(this.rule, this.npcId);
        console.log("This Task State: " + this.task.status);
    }

    setemoji() {
        this.emoji.texture = RES.getRes(emojiimage.npc_0);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
    }
    setemoji1() {
        this.emoji.texture = RES.getRes(emojiimage.npc_1);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
    }

    setNpc(npcX: number, npcY: number, npcColor: number) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;

        this.setemoji();
    }

    setNpc1(npcX: number, npcY: number, npcColor: number) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setemoji1();
    }

    drawNpcShape() {
        this.npcStageShape.graphics.drawRect(0, 0, this.npcStageWidth, this.npcStageHeight);
        this.npcStageShape.graphics.endFill();

    }

    drawNpc() {
        this.drawNpcShape();

        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;

        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.emoji);
        this.emoji.touchEnabled = true;
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    }

    onNpcClick(e: egret.TouchEvent, task: Task = this.task, npcid: string = this.npcId) {
        this.taskService.checkTaskRules(task, npcid,this.Dialoguepanel);
    }

    onChange(task: Task) {
        this.task = task;
    }

    rule(taskList: Task[], npcId: string): Task {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                console.log("Find");
                return taskList[i];

            }
        }
    }

}

