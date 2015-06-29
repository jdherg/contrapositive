var tau = 2 * Math.PI;

var Dancer = function(id) {
    this.id = id;
};

var ContraSet = function (dance, dancers) {
    this.dance = dance;
    this.dancers = dancers;
    this.hands4s = [];
    this.dancerPositions = {};
    this.constructHands4s();
};

ContraSet.prototype.getX = function (count, dancer) {
    var dancerInfo = this.getH4AndPos(dancer.id);
    return dancerInfo[0].getX(count, dancerInfo[1]);
};

ContraSet.prototype.getY = function (count, dancer) {
    var dancerInfo = this.getH4AndPos(dancer.id);
    return dancerInfo[0].getY(count, dancerInfo[1]);
};

ContraSet.prototype.getH4AndPos = function(dancer_id) {
    return this.dancerPositions[dancer_id];
};

ContraSet.prototype.constructHands4s = function() {
    numberOfDancers = dancers.length;
    if(numberOfDancers % 2 === 1) {
        throw "Lonely dancer";
    }
    numberOfH4s = Math.floor(numberOfDancers / 4);
    for(i = 0; i < numberOfH4s; i++) {
        center = [250 + (i*200), 250];
        this.hands4s.push(new Hands4(center, dance));
    }

    for(pos = 0; pos < numberOfDancers; pos++) {
        this.dancers[pos].contraSet = this;
        this.dancerPositions[this.dancers[pos].id] = [this.hands4s[Math.floor(pos / 4)], pos % 4]
    }
};

var Hands4 = function (center, dance) {
    this.center = center;
    this.dance = dance;
};

Hands4.prototype.getX = function (count, pos) {
    return this.center[0] + this.dance.getX(count, pos);
};

Hands4.prototype.getY = function (count, pos) {
    return this.center[1] + this.dance.getY(count, pos);
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
