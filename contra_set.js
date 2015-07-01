var ContraSet = function (dance, dancers) {
    this.dance = dance;
    this.dancers = dancers;
    for(var i = 0; i < this.dancers.length; i++) {
        this.dancers[i].contraSet = this;
    }
};

ContraSet.prototype.getX = function (count, dancer) {
    var dancerInfo = this.getGroupAndPos(dancer.id, count);
    if(dancerInfo[0] === "top" || dancerInfo[0] === "bottom") {
        if(dancerInfo[1] === 1 || dancerInfo[1] === 2) {
            return 200;
        } else {
            return 300;
        }
    } else {
        return this.center(dancerInfo[0])[0] + this.dance.getX(count, dancerInfo[1]);
    }
};

ContraSet.prototype.getY = function (count, dancer) {
    var dancerInfo = this.getGroupAndPos(dancer.id, count);
    if(dancerInfo[0] === "bottom") {
        return 100+( (this.dancers.length/4 - 1) * 200 + 100);
    } else if(dancerInfo[0] === "top"){
        return 100;
    } else {
        return this.center(dancerInfo[0])[1] + this.dance.getY(count, dancerInfo[1]);
    }
};

ContraSet.prototype.center = function (hands4) {
    return [250, 250+(hands4*200)];
};

ContraSet.prototype.getGroupAndPos = function(dancer_id, count) {
    var numberOfHands4s = Math.floor(this.dancers.length / 4);
    var numberOfProgressions = this.numberOfProgressions(count);
    numberOfProgressions = numberOfProgressions % this.dancers.length;
    var steps = Math.ceil(numberOfProgressions / 2);
    var group = Math.floor(dancer_id / 4);
    var pos = dancer_id % 4;

    // handle progression movement
    if(pos < 2) {
        group -= steps;
    } else {
        group += steps;
    }

    // handle bounces for out of bounds progression
    while(group < 0 || group >= numberOfHands4s){
        if (group < 0) {
            group = (-1) - group;
            pos += 2;
        }

        if (group >= numberOfHands4s) {
            group = (numberOfHands4s + 1) - group;
            pos -= 2;
        }
    }

    // handle notation quirks
    if (numberOfProgressions % 2 === 1) {
        if (pos >= 2) {
            group -= 1;
        }

        if(group === -1) {
            group = "top";
        }

        if(group === numberOfHands4s - 1) {
            group = "bottom";
        }
    }
    return [group, pos];
};

ContraSet.prototype.numberOfProgressions = function(count) {
    return Math.floor(count / this.dance.duration);
};