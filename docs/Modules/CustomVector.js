
// custom squaring function
function sq(number) {
	return number * number
}

// custom random flost function
function randomRange(min, max) {
	return (Math.random() * (max - min)) + min;
}

// custom 3D Vector class
class Vector3 {
	constructor (x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	addVect(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
	}
	addNum(x, y, z) {
		this.x += x;
		this.y += y;
		this.z += z;
	}
	subVect(other) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
	}
	subNum(x, y, z) {
		this.x -= x;
		this.y -= y;
		this.z -= z;
	}
	mult(Num) {
		this.x *= Num;
		this.y *= Num;
		this.z *= Num;
	}
	magSq() {
		return sq(this.x)+sq(this.y)+sq(this.z);
	}
	mag() {
		return Math.sqrt(this.magSq());
	}
	normalize() {
		this.mult(1/this.mag());
	}
	normalizeCopy() {
		let Vec = this.clone();
		Vec.mult(1/Vec.mag());
		return Vec;
	}
	distanceTo(other) {
		return Math.sqrt(sq(this.x - other.x)+sq(this.y - other.y)+sq(this.z - other.z));
	}
	clamp(min, max) {
		if (this.x < min) this.x = min;
		else if (this.x > max) this.x = max;
		if (this.y < min) this.y = min;
		else if (this.y > max) this.y = max;
		if (this.z < min) this.z = min;
		else if (this.z > max) this.z = max;
	}
	clone() {
		return new Vector3(this.x, this.y, this.z);
	}
}

// custom 2D Vector class
class Vector2 {
	constructor (x, y) {
		if (x) this.x = x;
		else this.x = 0;
		if (y) this.y = y;
		else this.y = 0;
	}
	addVect(other) {
		this.x += other.x;
		this.y += other.y;
	}
	addNum(x, y) {
		this.x += x;
		this.y += y;
	}
	subVect(other) {
		this.x -= other.x;
		this.y -= other.y;
	}
	subNum(x, y) {
		this.x -= x;
		this.y -= y;
	}
	mult(Num) {
		this.x *= Num;
		this.y *= Num;
	}
	dotProduct(other) {
		return this.x * other.x + this.y * other.y;
	}
	magSq() {
		return sq(this.x)+sq(this.y);
	}
	mag() {
		return Math.sqrt(this.magSq());
	}
	normalize() {
		this.mult(1/this.mag());
	}
	normalizeCopy() {
		let Vec = this.clone();
		Vec.mult(1/Vec.mag());
		return Vec;
	}
	angle() {
		return Math.atan2(y, x);
	}
	angleTo(other) {
		let Vec = other.clone();
		Vec.subVect(this);
		return Vec.angle();
	}
	distanceTo(other) {
		return Math.sqrt(sq(this.x - other.x)+sq(this.y - other.y));
	}
	clamp(min, max) {
		if (this.x < min) this.x = min;
		else if (this.x > max) this.x = max;
		if (this.y < min) this.y = min;
		else if (this.y > max) this.y = max;
	}
	clone() {
		return new Vector2(this.x, this.y);
	}
}