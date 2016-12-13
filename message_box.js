//---------------------------------------------------------------------------------------------------------------------
function MessageBox() {
    this.formContainer_ = document.createElement("div");
    this.formContainer_.id = "formContainer";
    document.body.appendChild(this.formContainer_);
    
    this.pause_ = document.createElement("div");
    this.formContainer_.appendChild(this.pause_);
    this.pause_.id = "pause";
    this.pause_.innerHTML = " pause ";

    this.promptForm_ = document.createElement("form");
    this.formContainer_.appendChild(this.promptForm_);
    this.promptForm_.id = "promptForm";

    this.promptMessage_ = document.createElement("div");
    this.promptForm_.appendChild(this.promptMessage_);
    this.promptMessage_.id = "promptMessage";
    this.promptMessage_.innerHTML = " Введите имя игрока: ";

    this.inputGradient_ = document.createElement("input");
    this.promptForm_.appendChild(this.inputGradient_);
    this.inputGradient_.type = "text";
    this.inputGradient_.value = "";
    this.inputGradient_.name = "text";
    this.inputGradient_.className = "gradient";

    this.inputGradientButton_ = document.createElement("input");
    this.promptForm_.appendChild(this.inputGradientButton_);
    this.inputGradientButton_.type = "button";
    this.inputGradientButton_.value = "OK";
    this.inputGradientButton_.className = "gradientButton gradient";

    this.visibilitySwitch_ = "message";
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.getVisibilitySwitch = function() {
    return this.visibilitySwitch_;
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.setVisibilitySwitch = function(value) {
    this.visibilitySwitch_ = value;
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.showMessageBox = function() {
    this.formContainer_.style.visibility = "visible";
    this.promptForm_.style.visibility = "visible";
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.showPause = function() {
    this.formContainer_.style.visibility = "visible";
    this.pause_.style.visibility = "visible";
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.hideMessageBox = function() {
    this.formContainer_.style.visibility = "hidden";
    this.promptForm_.style.visibility = "hidden";
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.hidePause = function() {
    this.formContainer_.style.visibility = "hidden";
    this.pause_.style.visibility = "hidden";
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.getInputGradientButton = function() {
    return this.inputGradientButton_;
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.getTextValue = function() {
    return this.promptForm_.elements.text.value;
}
//---------------------------------------------------------------------------------------------------------------------
MessageBox.prototype.visibilityStopOrPause = function() {
    var visibilitySwitch = this.visibilitySwitch_;
    if (visibilitySwitch === "game") {
        this.showPause();
        this.visibilitySwitch_ = "pause";
       return "stop";
    }
    else if (visibilitySwitch === "pause") {
        this.hidePause();
        this.visibilitySwitch_ = "game";
        return "continueGame";
    } else {
        return;
    }
}
//---------------------------------------------------------------------------------------------------------------------