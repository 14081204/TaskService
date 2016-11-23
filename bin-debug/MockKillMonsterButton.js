var MockKillMonsterButton = (function () {
    function MockKillMonsterButton(stage, taskService) {
        this.backgroundColor = 0xE3CF57;
        this.panelX = 0;
        this.panelY = 0;
        this.panelWidth = 200;
        this.panelHeight = 300;
        this.buttonColor = 0x000000;
        this.buttonX = 300;
        this.buttonY = 770;
        this.buttonWidth = 120;
        this.buttonHeight = 70;
        this.buttonTextFieldText = "Monster";
        this.buttonTextFieldX = this.buttonX + 10;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 220;
        this.buttonTextFieldColor = 0xFFFFFF;
        this.monsterValue = 0;
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
    var d = __define,c=MockKillMonsterButton,p=c.prototype;
    p.drawPanel = function () {
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
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;
            case TaskStatus.DURING:
                this.monsterValue++;
                //console.log(this.monsterValue);
                if (this.monsterValue == 10) {
                    this.taskService.canFinish(this.currentTaskId);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                this.monsterValue = 0;
                break;
            default:
        }
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.currentTaskStatus = task.status;
    };
    return MockKillMonsterButton;
}());
egret.registerClass(MockKillMonsterButton,'MockKillMonsterButton');
//# sourceMappingURL=MockKillMonsterButton.js.map