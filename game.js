'use strict';

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  plus(vector) {
    if (!(vector instanceof Vector)) throw new Error(`Можно прибавлять к вектору только вектор типа Vector`);
    
    return new Vector(this.x + vector.x, this.y + vector.y);
    /*return {
      x: this.x + vector.x,
      y: this.y + vector.y
    };*/
  }
  
  times(mul) {
    return new Vector(this.x * mul, this.y * mul);
  }
}

class Actor {
  constructor(pos = new Vector(0, 0), size = new Vector(1, 1), speed = new Vector(0, 0)) {
    if (!(pos instanceof Vector) || !(size instanceof Vector) || !(speed instanceof Vector)) throw new Error(`Wrong type argument in Actor constructor`);
    
    this.pos = new Vector(pos.x, pos.y);
    this.size = new Vector(size.x, size.y);
    this.speed = new Vector(speed.x, speed.y);
    
    this._type = `actor`;
  }
  
  get left() { return this.pos.x; }
  get right() { return this.pos.x + this.size.x; }
  get top() { return this.pos.y; }
  get bottom() { return this.pos.y + this.size.y; }
  get type() { return this._type; }
  
  act() {
    
  }
  
  isIntersect(actorTypeObj) {
    if (!(actorTypeObj instanceof Actor)) throw new Error(`Wrong type argument in isIntersect`);
    if (this === actorTypeObj) return false;
    
    if (this.bottom > actorTypeObj.top &&
       this.top < actorTypeObj.bottom &&
       this.right > actorTypeObj.left &&
       this.left < actorTypeObj.right) {
        return true;
    }
    else return false;
  }
}


class Level {
  constructor(grid = [], actors = []) {
    this.grid = grid;
    this.actors = actors;
    this.player = this.actors.find(el => {
      if (el.type === `player`) return true;
      return false;
    });
    this.height = this.grid.length;
    this.width = 0;
    this.grid.forEach(line => {
      if (line.length > this.width) this.width = line.length;
    });
    this.status = null;
    this.finishDelay = 1;
  }
  
  isFinished() {
    if (this.status !== null && this.finishDelay < 0) 
      return true;    
    return false;
  }
}