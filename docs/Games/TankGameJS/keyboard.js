const keys = {

	// constant keys
	w:87,
	a:65,
	s:83,
	d:68,
	j:74,
	spacebar:32,
	left:37,
	up:38,
	right:39,
	down:40,
};

const mapping = { // Constant inputs
	right() {return [keys.d, keys.right];},
	left() {return [keys.a, keys.left];},
	up() {return [keys.w, keys.up];},
	down() {return [keys.s, keys.down];},
	jump() {return keys.spacebar;},
	shoot() {return keys.j;},
}

const keyboard = { // This takes care of all the inputs of the game
	keys:[],
	prev:[],
	isDown(keyCode) {
		// this will tell the game if a key is down
		if (Array.isArray(keyCode)) {

			let val = false;

			keyCode.forEach(k => {
				if(this.keys[k]) val = true;
			});
			return val
		}
		return this.keys[keyCode];
	},
	onDown(keyCode) {
		// this will check if the key has been pressed before
		if (Array.isArray(keyCode)) {
			let val = false;
			keyCode.forEach(k => {
				if (this.keys[k] && !this.prev[k]) val = true;
			});
			return val;
		}

		return this.keys[keyCode] && !this.prev[keyCode];
	},
	update() {
		// copy entire array
		this.prev = this.keys.slice(0);
	},
	updateKey(e, val) {
		// tells the game if the key is pressed or not
		this.keys[e.keyCode] = val;
	},
	setup() { // Checks for the keys being pressed an handles the inputs
		document.addEventListener('keydown', (e) => {
			this.updateKey(e, true);
		});
		document.addEventListener('keyup', (e) => {
			this.updateKey(e, false);
		});
	},
}

keyboard.setup(); // Sets up the keyboard