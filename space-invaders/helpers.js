

//create the bullets
function Bullet(x, y, vely, w, h, color){
  this.x = x;
  this.y = y;
  this.vely = vely;
  this.w = w;
  this.h = h;
  this.color = color;
};

Bullet.prototype.update = function() {
  this.y += this.vely;
};

// screen
function SScreen(width, height, color){
  this.canvas = document.createElement("canvas");
  this.canvas.width = this.width = width;
  this.canvas.height = this.height = height;
  this.ctx = this.canvas.getContext("2d");
  this.canvas.color = this.color = color;

  document.body.appendChild(this.canvas);
};

SScreen.prototype.clear = function(){
  this.ctx.clearRect(0, 0, this.width, this.height);
;}

SScreen.prototype.drawSprite = function(sp, x, y) {
  this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

SScreen.prototype.drawBullet = function(bullet){
  //this.beginPath();
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  //this.closePath();
}

// drawSprite
function Sprite(img, x, y, w, h){
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
};


// InputHandler
function InputHandler(){
  this.down = {};
  this.pressed = {};

  var _this = this;
  document.addEventListener("keydown", function(evt){
_this.down[evt.keyCode] = true;
});
document.addEventListener("keyup", function(evt) {
  delete _this.down[evt.keyCode];
  delete _this.pressed[evt.keyCode];
});
};

InputHandler.prototype.isDown = function(code){
  return this.down[code];
};

InputHandler.prototype.isPressed = function(code){
  if (this.pressed[code]) {
    return false;
  } else if (this.down[code]) {
    return this.pressed[code] = true;
  }
  return false;
};
