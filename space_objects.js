//---------------------------------------------------------------------------------------
function SpaceObjects(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.visualElement_ = document.createElement("div");
    this.visualElement_.className = "spaceObject";
    this.visualContainer_ = visualContainer;
    this.scoreManager_ = scoreManager;
    this.collisionManager_ = collisionManager;
    this.positionMapper_ = positionMapper;

    this.moveSpeed_ = 1;
    this.ellipseSemiaxisA_ = 200;
    this.ellipseSemiaxisB_ = 50;
    
    this.clickHandler_ = function() {
        this.destroyByClick();
    }

    this.pathArray_ = [];
    this.counterPathArray_ = 0;
    this.directionPath_ = "clockwise";

    this.countImg_ = 1;
    this.isObjectAlive_ = true;

    this.visualElement_.addEventListener("click", this.clickHandler_.bind(this));
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.doAction = function () {      // движемся по заданому вектору
    if (this.counterPathArray_ === (this.pathArray_.length-1)) {
        this.counterPathArray_ = 0;
    } else {
        this.moveFunc(this.pathArray_[this.counterPathArray_++]);
    }
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.registerObjectToUI = function (positionPoint) {                                      // получаем Е1
    var point = this.positionMapper_.getPositionByAbsoluteFromLocal(positionPoint);

    this.visualElement_.style.top = point.y + "px";
    this.visualElement_.style.left = point.x + "px";
    this.visualContainer_.appendChild(this.visualElement_);

    this.pathArray_ = this.getPathArray(point, this.ellipseSemiaxisA_, this.ellipseSemiaxisB_, this.moveSpeed_);            // добавили массив с маршрутом
    this.scoreManager_.increaseGeneralCounter();                        /// счетчик планет
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.getWidth = function() {
    return parseInt(this.visualElement_.style.width);
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.getHeight = function() {
    return parseInt(this.visualElement_.style.height);
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.getPositionPoint = function() {
    var newx = parseInt(this.visualElement_.style.left);   
    var newy = parseInt(this.visualElement_.style.top);
    var point = { x: newx, y: newy };
    return this.positionMapper_.getPositionByLocalFromAbsolute(point);
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.moveFunc = function (movePoint) {
   // console.log("SpaceObjects.prototype.moveFunc -----------------");
    this.collisionManager_.moveObjectAtField(this, this.positionMapper_.getPositionByLocalFromAbsolute(movePoint));
    this.visualElement_.style.top = movePoint.y + "px";
    this.visualElement_.style.left = movePoint.x + "px";
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.destroyByObjectCollision = function() {
    if (this.isObjectAlive_) {
        this.isObjectAlive_ = false;
        this.doAction = function() {
            if (this.countImg_ === 6) {
                this.visualContainer_.removeChild(this.visualElement_);
                this.collisionManager_.removeObject(this);
                this.scoreManager_.decreaseGeneralCounter();
            }
            this.visualElement_.style.backgroundImage = "url(pictures/boom/boom" + (this.countImg_++) + ".png)";
        }
    }
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.destroyByClick = function () {
    if (this.isObjectAlive_) {
        this.isObjectAlive_ = false;
        this.doAction = function() {
            if (this.countImg_ === 6) {
                this.visualContainer_.removeChild(this.visualElement_);
                this.collisionManager_.removeObject(this);
                this.scoreManager_.decreaseGeneralCounter();
                this.scoreManager_.establishThroughGames(this.pointsForSpace_);
            }
            this.visualElement_.style.backgroundImage = "url(pictures/boom/boom" + (this.countImg_++) + ".png)";
        }
    }
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.destroyByBorderCollision = function () {
    if (this.isObjectAlive_) {
        this.isObjectAlive_ = false;
        this.visualContainer_.removeChild(this.visualElement_);
        this.collisionManager_.removeObject(this);
        this.scoreManager_.decreaseGeneralCounter();
    }
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.getPathArray = function(pointStart, ellipseSemiaxisA, ellipseSemiaxisB, distansInOneTik) { 
   // console.log("SpaceObjects.prototype.getPathArray ------------------------------");
    var pointO = { x: (pointStart.x - ellipseSemiaxisA), y: pointStart.y };
    var arrPointsPach = [];
    var arrPointsPachNegative = [];
    var valueX = pointStart.x;
    var valueY = pointStart.y;
    arrPointsPach[0] = { x: valueX, y: valueY };
    var lengthPach = ellipseSemiaxisA * 2 / distansInOneTik;
    for (var i = 0; i <= lengthPach; i++) {
        valueY = Math.round(ellipseSemiaxisB * Math.sqrt(1 - (Math.pow((valueX - pointO.x), 2) / Math.pow(ellipseSemiaxisA, 2))) + pointO.y);
        arrPointsPach[i] = { x: valueX, y: valueY };
        arrPointsPachNegative[i] = { x: valueX, y: pointStart.y - (valueY - pointStart.y) };
        valueX -= distansInOneTik;
    }
    if (this.directionPath_ === "clockwise") {                  // по часовой стрелке
        this.directionPath_ = "counterclockwise";
        arrPointsPachNegative.reverse();
        arrPointsPachNegative.pop();
        arrPointsPachNegative.shift();
        return arrPointsPach.concat(arrPointsPachNegative);
    } else {                                                 // проти часовой стрелки
        this.directionPath_ = "clockwise";
        arrPointsPach.reverse();
        arrPointsPach.pop();
        arrPointsPach.shift();
        return arrPointsPachNegative.concat(arrPointsPach);
    }
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.getDirectionPath = function() {
    return this.directionPath_;
}
//---------------------------------------------------------------------------------------
SpaceObjects.prototype.setDirectionPath = function(value) {
    this.directionPath_ = value;
}
//---------------------------------------------------------------------------------------
