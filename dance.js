var tau = 2 * Math.PI;

var Dancer = function(id) {
    this.id = id;
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
