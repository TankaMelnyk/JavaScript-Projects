//---------------------------------------------------------------------------------------------------------------------
function SpaceFactory(actionsManager, collisionManager, visualContentContainer, positionMapper, scoreManager) {
    this.actionsManager_ = actionsManager;
    this.collisionManager_ = collisionManager;
    this.visualContentContainer_ = visualContentContainer;
    this.positionMapper_ = positionMapper;
    this.scoreManager_ = scoreManager;
    this.actionTimer_ = null;
}
//---------------------------------------------------------------------------------------------------------------------
function randomSpace(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//---------------------------------------------------------------------------------------------------------------------
SpaceFactory.prototype.spaceDoAction = function () {
    var random = randomSpace(1, 6); // рандомный выбор спейсов и в spaceObj подставляем его для порождения
    var spaceObj = null;
    switch (random) {
        case 1:
            if (this.scoreManager_.getHabitablePlanets() < 4) {
                spaceObj = new HabitablePlanet(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
                break;
             }
            return;
        case 2:
            if ( this.scoreManager_.getBlackHales() < 3) {
                spaceObj = new BlackHale(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
                break;
            }
             return; 
        case 3:
            spaceObj = new Star(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
            break;
        case 4:
            spaceObj = new SpaceShip(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
            break;
        case 5:
            spaceObj = new Asteroid(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
            break;
        case 6:
            spaceObj = new Comet(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
            break;
        default:
            spaceObj = new Comet(this.visualContentContainer_, this.collisionManager_, this.positionMapper_, this.scoreManager_);
    }
    var positionToUi = this.getRandomPosition(spaceObj.getWidth(), spaceObj.getHeight());
    if (positionToUi === undefined) {
        return;
    }
    spaceObj.registerObjectToUI(positionToUi);                                 // получаем Е1

    this.collisionManager_.addObjectToField(spaceObj);
    
    this.actionsManager_.addObject(spaceObj);
}
//---------------------------------------------------------------------------------------------------------------------
function randomCoordinate(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//---------------------------------------------------------------------------------------------------------------------
SpaceFactory.prototype.getRandomPosition = function(objectWidth, objectHeight) {                    // получаем Е1
    var newX = 0;
    var newY = 0;
    var count = 0;
    var result = false;
    do {
        newX = randomCoordinate(0, this.visualContentContainer_.clientWidth - parseInt(objectWidth));
        newY = randomCoordinate(0, this.visualContentContainer_.clientHeight - parseInt(objectHeight));
        result = this.collisionManager_.isPlaceAvaliable(objectHeight, objectWidth, newX, newY);
        ++count;
    } while (result === false && count <= 100);
    
    if (result === true) {
        return { x: newX, y: newY };       
    }
    return undefined;
}
//---------------------------------------------------------------------------------------------------------------------
SpaceFactory.prototype.start = function (){
    this.actionTimer_ = setInterval(this.spaceDoAction.bind(this), 500);
}
//---------------------------------------------------------------------------------------------------------------------
SpaceFactory.prototype.stop = function () {
    clearInterval(this.actionTimer_);
}
//---------------------------------------------------------------------------------------------------------------------