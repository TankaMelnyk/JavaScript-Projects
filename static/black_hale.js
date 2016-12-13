//---------------------------------------------------------------------------------------------------------------------
function BlackHale(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.baseBlackHale = SpaceObjects;
    this.baseBlackHale(visualContainer, collisionManager, positionMapper, scoreManager);

    this.visualElement_.style.width = 70 + "px";
    this.visualElement_.style.height = 70 + "px";
    this.visualElement_.style.backgroundImage = "url(pictures/blackHale/blackHale1.png)";
 
    this.counterLife_ = 0;
    this.pointsForSpace_ = 150;
    this.countImg_ = 1;
}
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype = Object.create(SpaceObjects.prototype);
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype.constructor = BlackHale;
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype.registerObjectToUI = function(positionPoint) {
    SpaceObjects.prototype.registerObjectToUI.call(this, positionPoint);
    this.scoreManager_.increaseBlackHaleCounter();
};
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype.doAction = function() {
    if (this.countImg_ === 5) {
        this.countImg_ = 1;
        }
    this.visualElement_.style.backgroundImage = "url(pictures/blackHale/blackHale" + this.countImg_ + ".png)";
        this.countImg_++;
};
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype.destroyByObjectCollision = function() {}    // переопредиление, не сталкивающийся
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype.destroyByBorderCollision = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByObjectCollision.call(this);

        this.scoreManager_.decreaseBlackHaleCounter();
    }
}
//---------------------------------------------------------------------------------------------------------------------
BlackHale.prototype.destroyByClick = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByObjectCollision.call(this);
        this.scoreManager_.establishThroughGames(this.pointsForSpace_);
        this.scoreManager_.decreaseBlackHaleCounter();
    }
}
//---------------------------------------------------------------------------------------------------------------------