//---------------------------------------------------------------------------------------
function SpaceShip(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.baseSpaceShip = SpaceObjects;
    this.baseSpaceShip(visualContainer, collisionManager, positionMapper, scoreManager);

    this.visualElement_.style.width = 50 + "px";
    this.visualElement_.style.height = 50 + "px";

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.visualElement_.style.backgroundImage = "url(pictures/ship-" + random(1, 2) + ".gif)";

    this.ellipseSemiaxisA_ = 50;
    this.ellipseSemiaxisB_ = 50;
    this.moveSpeed_ = 10;

    this.pointsForSpace_ = -30;
}
//---------------------------------------------------------------------------------------
SpaceShip.prototype = Object.create(SpaceObjects.prototype);
//---------------------------------------------------------------------------------------
SpaceShip.prototype.constructor = SpaceShip;
//---------------------------------------------------------------------------------------


SpaceShip.prototype.registerObjectToUI = function(positionPoint) {
    SpaceObjects.prototype.registerObjectToUI.call(this, positionPoint);

    this.scoreManager_.increaseHabitableAndSpaceCounter();                        /// счетчик планет
};
//---------------------------------------------------------------------------------------
SpaceShip.prototype.destroyByObjectCollision = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByObjectCollision.call(this);

        this.scoreManager_.decreaseHabitableAndSpaceCounter();
        this.scoreManager_.establishThroughGames(this.pointsForSpace_);
    }
}
//---------------------------------------------------------------------------------------
SpaceShip.prototype.destroyByClick = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByClick.call(this);

        this.scoreManager_.decreaseHabitableAndSpaceCounter();
    }
}
//---------------------------------------------------------------------------------------
SpaceShip.prototype.destroyByBorderCollision = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByBorderCollision.call(this);
        this.scoreManager_.decreaseHabitableAndSpaceCounter();
    }
}
//---------------------------------------------------------------------------------------

