//---------------------------------------------------------------------------------------
function BlackHole(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.baseBlackHole = SpaceObjects;
    this.baseBlackHole(visualContainer, collisionManager, positionMapper, scoreManager);

    this.visualElement_.style.width = 100 + "px";
    this.visualElement_.style.height = 100 + "px";
    this.visualElement_.style.backgroundImage = "url(pictures/blackHole/blackHole1.png)";
 
    this.counterLife_ = 0;
    this.pointsForSpace_ = 150;
    this.countImg_ = 1;
}
//---------------------------------------------------------------------------------------
BlackHole.prototype = Object.create(SpaceObjects.prototype);
//---------------------------------------------------------------------------------------
BlackHole.prototype.constructor = BlackHole;
//---------------------------------------------------------------------------------------
BlackHole.prototype.registerObjectToUI = function(positionPoint) {
    SpaceObjects.prototype.registerObjectToUI.call(this, positionPoint);
    this.scoreManager_.increaseBlackHoleCounter();
};
//---------------------------------------------------------------------------------------
BlackHole.prototype.doAction = function() {
    if (this.countImg_ === 5) {
        this.countImg_ = 1;
        }
    this.visualElement_.style.backgroundImage = "url(pictures/blackHole/blackHole" + this.countImg_ + ".png)";
        this.countImg_++;
};
//---------------------------------------------------------------------------------------
BlackHole.prototype.destroyByObjectCollision = function() {}    // переопредиление, не сталкивающийся
//---------------------------------------------------------------------------------------
BlackHole.prototype.destroyByBorderCollision = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByObjectCollision.call(this);

        this.scoreManager_.decreaseBlackHoleCounter();
    }
}
//--------------------------------------------------------------------------------------
BlackHole.prototype.destroyByClick = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByObjectCollision.call(this);
        this.scoreManager_.establishThroughGames(this.pointsForSpace_);
        this.scoreManager_.decreaseBlackHoleCounter();
    }
}
//---------------------------------------------------------------------------------------