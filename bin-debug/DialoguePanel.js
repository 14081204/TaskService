var DialoguePanel = (function () {
    function DialoguePanel(stage, taskService) {
        this.backgroundColor = 0xFFFAFA;
        this.panelX = 37;
        this.panelY = 350;
        this.panelWidth = 350;
        this.panelHeight = 250;
        this.taskNameTextFieldText = "";
        this.taskNameTextFieldX = 270;
        this.taskNameTextFieldY = 120;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldColor = 0x000000;
        this.taskDescTextFieldText = "";
        this.taskDescTextFieldX = 270;
        this.taskDescTextFieldY = 175;
        this.taskDescTextFieldWidth = 160;
        this.taskDescTextFieldColor = 0xFF0000;
        this.buttonColor = 0x808000;
        this.buttonX = 270;
        this.buttonY = 275;
        this.buttonWidth = 130;
        this.buttonHeight = 50;
        this.buttonTextFieldText = "确认";
        this.buttonTextFieldX = this.buttonX + 10;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 120;
        this.buttonTextFieldColor = 0xFFFAFA;
        this.stage = stage;
        this.taskService = taskService;
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskDescTextField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.drawPanel();
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        //drawButton
        //drawButtonBack
        this.buttonBack.graphics.beginFill(0x000000, 0.5);
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
        this.backGround.graphics.beginFill(0xfcbf3c, 0.7);
        this.backGround.graphics.drawRect(150, 100, this.panelWidth, this.panelHeight);
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
        this.taskDescTextField.textAlign = egret.HorizontalAlign.LEFT;
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
                //console.log("Current Task Id: "+ this.currentTaskId);
                this.taskService.accept(this.currentTaskId);
                break;
            case TaskStatus.CAN_SUBMIT:
                //console.log("Submit Button Click");
                this.taskService.finish(this.currentTaskId);
                break;
            default:
        }
        this.stage.removeChild(this.panel);
    }; //按钮被点击
    p.showPanel = function () {
        this.stage.addChild(this.panel);
    };
    p.removePanel = function () {
        this.stage.removeChild(this.panel);
    };
    p.onOpen = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
        this.showPanel();
    }; //被通知
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskDescTextField.text = desc;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.buttonTextField.text = "接受任务";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "提交任务";
                break;
            default:
                this.buttonTextField.text = "";
                break;
        }
    };
    return DialoguePanel;
}());
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map