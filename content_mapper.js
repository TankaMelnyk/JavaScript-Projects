function ContentMapper(offsetX, offsetY) {
    this.offsetX_ = offsetX;
    this.offsetY_ = offsetY;
}

ContentMapper.prototype.getOffsetX = function() {
    return this.offsetX_;
}

ContentMapper.prototype.getOffsetY = function () {
    return this.offsetY_;
}

ContentMapper.prototype.setOffsetY = function (offsetY) {
    this.offsetY_ = offsetY;
}

ContentMapper.prototype.getPositionByAbsoluteFromLocal = function(positionPoint) {                   
    return { x: positionPoint.x + this.offsetX_, y: positionPoint.y + this.offsetY_ };
}

ContentMapper.prototype.getPositionByLocalFromAbsolute = function(positionPoint) {
    return { x: positionPoint.x - this.offsetX_, y: positionPoint.y - this.offsetY_ };
}



