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
    var numberOfHands4s = Math.floor(this.dancers.length / 4);
    var steps = Math.floor(this.numberOfProgressions(count) / 2);
    var groupAndPos = [Math.floor(dancer_id / 4), dancer_id % 4];

    if (groupAndPos[1] < 2) {
        groupAndPos[0] -= steps;
    } else {
        groupAndPos[0] += steps;
    }

    // bounce at the top
    if (groupAndPos[0] < 0) {
        groupAndPos[0] = (-1) - groupAndPos[0];
        groupAndPos[1] += 2;
    }

    // bounce at the bottom
    if (groupAndPos[0] >= numberOfHands4s) {
        groupAndPos[0] = (numberOfHands4s + 1) - groupAndPos[0];
        groupAndPos[1] -= 2;
    }
    return groupAndPos;
};

ContraSet.prototype.numberOfProgressions = function(count) {
    return Math.floor(count / this.dance.duration);
};

