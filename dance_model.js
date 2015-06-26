var	tau = 2*Math.PI;


var Hands4 = function(center, radius, dance) {
		this.center = center;
		this.radius = radius;
		this.dancers = [];
		this.dance = dance;
	};

	Hands4.prototype.getX = function(count, pos) {
		return this.center[0] + this.dance.getX(count, pos);
	};

	Hands4.prototype.getY = function(count, pos) {
		return this.center[1] + this.dance.getY(count, pos);
	};

	var Dance = function(repeatFlag) {
		this.repeat = repeatFlag;
		this.moves = [];
		this.defaultMove = new Stand(0,75);
		this.danceLength = 0;
	};

	Dance.prototype.getX = function(count, pos) {
		var moveInfo = this.currentMove(count);
		return moveInfo[0].getX(moveInfo[1], pos);
	};

	Dance.prototype.getY = function(count, pos) {
		var moveInfo = this.currentMove(count);
		return moveInfo[0].getY(moveInfo[1], pos);
	};

	Dance.prototype.currentMove = function(count) {
		if(this.repeat) {
			count %= this.danceLength;
		}
		for(var i = 0; i < this.moves.length; i++) {
			if(count > this.moves[i].duration) {
				count -= this.moves[i].duration;
			} else {
				return [this.moves[i], count];
			}
		}
		return [this.defaultMove, 0];
	};

	Dance.prototype.addMove = function(move) {
		this.moves.push(move);
		this.danceLength += move.duration;
	};

	var Move = function(duration, radius) {
		this.duration = duration;
		this.radius = radius;
	};

	Move.prototype.getCoords = function(count,pos) {
		var theta = tau/8 + (tau/4 * pos);
		return [Math.cos(theta) * this.radius, Math.sin(theta) * this.radius];
	};

	Move.prototype.getX = function(count, pos) {
		return this.getCoords(count, pos)[0];
	};

	Move.prototype.getY = function(count, pos) {
		return this.getCoords(count, pos)[1];
	};

	Move.prototype.posTransform = function(pos) {
		return pos;
	};

	var Circle = function(duration, direction, radius) {
		Move.call(this, duration, radius);
		this.direction = direction;
		this.speed = 1/8;
	};

	Circle.prototype.__proto__ = Move.prototype;

	Circle.prototype.getCoords = function(count, pos) {
		var theta = tau/8 + (tau/4 * pos) + this.direction * this.speed * count * tau;
		return [Math.cos(theta) * this.radius, Math.sin(theta) * this.radius];
	};

	Circle.prototype.posTransform = function(pos) {
		var posDelta = this.direction * this.duration * this.speed * 4;
		pos = (pos + posDelta) % 4;
		pos += pos < 0 ? 4 :0;
		return pos;
	};

	var Stand = function(duration, radius) {
		Move.call(this, duration, radius);
	};

	Stand.prototype.__proto__ = Move.prototype;

	var Allemande = function(duration, direction, radius) {
		Move.call(this, duration, radius);
		this.direction = direction;
		this.speed = 1/4;
	};

	Allemande.prototype.__proto__ = Move.prototype;

	Allemande.prototype.getCoords = function(count, pos) {
		var initialPositionFor = this.__proto__.__proto__.getCoords.bind(this);
        var startingPosition = initialPositionFor(0, pos);
		var partnerStartingPosition = initialPositionFor(0, pos^1);
        var cx = (startingPosition[0] + partnerStartingPosition[0])/2;
		var cy = (startingPosition[1] + partnerStartingPosition[1])/2;
		var polar = cartesianToPolar([cx,cy],startingPosition);
		var theta_delta = tau * this.speed * count * this.direction;
		var theta_end = polar[1] + theta_delta;
		return [Math.cos(theta_end) * polar[0] + cx, Math.sin(theta_end) * polar[0] + cy];
	};

function cartesianToPolar(center, point){
    var dx = point[0] - center[0],
        dy = point[1] - center[1],
		dist = Math.sqrt(dx * dx + dy * dy),
        sin = dy / dist,
        cos = dx / dist,
        acos = Math.acos(cos);
        var theta = 0;
        if(sin < 0) {
            theta = -1 * acos;
        } else {
          if(cos < 0) {
            theta = 2 * Math.PI - acos;
          } else {
            theta = acos;
          }
        }
        return [dist, theta];
}

