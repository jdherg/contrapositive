var Move = function (duration, radius, previousMoveEnding) {
    this.actions = [];
    if(previousMoveEnding === undefined) {
        var initialAction = new Wait(0, radius);
        initialAction.calculateEndingPositions();
        previousMoveEnding = initialAction.endingPositions;
    }
    this.previousMoveEnding = previousMoveEnding;
    this.duration = duration;
    this.radius = radius;
};

Move.prototype.getCoords = function (count, pos) {
    var theta = tau / 8 + (tau / 4 * pos);
    return [Math.cos(theta) * this.radius, Math.sin(theta) * this.radius];
};

Move.prototype.getX = function (count, pos) {
    var actionInfo = this.currentAction(count);
    return actionInfo[0].getX(actionInfo[1], pos);
};

Move.prototype.getY = function (count, pos) {
    var actionInfo = this.currentAction(count);
    return actionInfo[0].getY(actionInfo[1], pos);
};

Move.prototype.currentAction = function (count) {
    for (var i = 0; i < this.actions.length; i++) {
        if (count > this.actions[i].duration) {
            count -= this.actions[i].duration;
        } else {
            return [this.actions[i], count];
        }
    }
    return [this.defaultAction, 0];
};

Move.prototype.addAction = function (action) {
    var previousAction = this.actions[this.actions.length - 1];
    var previousEndingPositions = [];
    if(previousAction === undefined) {
        previousEndingPositions = this.previousMoveEnding;
    } else {
        previousEndingPositions = previousAction.endingPositions;
    }
    this.actions.push(action);
    action.startingPositions = previousEndingPositions;
    action.calculateEndingPositions();
    this.endingPositions = action.endingPositions;
};

var Stand = function (duration, radius) {
    Move.call(this, duration, radius);
    this.addAction(new Wait(duration, radius));
};

Stand.prototype = Object.create(Move.prototype);

var Circle = function (duration, direction, radius, previousMoveEnding) {
    Move.call(this, duration, radius, previousMoveEnding);
    this.direction = direction;
    this.speed = 1 / 8;
    this.addAction(new Rotate(duration, direction, this.speed, radius));
};

Circle.prototype.__proto__ = Move.prototype;

var Allemande = function (duration, direction, radius, previousMoveEnding) {
    Move.call(this, duration, radius, previousMoveEnding);
    this.direction = direction;
    this.speed = 1 / 4;
    this.addAction(new Approach(1, radius));
    this.addAction(new Spin(duration - 2, direction, this.speed, radius));
    this.addAction(new Retreat(1, 50));
};

Allemande.prototype = Object.create(Move.prototype);
