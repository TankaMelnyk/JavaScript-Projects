//---------------------------------------------------------------------------------------
function CollisionManager(actionsManager, visualContentContainer, maxRows, maxColumns) {
    this.actionsManager_ = actionsManager;
    this.visualContentContainer_ = visualContentContainer;

    this.currentHeight = parseInt(this.visualContentContainer_.clientHeight);
    this.currentWidth = parseInt(this.visualContentContainer_.clientWidth);

    this.field = this.createField(maxRows, maxColumns);
    this.fillUserFieldByNull(this.field);
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.createField = function(maxFieldRows, maxFieldColumns) {
    var arr = new Array();
    for (var i = 0; i < maxFieldRows; i++) {
        arr[i] = new Array();
        for (var j = 0; j < maxFieldColumns; j++) {
            arr[i][j] = undefined;
        };
    };
    //console.log("Создался двумерный массив (" + maxFieldRows + " x " + maxFieldColumns + ")---------------------------------");
    return arr;
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.fillUserFieldByNull = function(field) {
    for (var i = 0; i < this.currentHeight; i++) {
        for (var j = 0; j < this.currentWidth; j++) {
            field[i][j] = null;
        };
    };
    //console.log("Двумерный массив размером с пользовательское окно (" + this.currentHeight + " x " + this.currentWidth + ")");
    return field;
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.changeFieldSize = function(newHeight, newWidth) {
    var i = 0;
    var j = 0;
    var begin = 0;
    var end = 0;
    var value = null;

    if (newWidth > this.currentWidth) {
        begin = this.currentWidth;
        end = newWidth;
        value = null;
    } else {
        begin = newWidth;
        end = this.currentWidth;
        value = undefined;
    }

    for (i = 0; i < this.currentHeight; i++) {
        for (j = begin; j < end; j++) {
            if (this.field[i][j] !== null && this.field[i][j] !== undefined) {
                this.field[i][j].destroyByBorderCollision();
            }
            this.field[i][j] = value;
        }
    }

    if (newHeight > this.currentHeight) {
        begin = this.currentHeight;
        end = newHeight;
        value = null;
    } else {
        begin = newHeight;
        end = this.currentHeight;
        value = undefined;
    }
    for (i = begin; i < end; i++) {
        for (j = 0; j < newWidth; j++) {
            if (this.field[i][j] !== null && this.field[i][j] !== undefined) {
                this.field[i][j].destroyByBorderCollision();
            }
            this.field[i][j] = value;
        }
    }
    this.currentWidth = newWidth;
    this.currentHeight = newHeight;

}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.addObjectToField = function(spaceObject) {
    fillFieldAreaByValue(this.field, spaceObject, spaceObject);
  //  console.log("CollisionManager.addObjectToField()");
}
//---------------------------------------------------------------------------------------
function fillFieldAreaByValue(field, spaceObject, value) {
    try {
        var position = spaceObject.getPositionPoint();
        var x = position.x;
        var y = position.y;

        for (var i = 0; i < spaceObject.getHeight() ; i++) {
            for (var j = 0; j < spaceObject.getWidth() ; j++) {
                field[y + i][x + j] = value;
            }
        }   
    } catch (e) {
        console.error("ERROR --------> value = " + value);
        console.error("message error = " + e.message);
    } 
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.removeObjectFromField = function(spaceObject) {
    fillFieldAreaByValue(this.field, spaceObject, null);
   // console.log("CollisionManager.removeObjectFromField()");
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.checkDestination = function(objectHeight, objectWidth, posX, posY) {
    if ((posX + objectWidth) < this.currentWidth && (posY + objectHeight) < this.currentHeight) {
        for (var i = 0; i < objectHeight; i++) {
            for (var j = 0; j < objectWidth; j++) {
                if (this.field[posY + i][posX + j] !== null) {
                    return this.field[posY + i][posX + j];
                }
            }
        }
        return null;
    } else {
       // console.log("availableSpace --> вышли за пределы поля --> false");
        return undefined;
    }
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.isPlaceAvaliable = function(objectHeight, objectWidth, posX, posY) {
    if ((posX + objectWidth) < this.currentWidth && (posY + objectHeight) < this.currentHeight) {
        for (var i = 0; i <= objectHeight; i++) {
            for (var j = 0; j <= objectWidth; j++) {
                if (this.field[posY + i][posX + j] !== null) {
                    return false;
                }
            }
        }
        return true;
    } else {
        //console.log("availableSpace --> вышли за пределы поля --> false");
        return false;
    }
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.moveObjectAtField = function(spaceObject, movePoint) {
    fillFieldAreaByValue(this.field, spaceObject, null);

    var x = movePoint.x;
    var y = movePoint.y;

    if (x <= 0 || y <= 0) {                                     // столкнулись с границами
        spaceObject.destroyByBorderCollision();
       // console.log("CollisionManager.moveObjectAtField() ============================== x <= 0 || y <= 0");
        return;
    }

    var checkResult = this.checkDestination(spaceObject.getHeight(), spaceObject.getWidth(), x, y);

    if (checkResult === undefined || checkResult instanceof BlackHole) {                         // столкнулись с границами
        spaceObject.destroyByBorderCollision();
        // console.log("CollisionManager.moveObjectAtField() ======================= this.field[y][x] === undefined");
        return;
    }
    if (checkResult !== null && checkResult !== undefined) {       // столкнулись с объектом
        if ((spaceObject instanceof SpaceShip) && (checkResult instanceof HabitablePlanet)) { // когда сталкивается корабль с жилой планетой
            spaceObject.destroyByBorderCollision();

        }
        else {
            checkResult.destroyByObjectCollision();
            spaceObject.destroyByObjectCollision();          
        }                       
        // console.log("CollisionManager.moveObjectAtField() ========================== this.field[y][x] !== null");
        return;
    }

    for (var i = 0; i < spaceObject.getHeight() ; i++) {
        for (var j = 0; j < spaceObject.getWidth() ; j++) {
            this.field[y + i][x + j] = spaceObject;
        }
    }
    // console.log("CollisionManager.moveObjectAtField()");
}
//---------------------------------------------------------------------------------------
CollisionManager.prototype.removeObject = function(spaceObject) {
    this.actionsManager_.removeObject(spaceObject);
    this.removeObjectFromField(spaceObject);
}
//---------------------------------------------------------------------------------------