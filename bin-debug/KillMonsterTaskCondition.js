var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition() {
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setcurrent(task.getcurrent());
    };
    p.onSubmit = function (task) {
    };
    p.onChange = function (task) {
        var temp = task.getcurrent();
        temp++;
        task.setcurrent(temp);
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["TaskConditon"]);
//# sourceMappingURL=KillMonsterTaskCondition.js.map