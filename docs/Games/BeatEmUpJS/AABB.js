
class AABB {
	createHit(P, obj, side) { // This is creating a punch as funny as that sounds
		// P is if it's the player
		// obj is the object's position
		// side is what way it's looking
		this.x = 0;
		if (side == 1) this.x = obj.x + 25;
		if (side == -1) this.x = obj.x - 25;
		this.y = obj.y - 15;
		if (P == true) {
			game.scene.enemies.forEach(e=> {
				e.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, e);
				if (side == 1 && e.isHit) { // Knockback Right
					e.Velocity.z = -100;
					e.Velocity.x = 50;
					e.Velocity.y = 0;
					e.HEALTH--;
				}
				if (side == -1 && e.isHit) { // Knockback Left
					e.Velocity.z = -100;
					e.Velocity.x = -50;
					e.Velocity.y = 0;
					e.HEALTH--;
				}
			});
		}
		if (P == false) {
			game.scene.player.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, game.scene.player);
		}
	}
	createKick(P, obj, side) { // This is creating a kick as funny as that sounds
		// P is if it's the player
		// obj is the object's position
		// side is what way it's looking
		this.x = 0;
		if (side == 1) this.x = obj.x + 20;
		if (side == -1) this.x = obj.x - 20;
		this.y = obj.y + 15;
		if (P = true) {
			game.scene.enemies.forEach(e=> {
				e.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, e);
				if (side == 1 && e.isHit) { // Knockback Right
					e.Velocity.z = -100;
					e.Velocity.x = 75;
					e.Velocity.y = 0;
					e.HEALTH--;
				}
				if (side == -1 && e.isHit) { // Knockback Left
					e.Velocity.z = -100;
					e.Velocity.x = -75;
					e.Velocity.y = 0;
					e.HEALTH--;
				}
			});
		}
		if (P = false) {
			game.scene.player.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, game.scene.player);
		}
	}
	createUpperCut(P, obj, side) { // This creates an uppercut
		// P is if it's the player
		// obj is the object's position
		// side is what way it's looking
		this.x = 0;
		if (side == 1) this.x = obj.x + 25;
		if (side == -1) this.x = obj.x - 25;
		this.y = obj.y - 15;
		if (P = true) {
			game.scene.enemies.forEach(e=> {
				e.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, e);
				if (side == 1 && e.isHit) { // Knockback Right
					e.Velocity.z = -500;
					e.Velocity.x = 400;
					e.Velocity.y = 0;
					e.HitCounter = -80;
					e.HEALTH--;
				}

				if (side == -1 && e.isHit) { // Knockback Left
					e.Velocity.z = -500;
					e.Velocity.x = -400;
					e.Velocity.y = 0;
					e.HitCounter = -80;
					e.HEALTH--;
				}
			});
		}
		if (P = false) {
			game.scene.player.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, game.scene.player);
		}
	}
	createSlam(P, obj, side) { // This is creating a kick as funny as that sounds
		// P is if it's the player
		// obj is the object's position
		// side is what way it's looking
		this.x = 0;
		if (side == 1) this.x = obj.x + 20;
		if (side == -1) this.x = obj.x - 20;
		this.y = obj.y + 15;
		if (P = true) {
			game.scene.enemies.forEach(e=> {
				e.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, e);
				if (side == 1 && e.isHit) { // Knockback Right
					e.Velocity.z = -200;
					e.Velocity.x = 300;
					e.Velocity.y = 0;
					e.HEALTH--;
				}
				if (side == -1 && e.isHit) { // Knockback Left
					e.Velocity.z = -200;
					e.Velocity.x = -300;
					e.Velocity.y = 0;
					e.HEALTH--;
				}
			});
		}
		if (P = false) {
			game.scene.player.isHit = this.isHit({x:this.x, y:this.y, z:obj.z}, game.scene.player);
		}
	}
	isHit(obj1, obj2) { // This is the punch Hit Check
		// obj1 is the attack
		// obj2 is the hitbox
		if (obj1.x - 25 < obj2.Position.x + 37.5 && obj1.x + 25 > obj2.Position.x - 37.5 && obj1.y - 20 < obj2.Position.y + 35 && obj1.y + 20 > obj2.Position.y - 35 && obj1.z <= obj2.Position.z && obj1.z > obj2.Position.z - 100) {
			return true;
		}
		return false;
	}
}