//---------------------------------------------------------------------------------------
function Comet(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.baseComet = SpaceObjects;
    this.baseComet(visualContainer, collisionManager, positionMapper, scoreManager);

    this.visualElement_.style.width = 50 + "px";
    this.visualElement_.style.height = 50 + "px";
    this.visualElement_.style.backgroundImage = "url(pictures/asteroid.gif)";

    this.pointsForSpace_ = 10;

    this.ellipseSemiaxisA_ = 2000;
    this.ellipseSemiaxisB_ = 20;
    this.moveSpeed_ = 3;
}
//---------------------------------------------------------------------------------------
Comet.prototype = Object.create(SpaceObjects.prototype);
//---------------------------------------------------------------------------------------
Comet.prototype.constructor = Comet;
//---------------------------------------------------------------------------------------
