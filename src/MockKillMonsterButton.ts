class MockKillMonsterButton {

	panel: egret.DisplayObjectContainer;

    stage: egret.DisplayObjectContainer;

    private taskService: TaskService;
    private currentTaskId: string;
    private currentTaskStatus: number;

    private backgroundColor = 0xE3CF57;
    private backGround: egret.Shape;
    private panelX = 0;
    private panelY = 0;
    private panelWidth = 200;
    private panelHeight = 300;

    private button: egret.DisplayObjectContainer;
    private buttonBack: egret.Shape;
    private buttonColor = 0x000000;
    private buttonX = 300;
    private buttonY = 770;
    private buttonWidth = 120;
    private buttonHeight = 70;

    private buttonTextField: egret.TextField;
    private buttonTextFieldText = "Monster";
    private buttonTextFieldX = this.buttonX + 10;
    private buttonTextFieldY = this.buttonY + 10;
    private buttonTextFieldWidth = 220;
    private buttonTextFieldColor = 0xFFFFFF;

    public monsterValue = 0;

	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
		this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "MockKillMonsterButton");
        this.panel = new egret.DisplayObjectContainer();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
	}

    public drawPanel() {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        //drawButton
            //drawButtonBack
        this.buttonBack.graphics.beginFill(this.buttonColor, 0.9);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();
            //setButtonText
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;

        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);

        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    private onButtonClick(e: egret.TouchEvent) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;
            case TaskStatus.DURING:
                this.monsterValue++;
                //console.log(this.monsterValue);
                if(this.monsterValue==10){
                    this.taskService.canFinish(this.currentTaskId);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                this.monsterValue = 0;
                break;
            default:
        }
    }
    public onChange(task: Task) {
        this.currentTaskId = task.id;
        this.currentTaskStatus = task.status;
    }
}