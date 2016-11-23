class Task {
	id: string;
    name: string;
    desc: string;
    status: TaskStatus;
    private current: number = 0;
    public total: number;
    fromNpcId: string;
    toNpcId: string;

    private so:string="("+this.current+"/"+this.total+")";
    //private condition:TaskCondition;

    /*onAccept(task){

    }
    onSubmit(task){

    }
    private checkStatus(){
        
    }*/
    public getcurrent(): number {
        return this.current;
    }
    setcurrent(newcurreny:number){
        this.current=newcurreny;
        //this.checkStatus();
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