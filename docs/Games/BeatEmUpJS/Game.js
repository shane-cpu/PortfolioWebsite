
class Game {
	constructor() {
		this.time = { // handles time
			dt:0,
			prev:0,
			now:0,
			calcdt(now) { // handles deltaTime calculations
				this.dt = (now - this.prev)/1000;
				this.now = this.prev = now;
			}
		}

		this.view = { // vars for canvas
			canvas:null,
			gfx:null
		}

		this.scene = new ScenePlay(); // this is the current scene you're playing in
	}
	
	tick(now) { // This is the gameloop

		// calculating the change in time
		this.time.calcdt(now);

		// update game scene objects
		if(this.scene) this.scene.update();

		// draw basic Background
		this.view.gfx.fillStyle = '#888';
		this.view.gfx.fillRect(0,0,this.view.canvas.width, this.view.canvas.height);
		// draw other objects in the current scene
		if (this.scene) this.scene.draw();
		

		// update the keys being pressed
		keyboard.update();
		// call next frame
		requestAnimationFrame((time) => { // This calls the gameloop when the next frame is ready
			this.tick(time);
		});
	}

	start(id) { // this is the start of the gameloop
		// get reference to canvas to draw on
		this.view.canvas = document.getElementById(id);
		if (!this.view.canvas) return; // checks if it's there
		// get reference to graphics context
		this.view.gfx = this.view.canvas.getContext('2d'); 
		if (!this.view.gfx) return;
		// calls gameloop
		this.tick(0);
	}
}