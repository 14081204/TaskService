class Task {
	id: string;
    name: string;
    desc: string;
    status: TaskStatus;
    private _current: number = 0;
    public total: number;
    fromNpcId: string;
    toNpcId: string;
    //total:number;
    //private condition:TaskCondition;

    /*onAccept(task){

    }
    onSubmit(task){

    }
    private checkStatus(){
        
    }*/
    public getcurrent(): number {
        return this._current;
    }
	public constructor(id, name, desc, status, fromNpcID, toNpcId) {
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.status=status;
        this.fromNpcId=fromNpcID;
        this.toNpcId=toNpcId;
    }
}

enum TaskStatus {
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED,
}