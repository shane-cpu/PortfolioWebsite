
class Enemy {
	constructor(X, Y) {
		this.Position = {x:X, y:Y, z:0}; // Current position
		this.ImgOffset = {x:0, y:0, z:0}; // Sets the image to a location based on actual location
		this.Velocity = {x:0, y:0, z:0}; // The speed of the character

		this.STATE = 1; // Enemy state
		this.DISTANCE = 0; // Distance to player
		this.counter = 1; // This is used once to set the original distance

		this.isHit = false; // Are they hit or are they not
		this.HitCounter = 0; // Are you still stunned
		this.HEALTH = 20; // Checking if the enemy is alive

		this.Side = 1; // 1 right 0 is left
		this.AnimCounter = 0; // The animation frame
		this.AnimDelay = 0; // The Delay between each frame
		this.AttackCounter = 0; // The counter that determines when the enemy attacks
	}
	update() {
		// Calculates the distance to the player o start
		if (this.counter == 1) {
			this.DISTANCE = this.CalcDistance(this.Position, game.scene.player.Position);
			this.counter++;
		}
		if (this.Position.z < 0) this.isHit = true;

		// Calls state machine
		this.EnemyMovement();

		// Calls Animation state machine
		this.EnemyAnimation();

		// This is the gravity being applyed
		this.Velocity.z += 1200 * game.time.dt;

		// This is the position updating
		this.Position.x += this.Velocity.x * game.time.dt;
		if (this.Position.x > 750) this.Position.x = 750;
		if (this.Position.x < 50) this.Position.x = 50;
		this.Position.y += this.Velocity.y * game.time.dt;
		if (this.Position.y > 415) this.Position.y = 415;
		if (this.Position.y < 240) this.Position.y = 240;
		this.Position.z += this.Velocity.z * game.time.dt;
		if (this.Position.z > 0) this.Position.z = 0;
		this.ImgOffset.x = this.Position.x - 85;
		this.ImgOffset.y = this.Position.y - 85;

		// Calculates the distance after movement calc
		this.DISTANCE = this.CalcDistance(this.Position, game.scene.player.Position);
	}
	draw() {
		const gfx = game.view.gfx; // Drawing enemy sprites
		gfx.drawImage(game.scene.Sprites.Shadow, this.ImgOffset.x, this.ImgOffset.y);
		if (this.Side == 1) gfx.drawImage(game.scene.Sprites.EnemySpritesR[this.AnimCounter], this.ImgOffset.x, this.ImgOffset.y + this.Position.z);
		if (this.Side == -1) gfx.drawImage(game.scene.Sprites.EnemySpritesL[this.AnimCounter], this.ImgOffset.x, this.ImgOffset.y + this.Position.z);
	}
	EnemyMovement() {
		if (!this.isHit) { // If they are not hit they go off of this state machine
			switch(this.STATE) {
				case 1:
					this.StandardState();
					break;
				case 2:
					this.ActiveState();
					break;
				case 3:
					this.AttackingState();
					break;
			}
		}
		if (this.isHit) { // if enemy is hit they go into a stunned state for now
			this.HitCounter++;
			if (this.HitCounter > 40) {
				this.isHit = false;
				this.HitCounter = 0;
			}
		}
	}
	EnemyAnimation() {
		switch (this.STATE) {
			case 1: // Standing animation
				if (this.AnimDelay <= 0) {
					this.AnimCounter++;
					if (this.AnimCounter >= 4 || this.AnimCounter < 0) this.AnimCounter = 0;
					this.AnimDelay = 1/15;
				}
				this.AnimDelay -= .01;
				break;
			case 2: // Walking animation
				if (this.AnimDelay <= 0) {
					this.AnimCounter++;
					if (this.AnimCounter >= 10 || this.AnimCounter < 4) this.AnimCounter = 4;
					this.AnimDelay = 1/15;
				}
				this.AnimDelay -= .01;
				break;
			case 3:
				if (this.AnimDelay <= 0) {
					this.AnimCounter++;
					if (this.AnimCounter >= 4 || this.AnimCounter < 0) this.AnimCounter = 0;
					this.AnimDelay = 1/15;
				}
				this.AnimDelay -= .01;
				break;
			case 4:
				if (this.AnimDelay <= 0) {
					this.AnimCounter++;
					if (this.AnimCounter == 14) {
						game.scene.aabb.createHit(false, this.Position, this.Side);
						this.STATE = 3;
						this.AnimCounter = 0;
					}
					this.AnimDelay = 1/15;
				}
				this.AnimDelay -= .01;
				break;
		}
	}
	StandardState() { // IDLE
		// The enemy stays idle until it's within range
		if (this.DISTANCE < 300) this.STATE = 2;
	}
	ActiveState() { // MOVEMENT TOWARDS TARGET

		const moveAccelerationX = 1200; // Basic movement variables
		const moveAccelerationY = 1200;
		const maxVelocityX = 140;
		const maxVelocityY = 40;

		// This makes the entity move
		// Rework to make more interesting (have them shuffle around and move around target)
		if (game.scene.player.Position.x < this.Position.x) {
			this.Velocity.x += moveAccelerationX * -1 * game.time.dt;
			this.Side = -1;
		}
		if (game.scene.player.Position.x > this.Position.x) {
			this.Velocity.x += moveAccelerationX * game.time.dt;
			this.Side = 1;
		}
		if (game.scene.player.Position.y < this.Position.y) this.Velocity.y += moveAccelerationY * -1 * game.time.dt;
		if (game.scene.player.Position.y > this.Position.y) this.Velocity.y += moveAccelerationY * game.time.dt;

		// This makes the movement limited
		if (this.Velocity.x > maxVelocityX) this.Velocity.x = maxVelocityX;
		if (this.Velocity.x < -maxVelocityX) this.Velocity.x = -maxVelocityX;
		if (this.Velocity.y > maxVelocityY) this.Velocity.y = maxVelocityY;
		if (this.Velocity.y < -maxVelocityY) this.Velocity.y = -maxVelocityY;

		// Switch to attack state
		if (this.DISTANCE < 100) this.STATE = 3;
	}
	AttackingState() { // ATTACKS AND DODGES
		const moveAcceleration = 200; // This makes sure the enemy is within punching range of the player
		if (Math.abs(game.scene.player.Position.y - this.Position.y) > 10) {
			if (this.Position.y > game.scene.player.Position.y) this.Velocity.y += moveAcceleration * -1 * game.time.dt;
			if (this.Position.y < game.scene.player.Position.y) this.Velocity.y += moveAcceleration * game.time.dt;
		} else { // if they are in range they stop in place
			this.Velocity.x = 0;
			this.Velocity.y = 0;
		}

		// This is where I'll put the code to attack
		// It'll have a counter that has it wait to attack so it doesn't rapid fire attacks

		this.AttackCounter++;

		if (this.DISTANCE > 100) this.STATE = 2; // It changes to state two when out of range
		if (this.AttackCounter > 120) { // This engages the punch
			this.STATE = 4;
			this.AnimCounter = 10;
			this.AttackCounter = 0;
		}
	}
	CalcDistance(E, P) { // This is the calculation of the distance to the player
		return Math.sqrt((Math.pow(E.x - P.x, 2))+(Math.pow(E.y - P.y, 2)));
	}
}