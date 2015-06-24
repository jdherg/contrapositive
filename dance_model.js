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

	var Move = function() {

	};

	Move.prototype.getX = function(count, pos) {
		throw "not implemented";
	};

	Move.prototype.getY = function(count, pos) {
		throw "not implemented";
	};

	Move.prototype.posTransform = function(pos) {
		return pos;
	};

	var Circle = function(duration, direction, radius) {
		this.radius = radius;
		this.direction = direction;
		this.speed = 1/8;
		this.duration = duration;
	};

	Circle.prototype.__proto__ = Move.prototype;

	Circle.prototype.getX = function(count, pos) {
		return Math.cos(tau/8 + tau/4 * pos + this.direction * this.speed * count * tau) * this.radius
	};

	Circle.prototype.getY = function(count, pos) {
		return Math.sin(tau/8 + tau/4 * pos + this.direction * this.speed * count * tau) * this.radius
	};

	Circle.prototype.posTransform = function(pos) {
		var posDelta = this.direction * this.duration * this.speed * 4;
		pos = (pos + posDelta) % 4;
		pos += pos < 0 ? 4 :0;
		return pos;
	};

	var Stand = function(duration, radius) {
		this.duration = duration;
		this.radius = radius;
	};

	Stand.prototype.__proto__ = Move.prototype;

	Stand.prototype.getX = function(count, pos) {
		return Math.cos(tau/8 + tau/4 * pos) * this.radius;
	};

	Stand.prototype.getY = function(count, pos) {
		return Math.sin(tau/8 + tau/4 * pos) * this.radius

	};