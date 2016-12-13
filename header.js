//---------------------------------------------------------------------------------------------------------------------
function Header(parent) {
    this.conreinerHeader_ = document.createElement("div");
    parent.appendChild(this.conreinerHeader_);
    this.conreinerHeader_.className = "containerHeader";

    this.headElement_ = document.createElement("div");
    this.conreinerHeader_.appendChild(this.headElement_);
    this.headElement_.className = "header";

    this.nameGamer_ = new LabelInfo(this.headElement_, "Имя игрока: ", "");
    this.apm_ = new LabelInfo(this.headElement_, "APM: ", 0);
    this.allGameObjects_ = new LabelInfo(this.headElement_, "Всего объектов: " , 0);
    this.habitableObjects_ = new LabelInfo(this.headElement_, "Жилых объектов: " , 0);
    this.throughGames_ = new LabelInfo(this.headElement_, "Oчки: ", 0);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.getHeight = function() {
    return this.headElement_.clientHeight + this.conreinerHeader_.offsetTop;
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.setGameObjectsCount = function(value) {
    this.allGameObjects_.setValue(value);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.setApm = function(value) {
    this.apm_.setValue(value);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.setThroughGames = function(value) {
    this.throughGames_.setValue(value);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.setRound = function(value) {
    this.round_.setValue(value);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.setHabitableObjectsCount = function(value) {
    this.habitableObjects_.setValue(value);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.setNameGamer = function(value) {
    this.nameGamer_.setValue(value);
}
//---------------------------------------------------------------------------------------------------------------------
Header.prototype.getNameGamer = function() {
    return this.nameGamer_.getValue();
}
//---------------------------------------------------------------------------------------------------------------------
function LabelInfo(parent, text, defaultValue) {
    this.textDiv_ = document.createElement("div");
    parent.appendChild(this.textDiv_);
    this.textDiv_.innerHTML = text;
    this.textDiv_.className = "label";
    this.element_ = document.createElement("div");
    this.textDiv_.appendChild(this.element_);
    this.element_.innerHTML = defaultValue;
}
//---------------------------------------------------------------------------------------------------------------------
LabelInfo.prototype.setValue = function(value) {
    this.element_.innerHTML = value;
}
//---------------------------------------------------------------------------------------------------------------------
LabelInfo.prototype.getValue = function() {
    return this.element_.innerHTML;
}
//---------------------------------------------------------------------------------------------------------------------