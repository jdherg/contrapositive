var	tau = 2*Math.PI;


var Hands4 = function(center, radius, dance) {
		this.center = center;
		this.radius = radius;
		this.dancers = [];
		this.dance = dance;
	};

	Hands4.prototype.getX = function(count, pos) {
		return this.center[0] + this.dance.getX(count, pos);
	}

	Hands4.prototype.getY = function(count, pos) {
		return this.center[1] + this.dance.getY(count, pos);
	}

	var Dance = function() {
		this.moves = [];
	}

	Dance.prototype.getX = function(count, pos) {
		return this.moves[0].getX(count, pos);
	}

	Dance.prototype.getY = function(count, pos) {
		return this.moves[0].getY(count, pos);
	}

	var Move = function() {

	}

	Move.prototype.getX = function(count, pos) {
		throw "not implemented";
	}

	Move.prototype.getY = function(count, pos) {
		throw "not implemented";
	}

	var Circle = function(radius, direction) {
		this.radius = radius;
		this.direction = direction;
		this.speed = 1/8;
	}

	Circle.prototype.__proto__ = Move.prototype;

	Circle.prototype.getX = function(count, pos) {
		return Math.cos(tau/8 + tau/4 * pos + this.speed * count * tau) * this.radius
	}

	Circle.prototype.getY = function(count, pos) {
		return Math.sin(tau/8 + tau/4 * pos + this.speed * count * tau) * this.radius
	}