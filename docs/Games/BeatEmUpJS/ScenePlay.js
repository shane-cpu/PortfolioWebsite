
class ScenePlay {
	constructor() {
		// this is where we will make the
		// variables that will hold the game
		// objects
		this.aabb = new AABB();
		this.Sprites = new sprites();
		this.player = new Player(100, 250);
		this.Sprites.insert(this.player); // inserting player to sprites instance
		this.enemies = []; // Enemy array
		for (let i = 1; i < 3; i++) { // This a temporary spawn for one enemy for testing
			let E = new Enemy(600, this.randomRange(270, 400));
			this.enemies.push(E);
			this.Sprites.insert(E);
		}
		this.check = 0;
		this.ui = new UserInterface(this, 50, 50);
	}
	update() {
		// this is where the objects will
		// be updated.
		this.player.update();
		this.ui.tick();
		this.enemies.forEach(e=>e.update());
		while (this.check < this.enemies.length) {
			if (this.enemies[this.check].HEALTH <= 0) {
				this.enemies.splice(this.check, 1);
				break;
			}
			this.check++;
		}
		this.check = 0;
		this.Sprites.check();
		if (this.enemies.length == 0) this.waveSpawn();
	}
	draw() {
		// this is where they will be drawn
		this.Sprites.draw();
	}
	randomRange(min, max) {
		// This returns a random number between two values
		return Math.random() * (max - min) + min;
	}
	waveSpawn() {
		let E = new Enemy(100, 240);
		this.enemies.push(E);
		this.Sprites.insert(E);
		E = new Enemy(100, 400);
		this.enemies.push(E);
		this.Sprites.insert(E);
		E = new Enemy(650, 400);
		this.enemies.push(E);
		this.Sprites.insert(E);
		E = new Enemy(650, 240);
		this.enemies.push(E);
		this.Sprites.insert(E);
	}
}