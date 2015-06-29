var Move = function (duration, radius) {
    this.actions = [];
    this.defaultAction = new Wait(0, 75);
    this.duration = duration;
    this.radius = radius;
};

Move.prototype.getCoords = function (count, pos) {
    var theta = tau / 8 + (tau / 4 * pos);
    return [Math.cos(theta) * 75, Math.sin(theta) * 75];
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
    this.actions.push(action);
};

Move.prototype.posTransform = function (pos) {
    return pos;
};

var Stand = function (duration, radius) {
    Move.call(this, duration, radius);
    this.addAction(new Wait(duration, radius));
};

Stand.prototype.__proto__ = Move.prototype;

var Circle = function (duration, direction, radius) {
    Move.call(this, duration, radius);
    this.direction = direction;
    this.speed = 1 / 8;
    this.addAction(new Rotate(duration, direction, this.speed, radius));
};

Circle.prototype.__proto__ = Move.prototype;

Circle.prototype.posTransform = function (pos) {
    var posDelta = this.direction * this.duration * this.speed * 4;
    pos = (pos + posDelta) % 4;
    pos += pos < 0 ? 4 : 0;
    return pos;
};

var Allemande = function (duration, direction, radius) {
    Move.call(this, duration, radius);
    this.direction = direction;
    this.speed = 1 / 4;
    this.addAction(new Approach(duration/6, radius));
    this.addAction(new Spin(2*duration/3, direction, this.speed, radius));
    this.addAction(new Retreat(duration/6, radius));
};

Allemande.prototype.__proto__ = Move.prototype;
