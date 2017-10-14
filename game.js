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
  
  actorAt(actor) {
    if (!(actor instanceof Actor) || !actor) throw new Error(`Wrong argument in actorAt method`);
    
    return this.actors.find(el => {
      if (el.isIntersect(actor)) return true;
      return false;
    });
  }
    
  obstacleAt(pos, size) {
    if (!(pos instanceof Vector) || !(size instanceof Vector)) throw new Error(`Wrong argument in obstacleAt method`);
    
    // Как проверить, пересечение с препятсятвиями, если нет данных об этих препятствиях?
    // Или препятствия так же передаются в массив this.actors?
    
    if (pos.x + size.x > this.width ||
       pos.x < 0 ||
       pos.y + size.y > this.height ||
       pos.y < 0) {
      if (pos.y + size.y > this.height) return `lava`;
      return `wall`;
    }
    
    /*for (let i = pos.y; i <= pos.y + size.y; i++) {
      for (let j = pos.x; j <= pos.x + size.x; j++) {
        switch (this.grid[i][j]) {
          case `x`:
            console.log(`wall`);
            return `wall`;
          case `!`:
            console.log(`lawa`);
            return `lawa`;
          default:
            console.log(`its ok`);
        }
      }
    }*/
      
    return undefined;
  }
  
  removeActor(actor) {
    this.actors.splice(this.actors.indexOf(actor), 1);
  }
  
  noMoreActors(type) {
    if (!type) return this.actors.length > 0 ? false : true;
    if (!this.actors.find(el => { if (el.type === type) return true; })) return true;
    return false;
  }
  
  playerTouched(obstractionType, actor) {
    if (this.status === null) {
      if (obstractionType === `lava` || obstractionType === `fireball`) this.status = `lost`;
      
      if (obstractionType === `coin` && actor.type === `coin`) {
        this.removeActor(actor);
        if (!this.actors.find(el => { if (el.type === `coin`) return true; else return false; }))
          this.status = `won`;
      }
    }
  }
}

class LevelParser {
  constructor(actorsMap) {
    
  }
}
