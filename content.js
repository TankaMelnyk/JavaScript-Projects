//---------------------------------------------------------------------------------------------------------------------
function Content(parent, offsetX, offsetY, scoreManager) {
    this.visualContentContainer_ = document.createElement("div");
    this.parentContainer_ = parent;
    this.scoreManager_ = scoreManager;
    this.parentContainer_.appendChild(this.visualContentContainer_);
    this.visualContentContainer_.className = "content";
    this.visualContentContainer_.style.height = (parent.clientHeight - offsetY) + "px";
    
    this.maxFieldRows_ = 1080;
    this.maxFieldColumns_ = 1920;

    this.contentMapper_ = new ContentMapper(offsetX, offsetY);
    this.actionsManager_ = new ActionsManager();
    this.collisionManager_ = new CollisionManager(this.actionsManager_, this.visualContentContainer_, this.maxFieldRows_, this.maxFieldColumns_);
    this.spaceFactory_ = new SpaceFactory(this.actionsManager_, this.collisionManager_, this.visualContentContainer_, this.contentMapper_, this.scoreManager_);
}
//---------------------------------------------------------------------------------------------------------------------
Content.prototype.start = function() {
    this.actionsManager_.start();
    this.spaceFactory_.start();
}
//---------------------------------------------------------------------------------------------------------------------
Content.prototype.stop = function() {
    this.actionsManager_.stop();
    this.spaceFactory_.stop();
}
//---------------------------------------------------------------------------------------------------------------------
Content.prototype.changeContentSize = function() {
    this.visualContentContainer_.style.height = (this.parentContainer_.clientHeight - this.contentMapper_.getOffsetY()) + "px";
    this.collisionManager_.changeFieldSize(this.visualContentContainer_.clientHeight, this.visualContentContainer_.clientWidth, this.scoreManager_);
}
//---------------------------------------------------------------------------------------------------------------------