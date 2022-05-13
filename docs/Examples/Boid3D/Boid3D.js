
class Boid3D {
	constructor(Pos, Vel, scene) {
		this.Pos = Pos;
		this.Vel = Vel;
		this.Acc = new Vector3(0, 0, 0);

		this.MS = 2;
		this.MF = 0.05;

		this.geo = new THREE.SphereGeometry(1, 5, 5);
		this.mat = new THREE.MeshPhongMaterial( {color: 0xEB9EE1} );
		this.body = new THREE.Mesh(this.geo, this.mat);

		scene.addToScene(this.body);
		
		this.body.position.x = this.Pos.x;
		this.body.position.y = this.Pos.y;
		this.body.position.z = this.Pos.z;
	}
	run(boids) {
		this.flock(boids);
		this.update();
		this.render();
	}
	flock(boids) {
		let sep = this.separate(boids);
		let ali = this.align(boids);
		let coh = this.cohesion(boids);
		let emb = this.emBox();

		sep.mult(1.5);
		ali.mult(1.0);
		coh.mult(1.0);
		emb.mult(3.0);

		this.Acc.addVect(sep);
		this.Acc.addVect(ali);
		this.Acc.addVect(coh);
		this.Acc.addVect(emb);
	}
	separate(boids) {
		let dd = 6; // desired distance
		let sv = new Vector3(0, 0, 0); // steering vector
		let count = 0; // count of nearby boids

		for (let i = 0; i < boids.length; i++) {
			let dist = this.Pos.distanceTo(boids[i].Pos); // distance

			if (dist > 0 && dist < dd) {

				let diff = new Vector3(this.Pos.x-boids[i].Pos.x, this.Pos.y-boids[i].Pos.y, this.Pos.z-boids[i].Pos.z);
				diff.normalize();
				diff.div(dist);

				sv.addVect(diff);

				count++;
			}
		}

		if (count > 0) {
			sv.div(count);
		}

		if (sv.length() > 0) {
			sv.normalize();
			sv.mult(this.MS);
			sv.subVect(this.Vel);

			sv.clamp(-this.MF, this.MF);
		}

		return sv;
	}
	align(boids) {
		let nd = 10; // neighbor distance
		let s = new Vector3(0, 0, 0); // sum of velocities
		let count = 0; // count of neighbors

		for (let i = 0; i < boids.length; i++) {
			let dist = this.Pos.distanceTo(boids[i].Pos);

			if (dist > 0 && dist < nd) {

				s.addVect(boids[i].Vel);

				count++;
			}
		}
		
		if (count > 0) {

			s.div(count);
			s.normalize();
			s.mult(this.MS);

			let sv = s.clone(); // steering vector
			sv.subVect(this.Vel);
			sv.clamp(-this.MF, this.MF);

			return sv;
		} else {
			let sv = new Vector3(0, 0, 0);

			return sv;
		}
	}
	cohesion(boids) {
		let nd = 10; // neighbor dist
		let sp = new Vector3(0, 0, 0); // sum of distances
		let count = 0;
		for (let i = 0; i < boids.length; i++) {
			let dist = this.Pos.distanceTo(boids[i].Pos);

			if (dist > 0 && dist < nd) {

				sp.addVect(boids[i].Pos);

				count++;
			}
		}

		if (count > 0) {
			sp.div(count);

			return this.seek(sp);
		} else {
			let nothing = new Vector3(0, 0, 0);
			return nothing;
		}
	}
	seek(target) {
		let dp = new Vector3(target.x - this.Pos.x, target.y - this.Pos.y, target.z - this.Pos.z,); // desired position

		dp.normalize();
		dp.mult(this.MS);

		let sv = dp.clone();
		sv.subVect(this.Vel);
		sv.clamp(-this.MF, this.MF);

		return sv;
	}
	update() {
		this.Pos.addVect(this.Vel);
		this.Vel.addVect(this.Acc);
		this.Vel.clamp(-this.MS, this.MS);
		this.Acc.mult(0.1);
		this.emBoxFarther();
	}
	render() {
		this.body.position.x = this.Pos.x;
		this.body.position.y = this.Pos.y;
		this.body.position.z = this.Pos.z;
	}
	emBox() {
		let emb = new Vector3(0, 0, 0);
		if (this.Pos.x + 2 >= 20) emb.x = -1;
		else if (this.Pos.x - 2 <= -20) emb.x = 1;
		if (this.Pos.y + 2 >= 20) emb.y = -1;
		else if (this.Pos.y - 2 <= -20) emb.y = 1;
		if (this.Pos.z + 2 >= 20) emb.z = -1;
		else if (this.Pos.z - 2 <= -20) emb.z = 1;

		emb.mult(this.MF)
		return emb;
	}
	emBoxFarther() {
		let emb = new Vector3(0, 0, 0);
		let ignore = false;

		if (this.Pos.x >= 25) {
			emb.x = -1;
			ignore = true;
		}
		else if (this.Pos.x <= -25) {
			emb.x = 1;
			ignore = true;
		}
		if (this.Pos.y >= 25) {
			emb.y = -1;
			ignore = true;
		}
		else if (this.Pos.y  <= -25) {
			emb.y = 1;
			ignore = true;
		}
		if (this.Pos.z >= 25) {
			emb.z = -1;
			ignore = true;
		}
		else if (this.Pos.z <= -25) {
			emb.z = 1;
			ignore = true;
		}

		if (ignore) {
			this.Vel = emb.clone();
		}
	}
}

class flock {
	constructor() {
		this.boids = [];
	}
	run() {
		for (let i = 0; i < this.boids.length; i++) {
			this.boids[i].run(this.boids);
		}
	}
	addBoid(nb) {
		this.boids.push(nb);
	}
}