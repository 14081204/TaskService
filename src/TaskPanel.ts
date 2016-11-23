class TaskPanel implements Observer{

	panel: egret.DisplayObjectContainer;

	stage: egret.DisplayObjectContainer;

	private taskService: TaskService;
	private currentTaskId: string;
	private currentTaskStatus: number;

	private backgroundColor = 0xc7c0c0;
	private backGround: egret.Shape;
	private panelX = 390;
	private panelY = 100;
	private panelWidth = 250;
	private panelHeight = 400;
	//private so:string="("+this.current+"/"+this.total+")";

	private taskNameTextField: egret.TextField;
	private taskNameTextFieldText = "任务面板";
	private taskNameTextFieldX = 70;
	private taskNameTextFieldY = 50;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldColor = 0x000000;

	private taskDescTextField: egret.TextField;
	private taskDescTextFieldText = "";
	private taskDescTextFieldX = 50;
	private taskDescTextFieldY = 120;
	private taskDescTextFieldWidth = 180;
	private taskDescTextFieldColor = 0x8a00ff;

	private taskField: egret.TextField;
	private taskFieldText = "";
	private taskFieldX = 50;
	private taskFieldY = 170;
	private taskFieldWidth = 180;
	private taskFieldColor = 0x8a00ff;

	private button: egret.DisplayObjectContainer;
	private buttonBack: egret.Shape;
	private buttonColor = 0x00ff00;
	private buttonX = 75;
	private buttonY = 285;
	private buttonWidth = 100;
	private buttonHeight = 50;

	private buttonTextField: egret.TextField;
	private buttonTextFieldText = "无任务";
	private buttonTextFieldX = this.buttonX + 5;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 120;
	private buttonTextFieldColor = 0xff7200;

	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
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

	public drawPanel() {
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

	}

	private onButtonClick(e: egret.TouchEvent) {
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
	}

	private onStageClick(e: egret.TouchEvent) {
		//console.log("Stage Click");
	}


	public onChange(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;

	}

	private changeTaskText(name: string, desc: string) {
		this.taskNameTextField.text = name;
		this.taskDescTextField.text = desc;

	}

	private changeButton(taskStatus: number) {
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
				this.taskNameTextField.text= "任务面板";
				this.taskDescTextField.text= "无";
				this.buttonTextField.text = "无任务";
				break;
			default:
				this.buttonTextField.text = "None";
				break;
		}
	}
}