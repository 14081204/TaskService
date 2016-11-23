var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setcurrent(task.getcurrent());
    };
    p.onSubmit = function (task) {
    };
    p.onChange = function (task) {
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["TaskConditon"]);
//# sourceMappingURL=NPCTalkTaskCondition.js.map