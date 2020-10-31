
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
		this.x = this.x * Num;
		this.y = this.y * Num;
		this.z = this.z * Num;
	}
	div(Num) {
		this.x /= Num;
		this.y /= Num;
		this.z /= Num;
	}
	length() {
		let sq = (number) => { return number * number }
		return Math.sqrt(sq(this.x)+sq(this.y)+sq(this.z));
	}
	normalize() {
		this.div(this.length());
	}
	angleTo(other) { // to be added later

	}
	distanceTo(other) {
		let sq = (number) => { return number * number }
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
	lerp() { // to be added later

	}
}