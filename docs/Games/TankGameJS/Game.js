
class Game {
	constructor(Scene) {
		// Current Scene
		this.scene = Scene;

		this.time = {
			dt:0,
			prev:0,
			now:0,
			calcdt(now) { // handles deltaTime calculations
				this.dt = (now - this.prev)/1000;
				this.now = this.prev = now;
			}
		}
	}
	tick(now) {

		this.time.calcdt(now);
		// Next frame of animation
		requestAnimationFrame((time) => {
			this.tick(time);
		});
		// Update the scene
		this.scene.tick();
		// Render the scene
		this.scene.render();
		
	}
	sceneChange(Scene) {
		this.scene = Scene;
	}
}
// New instance of the game, Createing a new scene
const game = new Game(new Scene());
// Update that starts more updates
game.tick();