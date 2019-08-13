// creating the varriable names for all our context
var scr, input, frames, spFrame, lvFrame;
var alSprite, taSprite, ciSprite;
var aliens, dir, tank, bullets, cities;
var c = 0;
function main() {
  scr = new SScreen(504, 600, 'red');
  input = new InputHandler();
  var img = new Image();
  img.addEventListener("load", function() {
    // setting the alien sprites
    alSprite = [
      [new Sprite(this, 0, 0, 22, 16), new Sprite(this, 0, 16, 22, 16)],
      [new Sprite(this, 22, 0, 16, 16), new Sprite(this, 22, 16, 16, 16)],
      [new Sprite(this, 38, 0, 24, 16), new Sprite(this, 38, 16, 24, 16)]
    ];

    // setting the tank sprites
    taSprite = new Sprite(this, 62, 0, 22, 16);
    ciSprite = new Sprite(this, 84, 8, 36, 24);
    // calling the init and run functions to begin the game
    init();
    run();
  });
  //location of the image and loading it to the system
  img.src = "invaders.png";
}

function init() {
  frames = 0;
  spFrame = 0;
  lvFrame = 60;
  // declaring witch directon the aliens will be going countinues
  // on code line 80? - 90?
  dir = 1;

  // creating the tank object
  tank = {
    sprite: taSprite,
    x: (scr.width - taSprite.w) / 2,
    y: scr.height - (30 + taSprite.h)
  };
  // lists contaning our bullets aliens and cities
  bullets = [];
  aliens = [];

  // creating our rows of aliens
  //line 55 is creatiung the alien object that will bestored in our array
  //aliens at line 45
  var rows = [1, 0, 0, 2, 2];
  for (var i = 0, len = rows.length; i < len; i++) {
    for (var j = 0; j < 10; j++) {
      var a = rows[i];
      aliens.push({
        sprite: alSprite[a],
        x: 30 + j * 30 + [0, 4, 0][a],
        y: 30 + i * 30,
        w: alSprite[a][0].w,
        h: alSprite[a][0].h
      });
    }
  }
}
// calling the functions that draw to screen and contole the movments
// at every run of code.
function run() {
  var loop = function() {
    update();
    render();
    window.requestAnimationFrame(loop, scr.canvas);
  };
  window.requestAnimationFrame(loop, scr.canvas);
}
// this function controles the tank "the player"
function update() {
  if (input.isDown(37)) {
    tank.x -= 4;
  }
  if (input.isDown(39)) {
    tank.x += 4;
  }
  // dont let the tank go out side the boundry
  tank.x = Math.max(Math.min(tank.x, scr.width - (30 + taSprite.w)), 30);
  // shoot the bullets
  if (input.isPressed(32)) {
    window.bullets.push(new Bullet(tank.x, tank.y, -8, 2, 6, "#FFF"));
  }
  console.log(bullets);
  //  for (var i = 0, len = bullets.length; i < len; i++){
  //  bullets[i].update();
  //}

  // this algerithem decides what sprite the alien object shold
  // display at every movment
  frames++;
  if (frames % lvFrame === 0) {
    spFrame = (spFrame + 1) % 2;
    (_max = 0), (_min = scr.width);
    for (var i = 0, len = aliens.length; i < len; i++) {
      var a = aliens[i];
      a.x += 30 * dir;

      _max = Math.max(_max, a.x + a.w);
      _min = Math.min(_min, a.x);
    }
    // move the aliens the other way when colide with the wall
    if (_max > scr.width - 30 || _min < 30) {
      dir *= -1;
      for (var i = 0, len = aliens.length; i < len; i++) {
        aliens[i].x += 30 * dir;
        aliens[i].y += 30;
      }
    }
  }
}

// the function thatb draws everythig to the screen
function render() {
  // clear the screen every loop of code
  scr.clear();
  //draw all the aliens in the aliens array
  for (var i = 0, len = aliens.length; i < len; i++) {
    var a = aliens[i];
    scr.drawSprite(a.sprite[spFrame], a.x, a.y);
  }
  //draw the bullets
  scr.ctx.save();
  for (var i = 0, len = bullets.length; i < len; i++) {
    scr.drawBullet(bullets[i]);
  }
  scr.ctx.restore();

  //scr.ctx.fillStyle = "#FFF";
  //scr.ctx.fillRect(10,10,100,100);
  //draw the tank
  scr.drawSprite(tank.sprite, tank.x, tank.y);
}
// the function that runs the game
main();
