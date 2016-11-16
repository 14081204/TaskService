class DialoguePanel {
	panel:egret.DisplayObjectContainer;

	stage:egret.DisplayObjectContainer;

	private taskService:TaskService;
	private npc:NPC;
	private currentTaskId:string;
	private currentTaskStatus:number;

	private backColor = 0xFFFAFA;
	private backGround:egret.Shape;
	private panelX = 37;
	private panelY = 350;
	private panelWidth = 350;
	private panelHeight = 250;

	private taskNameTextField:egret.TextField;
	private taskNameTextFieldText = "";
	private taskNameTextFieldX = 270;
	private taskNameTextFieldY = 120;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldColor = 0x000000;


	private taskDescTextField:egret.TextField;
	private taskDescTextFieldText = "";
	private taskDescTextFieldX = 270;
	private taskDescTextFieldY = 175;
	private taskDescTextFieldWidth = 160;
	private taskDescTextFieldColor = 0xFF0000;
	
	private button:egret.DisplayObjectContainer;
	private buttonBack:egret.Shape;
	private buttonColor = 0x808000;
	private buttonX = 270;
	private buttonY = 275;
	private buttonWidth = 130;
	private buttonHeight = 50;


	private buttonTextField:egret.TextField;
	private buttonTextFieldText = "确认";
	private buttonTextFieldX = this.buttonX + 10;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 120;
	private buttonTextFieldColor = 0xFFFAFA;


	public constructor(stage:egret.DisplayObjectContainer,taskService:TaskService) {
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

	public drawPanel() {
		this.panel.x = this.panelX;
		this.panel.y = this.panelY;
		this.panel.width = this.panelWidth;
		this.panel.height = this.panelHeight;
		
		//drawButton
			//drawButtonBack
		this.buttonBack.graphics.beginFill(0x000000, 0.5);
		this.buttonBack.graphics.drawRect(this.buttonX,this.buttonY,this.buttonWidth,this.buttonHeight);
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
		this.backGround.graphics.drawRect(150,100,this.panelWidth,this.panelHeight);
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
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);

	}

	private onButtonClick(e:egret.TouchEvent) {
		switch(this.currentTaskStatus){
			case TaskStatus.ACCEPTABLE:
				console.log("Accept Button Click");
				console.log("Current Task Id: "+ this.currentTaskId);
				this.taskService.accept(this.currentTaskId);
				break;
			
			case TaskStatus.CAN_SUBMIT:
				console.log("Submit Button Click");
				this.taskService.finish(this.currentTaskId);
				break;

			default:
				console.log("Button Click");

		}

		this.stage.removeChild(this.panel);

	} //按钮被点击


	public showPanel() {
		this.stage.addChild(this.panel);

	}

	public removePanel() {
		this.stage.removeChild(this.panel);

	}

	public onOpen(task:Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name,task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
		this.showPanel();

	} //被通知

	private changeTaskText(name:string,desc:string) {
		this.taskNameTextField.text = name;
		this.taskDescTextField.text = desc;

	}

	private changeButton(taskStatus:number) {
		switch(taskStatus){
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

	}
}