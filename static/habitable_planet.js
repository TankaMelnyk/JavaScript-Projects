//---------------------------------------------------------------------------------------------------------------------
function HabitablePlanet(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.baseHabitablePlanet = SpaceObjects;
    this.baseHabitablePlanet(visualContainer, collisionManager, positionMapper, scoreManager);

    this.visualElement_.style.width = 100 + "px";
    this.visualElement_.style.height = 100 + "px";
    this.visualElement_.style.backgroundImage = "url(pictures/habib.png)";

    this.pointsForSpace_ = -80;
}
//---------------------------------------------------------------------------------------------------------------------
HabitablePlanet.prototype = Object.create(SpaceObjects.prototype);
//---------------------------------------------------------------------------------------------------------------------
HabitablePlanet.prototype.constructor = HabitablePlanet;
//---------------------------------------------------------------------------------------------------------------------

HabitablePlanet.prototype.registerObjectToUI = function(positionPoint) {
    SpaceObjects.prototype.registerObjectToUI.call(this, positionPoint);

    this.scoreManager_.increaseHabitableAndSpaceCounter();                        /// счетчик планет
    this.scoreManager_.increaseHabitableCounter();
};
//---------------------------------------------------------------------------------------------------------------------
HabitablePlanet.prototype.doAction = function() {
    // обнулили действие объекта
};
//---------------------------------------------------------------------------------------------------------------------
HabitablePlanet.prototype.destroyByObjectCollision = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByObjectCollision.call(this);

        this.scoreManager_.decreaseHabitableAndSpaceCounter();
        this.scoreManager_.decreaseHabitableCounter();
        this.scoreManager_.establishThroughGames(this.pointsForSpace_);
    }
}
//---------------------------------------------------------------------------------------------------------------------
HabitablePlanet.prototype.destroyByClick = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByClick.call(this);

        this.scoreManager_.decreaseHabitableAndSpaceCounter();
        this.scoreManager_.decreaseHabitableCounter();
    }
}
//---------------------------------------------------------------------------------------------------------------------
HabitablePlanet.prototype.destroyByBorderCollision = function() {
    if (this.isObjectAlive_) {
        SpaceObjects.prototype.destroyByBorderCollision.call(this);
        this.scoreManager_.decreaseHabitableCounter();
        this.scoreManager_.decreaseHabitableAndSpaceCounter();
    }
}
//---------------------------------------------------------------------------------------------------------------------