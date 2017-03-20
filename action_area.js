//---------------------------------------------------------------------------------------
function ActionArea() {
    this.area_ = document.createElement("div");
    document.body.appendChild(this.area_);
    this.area_.style.height = document.documentElement.clientHeight + "px";

    this.header_ = new Header(this.area_);
    this.scoreManager_ = new ScoreManager(this.header_);
    this.content_ = new Content(this.area_, 0, this.header_.getHeight(), this.scoreManager_);
    this.messageBox_ = new MessageBox();

    this.resizeHandler_ = function() {
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;

        this.content_.changeContentSize();

        this.area_.style.height = height + "px";

        if (width < 800 || height < 480) {
            document.body.style.overflow = "auto";
        } else {
            document.body.style.overflow = "hidden";
        }
    }
    
    window.addEventListener("resize", this.resizeHandler_.bind(this));

    this.keypressHandler_ = function(event) {
        if (event.charCode === 32) {
            var resultVisibilityStopOrPause = this.messageBox_.visibilityStopOrPause();
            if (resultVisibilityStopOrPause === "stop") {
                this.stop();
            }
            else if (resultVisibilityStopOrPause === "continueGame") {
                this.continueGame();
            } else {
                return;
            }
        }
    }
    window.addEventListener("keypress", this.keypressHandler_.bind(this));

     this.objectStendEvent_ = this.messageBox_.getInputGradientButton();
}
//---------------------------------------------------------------------------------------
ActionArea.prototype.fillingNameGamer = function() {
    var textValue = this.messageBox_.getTextValue();
    if (textValue === "" || textValue === undefined) {
            return;
    }
    this.messageBox_.hideMessageBox();
    this.messageBox_.setVisibilitySwitch("game");
    this.header_.setNameGamer(textValue);
    this.content_.start();
    this.scoreManager_.start();
}
//---------------------------------------------------------------------------------------
ActionArea.prototype.start = function() {
    this.messageBox_.showMessageBox();
    this.objectStendEvent_.addEventListener("click", this.fillingNameGamer.bind(this));
}
//---------------------------------------------------------------------------------------
ActionArea.prototype.continueGame = function() {
    this.content_.start();
    this.scoreManager_.start();
}
//---------------------------------------------------------------------------------------
ActionArea.prototype.stop = function() {
    this.content_.stop();
    this.scoreManager_.stop();
}
//---------------------------------------------------------------------------------------