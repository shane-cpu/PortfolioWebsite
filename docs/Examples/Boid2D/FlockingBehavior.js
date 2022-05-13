
const maxSpeed = 2;
const maxForce = 0.1;

function flock(pos, vel, boids, velocity) {
	let acc = new Vector2(0, 0);

	let sep = separate(pos, vel, boids)
	let ali = align(pos, vel, boids, velocity)
	let coh = cohesion(pos, vel, boids)

	sep.mult(1.75);
	ali.mult(1);
	coh.mult(0.75);

	acc.addVect(sep);
	acc.addVect(ali);
	acc.addVect(coh);

	return acc;
}

function separate(pos, vel, boids) {
	// total distance we want to at least be between them
	let checkDistance = 25;
	// the direction in 2D space we want the boid to go
	let steerVector = new Vector2();

	// the amount of boids nearby
	let nearby = 0;

	boids.forEach((boid) => {
		// the distance between the two boids
		let distance = pos.distanceTo(boid);

		if (0 < distance && distance < checkDistance) {
			// this makes a vector that will steer the boid away from its neighbor
			let difference = pos.clone();
			difference.subVect(boid);

			// we make it within a range of zero to one
			difference.normalize();

			// the farther away it is the less effect it has
			difference.mult(1/distance);

			// then we add this vector to the steering vector
			steerVector.addVect(difference);

			// and now add to the number of nearby boids
			nearby++;
		}
	});

	if (nearby > 0) {
		// we reduce the number by a factor of how many boids were nearby
		steerVector.mult(1/nearby);
	}

	// if the magnitude in greater than zero
	if (steerVector.mag() > 0) {
		// normalize the vector
		steerVector.normalize();

		// multiply it by the max speed
		steerVector.mult(maxSpeed);

		// subtract the current speed
		steerVector.subVect(vel);

		// then clamp the value
		steerVector.clamp(-maxForce, maxForce);
	}

	return steerVector;
}

function align(pos, vel, boids, velocity) {
	// total distance we want to at least be between them
	let checkDistance = 50;
	// the direction in 2D space we want the boid to go
	let steerVector = new Vector2();

	// the amount of boids nearby
	let nearby = 0;

	for (let i = 0; i < boids.length; i++) {
		// the distance between the two boids
		let distance = pos.distanceTo(boids[i]);

		if (0 < distance && distance < checkDistance) {

			// then we add this vector to the steering vector
			steerVector.addVect(velocity[i]);

			// and now add to the number of nearby boids
			nearby++;
		}
	}

	if (nearby > 0) {
		// we reduce the number by a factor of how many boids were nearby
		steerVector.mult(1/nearby);

		// normalize the vector
		steerVector.normalize();

		// multiply it by the max speed
		steerVector.mult(maxSpeed);

		// subtract the current speed
		steerVector.subVect(vel);

		// then clamp the value
		steerVector.clamp(-maxForce, maxForce);

		return steerVector;
	} else {
		return new Vector2();
	}
	
}

function cohesion(pos, vel, boids) {
	// total distance we want to at least be between them
	let checkDistance = 50;
	// the direction in 2D space we want the boid to go
	let locationVector = new Vector2();

	// the amount of boids nearby
	let nearby = 0;

	for (let i = 0; i < boids.length; i++) {
		// the distance between the two boids
		let distance = pos.distanceTo(boids[i]);

		if (0 < distance && distance < checkDistance) {

			// then we add this vector to the location vector
			locationVector.addVect(boids[i]);

			// and now add to the number of nearby boids
			nearby++;
		}
	}

	if (nearby > 0) {
		// we reduce the number by a factor of how many boids were nearby
		locationVector.mult(1/nearby);

		// getting the desired location
		locationVector.subVect(pos);

		// normalize the vector
		locationVector.normalize();

		// multiply it by the max speed
		locationVector.mult(maxSpeed);

		// subtract the current speed
		locationVector.subVect(vel);

		// then clamp the value
		locationVector.clamp(-maxForce, maxForce);

		return locationVector;
	} else {
		return new Vector2();
	}
}