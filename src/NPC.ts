var image = {
    npc_0: "NPC05_png",
    npc_1: "NPC04_png",
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

    npcimage: egret.Bitmap;
    //tileSize: number = 100;
    npcimageX: number = 0;
    npcimageY: number = 64;

    npcStageShape: egret.Shape;
    npcStageX: number;
    npcStageY: number;
    npcStageWidth = 64;
    npcStageHeight = 128;

    taskNoneState: State;
    taskAvilableState: State;
    taskSubmitState: State;
    taskDuringState: State;
    taskStateMachine: StateMachine;
    Dialoguepanel:DialoguePanel;
    mockkillmosterbutton:MockKillMonsterButton;
    
    public constructor(npcId: string, npcName: string, taskService,NPCtalkpanel:DialoguePanel,mockkillmonsterpanel:MockKillMonsterButton) {
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
        this.Dialoguepanel=NPCtalkpanel;
        //this.mockkillmosterbutton=mockkillmonsterpanel;
    }

    getTask() {
        this.task = this.taskService.getTaskByCustomRole(this.rule, this.npcId);
        //console.log("This Task State: " + this.task.status);
        this.checkState();
    }

    setnpcimage() {
        this.npcimage.texture = RES.getRes(image.npc_0);
        this.npcimage.x = this.npcimageX;
        this.npcimage.y = this.npcimageY;
        this.npcimage.width = 150;
        this.npcimage.height = 230;
    }

    setnpcimage1() {
        this.npcimage.texture = RES.getRes(image.npc_1);
        this.npcimage.x = this.npcimageX;
        this.npcimage.y = this.npcimageY;
        this.npcimage.width = 150;
        this.npcimage.height = 230;
        //this.npcimage.width = this.tileSize;
        //this.npcimage.height = this.tileSize;
    }

    setNpc1(npcX: number, npcY: number, npcColor: number) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setnpcimage1();
    }

    setNpc(npcX: number, npcY: number, npcColor: number) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setnpcimage();
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
        this.npcStage.addChild(this.npcimage);
        this.npcimage.touchEnabled = true;
        this.npcimage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    }

    checkState() {
        switch (this.task.status) {
            case TaskStatus.UNACCEPTABLE:
            case TaskStatus.SUBMITTED:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;

            case TaskStatus.ACCEPTABLE:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskAvilableState);
                } else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.DURING:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskDuringState);
                } else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;


            case TaskStatus.CAN_SUBMIT:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskSubmitState);
                } else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
        }
    }

    onNpcClick(e: egret.TouchEvent, task: Task = this.task, npcid: string = this.npcId) {
        this.taskService.checkTaskRules(task, npcid,this.Dialoguepanel);
    }

    onChange(task: Task) {
        this.task = task;
        this.checkState();
    }

    rule(taskList: Task[], npcId: string): Task {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                //console.log("Find");
                return taskList[i];
            }
        }
    }

}
