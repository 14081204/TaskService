class NPCTalkTaskCondition implements TaskConditon{
	public onAccept(task: TaskConditionContext) {
        task.setcurrent(task.getcurrent());
    }
    public onSubmit(task: TaskConditionContext) {
    }
    public onChange(task: TaskConditionContext) {
    }
}
