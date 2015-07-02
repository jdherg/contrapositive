var ContraSet = function (dance, dancer_count, cx) {
    this.dance = dance;
    this.dancers = [];
    for(var i = 0; i < dancer_count; i++) {
        this.dancers.push(new Dancer(i, this));
    }
    this.cx = cx;
};

ContraSet.prototype.getX = function (count, dancer) {
    var dancerInfo = this.getGroupAndPos(dancer.id, count);
    if(dancerInfo[0] === "top" || dancerInfo[0] === "bottom") {
        count %= this.dance.duration;
        count /= 4;
        if(dancerInfo[1] === 1 || dancerInfo[1] === 2) {
            return Math.min(count, 1) * -100 + (this.cx + 50)
        } else {
            return Math.min(count, 1) * 100 + (this.cx - 50)
        }
    } else {
        return this.center(dancerInfo[0])[0] + this.dance.getX(count, dancerInfo[1]);
    }
};

ContraSet.prototype.getY = function (count, dancer) {
    var dancerInfo = this.getGroupAndPos(dancer.id, count);
    if(dancerInfo[0] === "bottom") {
        return 175 + ( (this.dancers.length/4 - 1) * 200);
    } else if(dancerInfo[0] === "top"){
        return 75;
    } else {
        var topOffset = (this.numberOfProgressions(count) % 2) * 100;
        return this.center(dancerInfo[0])[1] + this.dance.getY(count, dancerInfo[1]) + topOffset;
    }
};

ContraSet.prototype.center = function (hands4) {
    return [this.cx, 125+(hands4*200)];
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
            group = (2 * numberOfHands4s - 1) - group;
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