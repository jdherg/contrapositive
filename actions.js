var Action = function () {
};

Action.prototype.getCoords = function (count, pos) {
    var theta = tau / 8 + (tau / 4 * pos);
    return [Math.cos(theta) * 100 / Math.sqrt(2), Math.sin(theta) * 100 / Math.sqrt(2)];
};

Action.prototype.getX = function (count, pos) {
    return this.getCoords(count, pos)[0];
};

Action.prototype.getY = function (count, pos) {
    return this.getCoords(count, pos)[1];
};

Action.prototype.calculateEndingPositions = function() {
    throw "Not implemented.";
};


var Wait = function (duration, radius) {
    Action.call(this);
    this.duration = duration;
    this.radius = radius;
};

Wait.prototype = Object.create(Action.prototype);

Wait.prototype.calculateEndingPositions = function() {
    if(this.startingPositions === undefined) {
        this.startingPositions = [];
        for (var i = 0; i < 4; i++) {
            this.startingPositions.push(this.getCoords(0, i));
        }
    }
    this.endingPositions = this.startingPositions;
};

var Rotate = function (duration, direction, speed, radius) {
    Action.call(this);
    this.radius = radius;
    this.direction = direction;
    this.speed = speed;
    this.duration = duration;
};

Rotate.prototype = Object.create(Action.prototype);

Rotate.prototype.getCoords = function (count, pos) {
    var startingPosition = this.startingPositions[pos];
    var theta_delta = tau * this.speed * this.direction * count;
    var init_theta = cartesianToPolar([0,0], startingPosition)[1];
    var theta = init_theta + theta_delta;
    return [Math.cos(theta) * this.radius, Math.sin(theta) * this.radius];
};

Rotate.prototype.calculateEndingPositions = function() {
    this.endingPositions = [];
    for(var i = 0; i < 4; i++) {
        this.endingPositions.push(this.getCoords(this.duration, i));
    }
};

var Spin = function (duration, direction, speed, radius) {
    Action.call(this);
    this.duration = duration;
    this.direction = direction;
    this.speed = speed;
    this.radius = radius;
};

Spin.prototype = Object.create(Action.prototype);

Spin.prototype.getCoords = function (count, pos) {
    var startingPosition = this.startingPositions[pos];
    var partnerStartingPosition = this.startingPositions[pos ^ 1];
    var cx = (startingPosition[0] + partnerStartingPosition[0]) / 2;
    var cy = (startingPosition[1] + partnerStartingPosition[1]) / 2;
    var polar = cartesianToPolar([cx, cy], startingPosition);
    var theta_delta = tau * this.speed * count * this.direction;
    var theta_end = polar[1] + theta_delta;
    return [Math.cos(theta_end) * this.radius + cx, Math.sin(theta_end) * this.radius + cy];
};

Spin.prototype.calculateEndingPositions = function() {
    this.endingPositions = [];
    for(var i = 0; i < 4; i++) {
        this.endingPositions.push(this.getCoords(this.duration, i));
    }
};

var Approach = function(duration, radius) {
    Action.call(this);
    this.duration = duration;
    this.radius = radius;
};


Approach.prototype = Object.create(Action.prototype);

Approach.prototype.getCoords = function(count, pos) {
    return this.interpolators[pos](count/this.duration);
};

Approach.prototype.calculateEndingPositions = function() {
    this.endingPositions = [];
    this.interpolators = [];
    for(var pos = 0; pos < 4; pos++) {
        var partnerPos = pos ^ 1;
        var centerX = (this.startingPositions[pos][0] + this.startingPositions[partnerPos][0]) / 2;
        var centerY = (this.startingPositions[pos][1] + this.startingPositions[partnerPos][1]) / 2;
        var polar = cartesianToPolar([centerX, centerY], this.startingPositions[pos]);
        var target = polarToCartesian([this.radius, polar[1]], [centerX, centerY]);
        this.endingPositions.push(target);
        this.interpolators.push(d3.interpolate(this.startingPositions[pos],target));
    }
};

var Retreat = function(duration, radius) {
    Action.call(this);
    this.duration = duration;
    this.radius = radius;
};

Retreat.prototype = Object.create(Action.prototype);

Retreat.prototype.getCoords = function(count, pos) {
    return this.interpolators[pos](count/this.duration);
};

Retreat.prototype.calculateEndingPositions = function() {
    this.endingPositions = [];
    this.interpolators = [];
    for(var pos = 0; pos < 4; pos++) {
        var partnerPos = pos ^ 1;
        var centerX = (this.startingPositions[pos][0] + this.startingPositions[partnerPos][0]) / 2;
        var centerY = (this.startingPositions[pos][1] + this.startingPositions[partnerPos][1]) / 2;
        var polar = cartesianToPolar([centerX, centerY], this.startingPositions[pos]);
        var target = polarToCartesian([this.radius, polar[1]], [centerX, centerY]);
        this.endingPositions.push(target);
        this.interpolators.push(d3.interpolate(this.startingPositions[pos],target));
    }
};

function cartesianToPolar(center, point) {
    var dx = point[0] - center[0],
        dy = point[1] - center[1],
        dist = Math.sqrt(dx * dx + dy * dy),
        atan = Math.atan2(dy, dx);
    return [dist, atan];
}

function polarToCartesian(polar, center) {
    return [Math.cos(polar[1]) * polar[0] + center[0], Math.sin(polar[1]) * polar[0] + center[1]];
}