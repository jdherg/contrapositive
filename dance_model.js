var tau = 2 * Math.PI;

var Dancer = function(id) {
    this.id = id;
};

var ContraSet = function (dance, dancers) {
    this.dance = dance;
    this.dancers = dancers;
    this.top = [];
    this.bottom = [];
    this.dancerPositions = {};
};

ContraSet.prototype.getX = function (count, dancer) {
    var dancerInfo = this.getGroupAndPos(dancer.id);
    return this.center(dancerInfo[0])[0] + this.dance.getX(count, dancerInfo[1]);
};

ContraSet.prototype.getY = function (count, dancer) {
    var dancerInfo = this.getGroupAndPos(dancer.id);
    return this.center(dancerInfo[0])[1] + this.dance.getY(count, dancerInfo[1]);
};

ContraSet.prototype.center = function (hands4) {
    return [250, 250+(hands4*200)];
};

ContraSet.prototype.getGroupAndPos = function(dancer_id, count) {
    return [Math.floor(dancer_id / 4), dancer_id % 4];
};

ContraSet.prototype.numberOfProgressions = function(count) {
    Math.floor(count / this.dance.duration);
};

var Dance = function (repeatFlag) {
    this.repeat = repeatFlag;
    this.moves = [];
    this.defaultMove = new Stand(0, 75);
    this.duration = 0;
};

Dance.prototype.getX = function (count, pos) {
    var moveInfo = this.currentMove(count);
    return moveInfo[0].getX(moveInfo[1], pos);
};

Dance.prototype.getY = function (count, pos) {
    var moveInfo = this.currentMove(count);
    return moveInfo[0].getY(moveInfo[1], pos);
};

Dance.prototype.currentMove = function (count) {
    if (this.repeat) {
        count %= this.duration;
    }
    for (var i = 0; i < this.moves.length; i++) {
        if (count > this.moves[i].duration) {
            count -= this.moves[i].duration;
        } else {
            return [this.moves[i], count];
        }
    }
    return [this.defaultMove, 0];
};

Dance.prototype.addMove = function (move) {
    this.moves.push(move);
    this.duration += move.duration;
};
