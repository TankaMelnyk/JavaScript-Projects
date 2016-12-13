//---------------------------------------------------------------------------------------
function ActionsManager() {
    this.activeObjects_ = [];
    this.actionTimer_ = null;
}
//---------------------------------------------------------------------------------------
ActionsManager.prototype.addObject = function(obj) {
    this.activeObjects_.push(obj);
}
//---------------------------------------------------------------------------------------------------------------------
ActionsManager.prototype.removeObject = function (obj) {
    var index = this.activeObjects_.indexOf(obj);
    if (index === -1) {
        console.error("ActionsManager.removeObject(): not found element");
    } else {
        this.activeObjects_.splice(index, 1);        
    }
}
//---------------------------------------------------------------------------------------------------------------------
ActionsManager.prototype.triggerActionCycle = function () {
   if (this.activeObjects_.length === 0) {
       return;
   }
    for (var i = 0; i < this.activeObjects_.length; i++) {
        this.activeObjects_[i].doAction();
    }
}
//---------------------------------------------------------------------------------------------------------------------
ActionsManager.prototype.start = function () {
    this.actionTimer_ = setInterval(this.triggerActionCycle.bind(this), 150);
}
//---------------------------------------------------------------------------------------------------------------------
ActionsManager.prototype.stop = function () {
    clearInterval(this.actionTimer_);
}
//---------------------------------------------------------------------------------------------------------------------