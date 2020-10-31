
class Enemy {
	constructor(scene) {
		// enemy size
		this.enemyGeometry = new THREE.BoxGeometry(1, 1, 1);
		this.enemyNoseGeometry = new THREE.BoxGeometry(.1, .1, .1);
		// enemy Material
		this.enemyMaterial = new THREE.MeshPhongMaterial( {color:0xff0000} );
		// enemy instance
		this.enemy = new THREE.Mesh(this.enemyGeometry, this.enemyMaterial);
		this.enemyNose = new THREE.Mesh(this.enemyNoseGeometry, this.enemyMaterial);
		// enemy added to scene
		scene.AddToScene(this.enemy);
		scene.AddToScene(this.enemyNose);
		// Collider
		this.AABB = new THREE.Box3();
		this.enemy.geometry.computeBoundingBox();
		// Velocity
		this.Velocity = {x:0, y:0, z:0};
		// Forward vector
		this.Forward = {x:0, y:0, z:0};
		this.Magnitude = .25;
		this.Angle = 0;
		// physics thing
		this.counter = 1;
		// Enemy is not dead;
		this.isDead = false;
		// Move target
		this.target = {};
		// Scene refenence
		this.scene = scene;
	}
	update(ground, bullets) {

		this.AABB.copy( this.enemy.geometry.boundingBox ).applyMatrix4( this.enemy.matrixWorld );
		this.movement(ground, bullets);
	}
	movement(ground, bullets) {
		////////////////////////////////////////////Rotation
		this.calcForward();
		
		this.NoseLoc();
		if (this.targetDistance() > 1) {
			this.Velocity.x = this.Forward.x * .1;
			this.Velocity.z = this.Forward.z * .1;
		} else if (this.targetDistance() < 1) {
			let i = this.randomRange(0, 4);
			if (i < 1.5) this.target = this.scene.Mpoint1;
			if (i >= 1.5 && i < 2.5) this.target = this.scene.Mpoint2;
			if (i >= 2.5 && i < 3.5) this.target = this.scene.Mpoint3;
			if (i >= 3.5) this.target = this.scene.Mpoint4;
		}

		// Checking collision with the ground
		if (this.AABB.intersectsBox(ground.AABB)) {
			// Checks if the player is touching the ground
			if (this.counter < 5) {
				this.Velocity.y = 0;
				this.counter++;
			}
			// repels the player from the ground
			this.Velocity.y = this.Velocity.y + 0.01;
		}
		// Gravity
		this.Velocity.y -= 0.01;
		// Update enemy position
		this.enemy.position.x += this.Velocity.x;
		this.enemy.position.y += this.Velocity.y;
		this.enemy.position.z += this.Velocity.z;
		// Update player rotation
		this.enemy.rotation.y = -this.Angle;
		if (this.isDead) {
			this.enemyGeometry.dispose();
			this.enemyMaterial.dispose();
			this.enemyNoseGeometry.dispose();
			this.scene.scene.remove(this.enemy);
			this.scene.scene.remove(this.enemyNose);
		}
	}
	NoseLoc() {
		this.enemyNose.position.x = this.enemy.position.x + this.Forward.x;
		this.enemyNose.position.z = this.enemy.position.z + this.Forward.z;
		this.enemyNose.position.y = this.enemy.position.y;
		this.enemyNose.rotation.y = this.Angle;
	}
	calcForward() {
		// Calculating the forward vector
		let i = this.enemy.position.x - this.target.x;
		let i2 = this.enemy.position.z - this.target.z;
		this.Angle = Math.atan2(i2,i) + Math.PI;
		this.Forward.x = Math.cos(this.Angle);
		this.Forward.z = Math.sin(this.Angle);
		this.Forward.y = 0;
	}
	targetDistance() {
		return Math.sqrt(((this.enemy.position.x - this.target.x)*(this.enemy.position.x - this.target.x)) + ((this.enemy.position.z - this.target.z)*(this.enemy.position.z - this.target.z)));
	}
	randomRange(Min, Max) {
		return (Math.random() * (Max - Min)) + Min;
	}
}