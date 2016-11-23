class KillMonsterTaskCondition implements TaskConditon {

    onAccept(task: TaskConditionContext) {       
         task.setcurrent(task.getcurrent());
    }
    onSubmit(task: TaskConditionContext) {
    }
    onChange(task: TaskConditionContext) {
       var temp = task.getcurrent();
       temp++;
    task.setcurrent(temp);
    }
}