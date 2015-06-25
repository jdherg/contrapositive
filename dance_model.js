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
		this.duration = 0;
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
			count %= this.duration;
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
		this.duration += move.duration;
	};

	var Move = function() {
		this.actions = [];
		this.defaultMove = new Wait(0,75);
		this.duration = 0;
	};

	Move.prototype.getX = function(count, pos) {
		var actionInfo = this.currentAction(count);
		return actionInfo[0].getX(actionInfo[1], pos);
	};
	
	Move.prototype.getY = function(count, pos) {
		var actionInfo = this.currentAction(count);
		return actionInfo[0].getY(actionInfo[1], pos);
	};
	
	Move.prototype.currentAction = function(count) {
		for(var i = 0; i < this.actions.length; i++) {
			if(count > this.actions[i].duration) {
				count -= this.actions[i].duration;
			} else {
				return [this.actions[i], count];
			}
		}
		return [this.defaultAction, 0];
	};
	
	Move.prototype.addAction = function(action) {
		this.actions.push(action);
		this.duration += action.duration;
	};

	Move.prototype.posTransform = function(pos) {
		return pos;
	};

	var Action = function() {

		Action.prototype.getCoords = function(count,pos) {
			var theta = tau/8 + (tau/4 * pos);
			return [Math.cos(theta) * 75, Math.sin(theta) * 75];
		};

		Action.prototype.getX = function(count, pos) {
			return this.getCoords(count, pos)[0];
		};

		Action.prototype.getY = function(count, pos) {
			return this.getCoords(count, pos)[1];
		};

	};

	var Circle = function(duration, direction, radius) {
		this.radius = radius;
		this.direction = direction;
		this.speed = 1/8;
		this.duration = duration;
		this.addAction(new Rotate(duration, direction, this.speed, radius));
	};

	Circle.prototype = new Move();
	Circle.constructor = Circle;

	Circle.prototype.posTransform = function(pos) {
		var posDelta = this.direction * this.duration * this.speed * 4;
		pos = (pos + posDelta) % 4;
		pos += pos < 0 ? 4 :0;
		return pos;
	};

	var Rotate = function(duration, direction, speed, radius) {
		this.radius = radius;
		this.direction = direction;
		this.speed = speed;
		this.duration = duration;
	};

	Rotate.prototype.__proto__ = Action.prototype;
	
	Rotate.prototype.getCoords = function(count, pos) {
		var theta = tau/8 + (tau/4 * pos) + this.direction * this.speed * count * tau;
		return [Math.cos(theta) * this.radius, Math.sin(theta) * this.radius];
	};

	var Stand = function(duration, radius) {
		this.duration = duration;
		this.radius = radius;
		this.addAction(new Wait(duration, radius));
	};

	Stand.prototype.__proto__ = Move.prototype;

	var Wait = function(duration, radius) {
		this.duration = duration;
		this.radius = radius;
	};

	Wait.prototype.__proto__ = Action.prototype;

	var Allemande = function(duration, direction, radius) {
		this.duration = duration;
		this.direction = direction;
		this.radius = radius;
		this.speed = 1/4;
		this.addAction(new Spin(duration, direction, this.speed, radius));
	};

	Allemande.prototype.__proto__ = Move.prototype;

	var Spin = function(duration, direction, speed, radius) {
		this.duration = duration;
		this.direction = direction;
		this.speed = speed;
		this.radius = radius;
	};

	Spin.prototype.__proto__ = Action.prototype;

	Spin.prototype.getCoords = function(count, pos) {
		var initialPositionFor = this.__proto__.__proto__.getCoords;
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

