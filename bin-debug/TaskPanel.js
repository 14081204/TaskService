var TaskPanel = (function () {
    function TaskPanel(stage, taskService) {
        this.backgroundColor = 0xc7c0c0;
        this.panelX = 390;
        this.panelY = 100;
        this.panelWidth = 250;
        this.panelHeight = 400;
        this.taskNameTextFieldText = "任务面板";
        this.taskNameTextFieldX = 70;
        this.taskNameTextFieldY = 50;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldColor = 0x000000;
        this.taskDescTextFieldText = "";
        this.taskDescTextFieldX = 50;
        this.taskDescTextFieldY = 120;
        this.taskDescTextFieldWidth = 180;
        this.taskDescTextFieldColor = 0x8a00ff;
        this.taskFieldText = "";
        this.taskFieldX = 50;
        this.taskFieldY = 170;
        this.taskFieldWidth = 180;
        this.taskFieldColor = 0x8a00ff;
        this.buttonColor = 0x00ff00;
        this.buttonX = 75;
        this.buttonY = 285;
        this.buttonWidth = 100;
        this.buttonHeight = 50;
        this.buttonTextFieldText = "无任务";
        this.buttonTextFieldX = this.buttonX + 5;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 120;
        this.buttonTextFieldColor = 0xff7200;
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "TaskPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskDescTextField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        //drawButton
        //drawButtonBack
        this.buttonBack.graphics.beginFill(this.buttonColor, 0.25);
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
        //drawBackGround
        this.backGround.graphics.beginFill(this.backgroundColor, 0.5);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
        //setText
        this.taskNameTextField.text = this.taskNameTextFieldText;
        this.taskNameTextField.x = this.taskNameTextFieldX;
        this.taskNameTextField.y = this.taskNameTextFieldY;
        this.taskNameTextField.width = this.taskNameTextFieldWidth;
        this.taskNameTextField.bold = true;
        this.taskNameTextField.textColor = this.taskNameTextFieldColor;
        this.taskDescTextField.text = this.taskDescTextFieldText;
        this.taskDescTextField.x = this.taskDescTextFieldX;
        this.taskDescTextField.y = this.taskDescTextFieldY;
        this.taskDescTextField.width = this.taskDescTextFieldWidth;
        this.taskDescTextField.bold = false;
        this.taskDescTextField.textColor = this.taskDescTextFieldColor;
        this.taskDescTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.panel.addChild(this.backGround);
        this.panel.addChild(this.taskNameTextField);
        this.panel.addChild(this.taskDescTextField);
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                //console.log("Accept Button Click");
                //console.log("Current Task Id: " + this.currentTaskId);
                this.taskService.accept(this.currentTaskId);
                break;
            case TaskStatus.DURING:
                //console.log("During Button Click");
                this.taskService.during(this.currentTaskId);
                break;
            case TaskStatus.CAN_SUBMIT:
                //console.log("Submit Button Click");
                this.taskService.finish(this.currentTaskId);
                break;
            default:
        }
    };
    p.onStageClick = function (e) {
        //console.log("Stage Click");
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
    };
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskDescTextField.text = desc;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.buttonTextField.text = "可接受";
                break;
            case TaskStatus.DURING:
                this.buttonTextField.text = "未完成";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "可提交";
                break;
            case TaskStatus.SUBMITTED:
                this.taskNameTextField.text = "任务面板";
                this.taskDescTextField.text = "无";
                this.buttonTextField.text = "无任务";
                break;
            default:
                this.buttonTextField.text = "None";
                break;
        }
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel');
//# sourceMappingURL=TaskPanel.js.map