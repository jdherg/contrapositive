var ContraSet = function (dance, dancers) {
    this.dance = dance;
    this.dancers = dancers;
    for(var i = 0; i < this.dancers.length; i++) {
        this.dancers[i].contraSet = this;
    }
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

// ContraSet.prototype.getGroupAndPos = function(dancer_id, count) {
//     var numberOfHands4s = Math.floor(this.dancers.length / 4);
//     var steps = Math.ceil(this.numberOfProgressions(count) / 2);
//     var group = Math.floor(dancer_id / 4);
//     var pos = dancer_id % 4;

//     if (pos < 2) {
//         group -= steps;
//     } else {
//         group += steps;
//     }

//     // bounce at the top
//     if (group < 0) {
//         group = (-1) - group;
//         pos += 2;
//     }

//     // bounce at the bottom
//     if (group >= numberOfHands4s) {
//         group = (numberOfHands4s + 1) - group;
//         pos -= 2;
//     }

//     if (this.numberOfProgressions(count) % 2 === 1) {
//         if (pos > 1) {
//             group -= 1;
//         }

//         if(group === -1) {
//             group = "top";
//         }

//         if(group === numberOfHands4s - 1) {
//             group = "bottom";
//         }
//     }
//     return [group, pos];
// };

ContraSet.prototype.getGroupAndPos = function(dancer_id, count) {
    if(dancer_id % 2 === 1) {
        var partner = this.getGroupAndPos(dancer_id - 1, count);
        return [partner[0],partner[1]+1];
    }
    if(dancer_id === 0) {
        return this.path(this.numberOfProgressions(count));
    }
    if(dancer_id === 2) {
        return this.getGroupAndPos(0, count + 2 * this.dance.duration);
    }
    var base = dancer_id % 4;
    if(base === 0) {
        return this.getGroupAndPos(base, count + (this.progressionCap() - 1 - Math.floor(dancer_id/4)) * this.dance.duration );
    } else {
        return this.getGroupAndPos(base, count + (1 + Math.floor(dancer_id/4)) * this.dance.duration);
    }

}

ContraSet.prototype.numberOfProgressions = function(count) {
    return Math.floor(count / this.dance.duration);
};

ContraSet.prototype.progressionCap = function() {
    return this.dancers.length;
}

ContraSet.prototype.path =  function(progression) {
    return([this.path_group(progression),this.path_pos(progression)]);
}

ContraSet.prototype.path_group = function(path_num) {
    var progs = this.progressionCap();
    path_num %= progs;
    path_num -= 1;
    if(path_num < 0) {
        path_num += progs;
    }
    if(path_num === 0) {
        return "top";
    } else if (path_num === progs / 2) {
        return "bottom";
    } else {
        var dist = Math.abs(progs/2 - path_num);
        if(dist === 1) {
            return progs/4 - 1;
        } else {
            return Math.floor(((progs/2 - dist) - 1)/2);
        }
    }
}

ContraSet.prototype.path_pos = function(path_num) {
    var progs = this.progressionCap();
    path_num %= progs;
    path_num -= 1;
    if(path_num < 0) {
        path_num += progs;
    }
    if(path_num < progs / 2) {
        return 2;
    } else {
        return 0;
    }
}