
class Player {
	constructor(obj, scene) {
		// Object Loader
		this.playerGeometry = new THREE.BoxGeometry(obj.w, obj.h, obj.d); // player geometry
		this.playerMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); // player material
		this.player = new THREE.Mesh(this.playerGeometry, this.playerMaterial); // player avatar
		this.player.position.x = obj.x; // player x position
		this.player.position.y = obj.y; // player y position
		this.player.position.z = obj.z; // player z position
		this.player.rotation.y = 0; // player rotation
		this.AABB = new THREE.Box3(); // Collider reference
		// add player to scene
		scene.AddToScene(this.player);
		// calculates player Bounding Box
		this.player.geometry.computeBoundingBox();
		// player velocity
		this.Velocity = {x:0, y:0, z:0};
		// player forward vector
		this.Forward = {x:0, y:0, z:0};
		this.Magnitude = .25;
		this.Angle = 0;
		// check for ground collision
		this.counter = 1;
		this.isGrounded = false;
		// Check for if it's shooting
		this.isShooting = false;

		this.makeGun(scene);
	}
	update(ground) {
		// Whatever the player does
		this.AABB.copy( this.player.geometry.boundingBox ).applyMatrix4( this.player.matrixWorld );
		this.calcForward();
		this.movement(ground);
		this.updateGun();
	}
	movement(ground) {
		// Turning
		if (keyboard.isDown(mapping.left())) {
			this.Angle += 0.02;
			this.calcForward();
		}
		if (keyboard.isDown(mapping.right())) {
			this.Angle -= 0.02;
			this.calcForward();
		}
		// This adjusts the angle to make the player not flip out
		if (this.Angle > Math.PI * 2) this.Angle = 0;
		if (this.Angle < 0) this.Angle = Math.PI * 2;
		
		// Moving
		if (keyboard.isDown(mapping.up())) {
			this.Velocity.x = (this.Forward.x);
			this.Velocity.z = (this.Forward.z);
		}
		if (keyboard.isDown(mapping.down())) {
			this.Velocity.x = -(this.Forward.x);
			this.Velocity.z = -(this.Forward.z);
		}

		// Checking collision with the ground
		if (this.AABB.intersectsBox(ground.AABB)) {
			// Checks if the player is touching the ground
			if (this.counter < 5) {
				this.Velocity.y = 0;
				this.isGrounded = true;
				this.counter++;
			}
			// repels the player from the ground
			this.Velocity.y = this.Velocity.y + 0.01;
		}
		// Player jumps
		if (keyboard.onDown(mapping.jump()) && this.isGrounded == true) {
			this.Velocity.y = .25;
			this.isGrounded = false;
			this.counter = 1;
		}
		// Gravity
		this.Velocity.y -= 0.01;


		
		// Updating the player's position
		this.player.position.x += this.Velocity.x;
		this.player.position.y += this.Velocity.y;
		this.player.position.z += this.Velocity.z;
		// Updating the player's rotation
		this.player.rotation.y = this.Angle;
		// Applying drag
		this.Velocity.x *= .90;
		this.Velocity.z *= .90;
	}
	calcForward() {
		// Calculating the forward vector
		this.Forward.x = (this.Magnitude * Math.sin(this.Angle));
		this.Forward.z = (this.Magnitude * Math.cos(this.Angle));
		this.Forward.y = 0;
	}
	makeGun(scene) { // Create the cannon on top of the player
		this.scene = scene;
		this.gunStandGeometry = new THREE.BoxGeometry(.25, .4, .25);
		this.gunBarrelGeometry = new THREE.BoxGeometry(.25,.25,.75);
		this.gunStandMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
		this.gunBarrelMaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
		this.gunStand = new THREE.Mesh(this.gunStandGeometry, this.gunStandMaterial);
		this.gunBarrel = new THREE.Mesh(this.gunBarrelGeometry, this.gunBarrelMaterial);
		this.scene.AddToScene(this.gunStand);
		this.scene.AddToScene(this.gunBarrel);
	}
	updateGun() { // Gun Stuff
		// Create Bullet
		if (keyboard.isDown(mapping.shoot()) && !this.isShooting) {
			let b = new Bullet(this.gunBarrel.position, this.Forward, this.scene)
			this.scene.bullets.push(b);
			this.isShooting = true;
		} else if (!keyboard.isDown(mapping.shoot())) {
			this.isShooting = false;
		}
		////////////////// Where's the gun looking?

		this.gunStand.position.x = this.player.position.x;
		this.gunStand.position.y = this.player.position.y + .5;
		this.gunStand.position.z = this.player.position.z;
		this.gunStand.rotation.y = this.Angle;

		this.gunBarrel.position.x = this.player.position.x + this.Forward.x;
		this.gunBarrel.position.y = this.player.position.y + .8;
		this.gunBarrel.position.z = this.player.position.z + this.Forward.z;
		this.gunBarrel.rotation.y = this.Angle;
	}
}