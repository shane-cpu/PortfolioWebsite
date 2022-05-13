
class Player {
	constructor(X, Y) {
		this.Position = {x:X, y:Y, z:-300}; // Position of player
		this.ImgOffset = {x:0, y:0, z:0}; // Offset of player
		this.Velocity = {x:0, y:0, z:0}; // Speed of player

		this.animframe = 0; // What frame of animation am I on
		this.animDelay = 0; // This delays the animation frame changing

		this.HEALTH = 20;

		this.state = 1; // Player state machine

		this.side = 1; // Where is he looking -1 is left, 1 is right

		this.isPunching = false;
		this.SecondPunch = false;
		this.UpperCut = false;
		this.isKicking = false;
		this.isSlamming = false;
		this.isHit = false;
	}
	update() {

		this.Attack(); // Checks if attacking
		this.moveHorizontal(); // Deals with x movement
		this.moveVertical(); // Deals with forground to background movement
		this.moveAirial(); // Deals with jumping
		
		if (this.Velocity.x > 0 || this.Velocity.x < 0 || this.Velocity.y > 0 || this.Velocity.y < 0) {
			this.state = 2;
		} else {
			this.state = 1;
			if (this.isSlamming && this.Position.z == 0) {
				game.scene.aabb.createSlam(true, this.Position, this.side);
				this.isSlamming = false;
			}
		}
		if (!this.isPunching && this.Position.z < 0) {
			this.state = 4;
		}
		if (this.isPunching && !this.isKicking) {
			this.state = 3;
			this.Velocity.x = 0;
			this.Velocity.y = 0;
		}
		if (this.isKicking && !this.isPunching) {
			this.state = 5;
			this.Velocity.x = 0;
			this.Velocity.y = 0;
		}

		// Player state machine for animations
		switch (this.state) {
			case 1: // Standing animation
				if (this.animDelay <= 0) {
					this.animframe++;
					if (this.animframe >= 4 || this.animframe < 0) this.animframe = 0;
					this.animDelay = 1/15;
				}
				this.animDelay -= .01;
				break;
			case 2: // Walking animation
				if (this.animDelay <= 0) {
					this.animframe++;
					if (this.animframe >= 10 || this.animframe < 4) this.animframe = 4;
					this.animDelay = 1/15;
				}
				this.animDelay -= .01;
				break;
			case 3: // Puching animation
				if (this.animDelay <= 0) {
					this.animframe++;
					if (this.animframe == 12) game.scene.aabb.createHit(true, this.Position, this.side);
					if (this.animframe >= 13 || this.animframe < 10) {
						if (!this.SecondPunch) {
							this.isPunching = false;
							this.state = 1;
							this.animframe = 0;
						}
						if (this.SecondPunch && this.animframe == 15) {
							game.scene.aabb.createHit(true, this.Position, this.side);
						}
						if (this.SecondPunch && this.animframe >= 17 && !this.UpperCut) {
							this.isPunching = false;
							this.state = 1;
							this.animframe = 0;
							this.SecondPunch = false;
						}
						if (this.SecondPunch && this.animframe >= 17 && this.UpperCut) {
							this.isPunching = false;
							this.SecondPunch = false;
							this.UpperCut = false
							this.state = 4;
							this.animframe = 17;
							game.scene.aabb.createUpperCut(true, this.Position, this.side);
							this.Velocity.z = -1200;
						}
					}
					this.animDelay = 1/15;
				}
				this.animDelay -= .01;
				break;
			case 4: // Jumping animation
				if (this.Velocity.z < 0) {
					this.animframe = 17;
				}
				if (this.Velocity.z >= 0) {
					this.animframe = 18;
					if (this.isSlamming && this.Velocity.z < 1000) { // Increase landing speed for slam
						this.Velocity.z = 1200;
					}
				}
				break;
			case 5: // Kicking animation
				if (this.animDelay <= 0) {
					this.animframe++;
					if (this.animframe == 21) game.scene.aabb.createKick(true, this.Position, this.side);
					if (this.animframe >= 23 || this.animframe < 19) {
						this.isKicking = false;
						this.state = 1;
						this.animframe = 0;
					}
					this.animDelay = 1/15;
				}
				this.animDelay -= .01;
				break;
		}

		// Calculates locations of character and image
		if (this.Velocity.x > 0) this.side = 1;
		if (this.Velocity.x < 0) this.side = -1;
		this.Position.x += this.Velocity.x * game.time.dt;
		if (this.Position.x > 750) this.Position.x = 750;
		if (this.Position.x < 50) this.Position.x = 50;
		this.Position.y += this.Velocity.y * game.time.dt;
		if (this.Position.y > 415) this.Position.y = 415;
		if (this.Position.y < 240) this.Position.y = 240;
		this.Position.z += this.Velocity.z * game.time.dt;
		if (this.Position.z < -150) {
			this.Position.z = -150;
			this.Velocity.z *= .7;
		}
		if (this.Position.z > 0) this.Position.z = 0;
		this.ImgOffset.x = this.Position.x - 85;
		this.ImgOffset.y = this.Position.y - 85;

		if (this.isHit) {
			this.HEALTH--;
			this.isHit = false;
		}
	}
	draw() { // Draws player
		const gfx = game.view.gfx; // 1 is right, -1 is left
		gfx.drawImage(game.scene.Sprites.Shadow, this.ImgOffset.x, this.ImgOffset.y);
		if (this.side == 1) gfx.drawImage(game.scene.Sprites.PlayerSpritesR[this.animframe], this.ImgOffset.x, this.ImgOffset.y + this.Position.z);
		if (this.side == -1) gfx.drawImage(game.scene.Sprites.PlayerSpritesL[this.animframe], this.ImgOffset.x, this.ImgOffset.y + this.Position.z);
	}
	Attack() { // Player attack
		if (keyboard.onDown(mapping.punch()) && this.isPunching && !this.SecondPunch) {
			this.SecondPunch = true;
		}
		if (keyboard.onDown(mapping.punch()) && !this.isPunching && this.state != 4 && !this.isKicking) {
			this.isPunching = true;
			this.animframe = 10;
		}

		if (keyboard.onDown(mapping.kick()) && !this.isPunching && this.state != 4 && !this.isKicking) {
			this.isKicking = true;
			this.animframe = 19;
		}
		if (keyboard.onDown(mapping.kick()) && this.state == 4 && !this.isSlamming && this.Velocity.z > 0) {
			this.isSlamming = true;
		}
	}
	moveHorizontal() { // X movement
		let inputX = 0; // This decides if it moves left right or at all
		if (keyboard.isDown(mapping.right())) inputX++; // checks input right and left
		if (keyboard.isDown(mapping.left())) inputX--;

		const moveAcceleration = 1200;
		const maxVelocity = 150;

		if (inputX != 0) {
			this.Velocity.x += moveAcceleration * game.time.dt * inputX;
			if (this.Velocity.x > maxVelocity) this.Velocity.x = maxVelocity;
			if (this.Velocity.x < -maxVelocity) this.Velocity.x = -maxVelocity;
		} else {
			if (this.Velocity.x < 0) {
				this.Velocity.x += moveAcceleration * game.time.dt;
				if(this.Velocity.x > 0) this.Velocity.x = 0;
			}
			if (this.Velocity.x > 0) {
				this.Velocity.x += -moveAcceleration * game.time.dt;
				if(this.Velocity.x < 0) this.Velocity.x = 0;
			}
		}
	}
	moveVertical() { // Y movement 
		let inputY = 0; // Chooses up or down or at all
		if (keyboard.isDown(mapping.down())) inputY++; // Checks input up and down
		if (keyboard.isDown(mapping.up())) inputY--;

		const moveAcceleration = 600;
		const maxVelocity = 50;

		if (inputY != 0) {
			this.Velocity.y += moveAcceleration * game.time.dt * inputY;
			if (this.Velocity.y > maxVelocity) this.Velocity.y = maxVelocity;
			if (this.Velocity.y < -maxVelocity) this.Velocity.y = -maxVelocity;
		} else {
			if (this.Velocity.y < 0) {
				this.Velocity.y += moveAcceleration * game.time.dt;
				if(this.Velocity.y > 0) this.Velocity.y = 0;
			}
			if (this.Velocity.y > 0) {
				this.Velocity.y += -moveAcceleration * game.time.dt;
				if(this.Velocity.y < 0) this.Velocity.y = 0;
			}
		}
	}
	moveAirial() { // Checks if they jump

		if (this.Position.z == 0 && keyboard.onDown(mapping.jump()) && !this.isPunching) {
			this.Velocity.z = -600;
		}

		if (this.Position.z == 0 && keyboard.onDown(mapping.jump()) && this.SecondPunch) {
			this.UpperCut = true;
		}

		// Gravity
		this.Velocity.z += 1200 * game.time.dt;
	}
}