//---------------------------------------------------------------------------------------
function ScoreManager(header) {
    this.header_ = header;

    this.allGameObjects_ = 0;                 //всего объектов
    this.habitablePlanetAndSpaceShip_ = 0;    // всего жилых объектов

    this.habitablePlanets_ = 0;
    this.blackHoles_ = 0;

    this.counterSec_ = 0;       // продолжительность игры в секундах
    this.click_ = 0;            // количество кликов за игру 


    this.actionTimer_ = null;


    this.funcClick_ = function() {
        this.click_++;
        console.log("--------------------------click_ = " + this.click_ + "-----------------------------");
    };

    window.addEventListener("click", this.funcClick_.bind(this));

    this.throughGames_ = 0;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.increaseGeneralCounter = function() {
    this.allGameObjects_++;
    this.header_.setGameObjectsCount(this.allGameObjects_);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.decreaseGeneralCounter = function() {
    this.allGameObjects_--;
    this.header_.setGameObjectsCount(this.allGameObjects_);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.increaseHabitableAndSpaceCounter = function() {
    this.habitablePlanetAndSpaceShip_++;
    this.header_.setHabitableObjectsCount(this.habitablePlanetAndSpaceShip_);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.decreaseHabitableAndSpaceCounter = function() {
    this.habitablePlanetAndSpaceShip_--;
    this.header_.setHabitableObjectsCount(this.habitablePlanetAndSpaceShip_);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.increaseHabitableCounter = function() {
    this.habitablePlanets_++;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.decreaseHabitableCounter = function() {
    this.habitablePlanets_--;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.getHabitablePlanets = function() {
    return this.habitablePlanets_;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.increaseBlackHoleCounter = function() {
    this.blackHoles_++;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.decreaseBlackHoleCounter = function() {
    this.blackHoles_--;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.getBlackHoles = function() {
    return this.blackHoles_;
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.establishThroughGames = function(value) {
    this.throughGames_ += value;
    console.log("--------------------------ThroughGames_ = " + this.throughGames_);
    this.header_.setThroughGames(this.throughGames_);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.addNameGamer = function() {
    this.header_.setNameGamer(this.nameGamer_);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.funcCounterSec_ = function() {
    var apm = Math.round(this.click_ / ++this.counterSec_ * 60);
    if (apm === Infinity || apm === NaN) {
        apm = 0;
    }
    this.header_.setApm(apm);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.start = function() {
    this.actionTimer_ = setInterval(this.funcCounterSec_.bind(this), 1000);
}
//---------------------------------------------------------------------------------------
ScoreManager.prototype.stop = function() {
    clearInterval(this.actionTimer_);
}
//---------------------------------------------------------------------------------------