var Task = (function () {
    function Task(id, name, desc, status, fromNpcID, toNpcId) {
        this._current = 0;
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.fromNpcId = fromNpcID;
        this.toNpcId = toNpcId;
    }
    var d = __define,c=Task,p=c.prototype;
    //total:number;
    //private condition:TaskCondition;
    /*onAccept(task){

    }
    onSubmit(task){

    }
    private checkStatus(){
        
    }*/
    p.getcurrent = function () {
        return this._current;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map