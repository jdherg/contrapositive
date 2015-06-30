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
