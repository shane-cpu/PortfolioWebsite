
class sprites {
	constructor() {
		this.Entities = []; // Stores everything in the scene
		
		this.DrawOrder = []; // Sets the order of how they are drawn

		this.PlayerSpritesR = []; // player sprites
		this.PlayerSpritesL = []; // This was the fix I found of not being able to flip sprites
		this.EnemySpritesR = []; // Enemy Sprites (there'll be two of these in the final version)
		this.EnemySpritesL = [];
		// This is the sprite for the shadow, it's litterally for seeing where eveything is
		this.Shadow = new Image();
		this.Shadow.src = 'Games/BeatEmUpImgs/Shadow.png';

		this.HealthSprites = [];

		this.insertSprites(); // This loads sprites that will be used in the game

		this.Check = 0;
	}
	insertSprites() {
		// UI sprites
		// HEALTH
		for(let i = 2; i < 6; i++) {
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Health-' + i + '.png';

			this.HealthSprites.push(img);
		}

		// Player sprites

		// Right
		
		for (let i = 2; i < 12; i++) { // walking and idle
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesR.push(img); // Right player sprites
		}
		for (let i = 22; i < 29; i++) { // Punching
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesR.push(img); // Right player sprites
		}
		for (let i = 36; i < 38; i++) { // Jumping
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesR.push(img); // Right player sprites
		}
		for (let i = 40; i < 44; i++) { // Kicking
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesR.push(img); // Right player sprites
		}

		// Left

		for (let i = 12; i < 22; i++) { // walking and idle
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesL.push(img); // Left player sprites
		}
		for (let i = 29; i < 36; i++) { // Punching
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesL.push(img); // Right player sprites
		}
		for (let i = 38; i < 40; i++) { // Jumping
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesL.push(img); // Right player sprites
		}
		for (let i = 44; i < 48; i++) { // Kicking
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Player-' + i + '.png';

			this.PlayerSpritesL.push(img); // Right player sprites
		}

		//////////////////////////////////////////////////////////
		
		for (let i = 2; i < 12; i++) { // walking and idle
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesR.push(img); // Right Enemy sprites
		}
		for (let i = 22; i < 29; i++) { // Punching
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesR.push(img); // Right Enemy sprites
		}
		for (let i = 36; i < 38; i++) { // Jumping
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesR.push(img); // Right Enemy sprites
		}
		for (let i = 40; i < 44; i++) { // Kicking
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesR.push(img); // Right Enemy sprites
		}

		// Left

		for (let i = 12; i < 22; i++) { // walking and idle
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesL.push(img); // Left Enemy sprites
		}
		for (let i = 29; i < 36; i++) { // Punching
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesL.push(img); // Left Enemy sprites
		}
		for (let i = 38; i < 40; i++) { // Jumping
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesL.push(img); // Left Enemy sprites
		}
		for (let i = 44; i < 48; i++) { // Kicking
			const img = new Image();
			img.src = 'Games/BeatEmUpImgs/Enemy-' + i + '.png';

			this.EnemySpritesL.push(img); // Left Enemy sprites
		}
	}
	insert(entity) { // This puts every entity being used into an array
		this.Entities.push(entity);
	}
	check() { // This sorts out every entity into an array to decide the draw order
		while (this.Check < this.Entities.length) {
			if (this.Entities[this.Check].HEALTH <= 0) {
				this.Entities.splice(this.Check, 1);
				break;
			}
			this.Check++;
		}
		this.Check = 0;
		for (let i = 0; i < this.Entities.length; i++) {
			if (i == 0) this.DrawOrder.push(this.Entities[i]);
			if (i == 1) {
				if (this.DrawOrder[0].Position.y > this.Entities[i].Position.y) {
					this.DrawOrder.splice(0, 0,this.Entities[i]);
				} else {
					this.DrawOrder.push(this.Entities[i]);
				}
			} else {
				for (let j = 0; j < this.DrawOrder.length; j++) {
					if (j == 0 && this.DrawOrder[j].Position.y > this.Entities[i].Position.y) {
						this.DrawOrder.splice(j, 0, this.Entities[i]);
						break;
					}
					if (this.DrawOrder[j].Position.y < this.Entities[i].Position.y) {
						if ((j + 1) >= this.DrawOrder.length) {
							this.DrawOrder.push(this.Entities[i]);
							break;
						}
						if ((j + 1) < this.DrawOrder.length) {
							if (this.DrawOrder[j + 1].Position.y > this.Entities[i].Position.y) {
								this.DrawOrder.splice(j + 1, 0, this.Entities[i]);
								break;
							}
						}
					}
				}
			}
		}
	}
	draw() { // This finally draws the entities on the canvas in the right order
		this.DrawOrder.forEach(d => d.draw());
		this.DrawOrder.splice(0);
		game.scene.ui.draw();
	}
}