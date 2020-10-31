
class Scene {
	constructor() {
		// Set up scene basic attrobutes
		this.scene = new THREE.Scene(); // the scene itself
		this.scene.background = new THREE.Color('cyan');
		this.renderer = new THREE.WebGLRenderer(); // selecting the WebGLRenderer to render the 3D objects
		this.renderer.setSize(800, 600); // setting the size of the rendered window
		document.body.appendChild(this.renderer.domElement); // put the window in the html document

		this.planeGeo = new THREE.PlaneGeometry(40, 40, 1, 1);
		this.planeMat = new THREE.MeshPhongMaterial( {color: 0x999999} );
		this.plane = new THREE.Mesh(this.planeGeo, this.planeMat);
		this.plane.position.y = -20;
		this.plane.rotation.x = 270 * Math.PI/180;
		this.addToScene(this.plane);

		this.light = new THREE.DirectionalLight(0xffffff, 1.25);
		this.addToScene(this.light);
		this.light.castShadow = true;
		this.light.position.y = 50;
		this.camera = new Camera(new Vector3(50, 0, 50), new Vector3(0, 0, 0), this);

		this.flock = new flock();
		for (let i = 0; i < 30; i++) {
			this.flock.addBoid(new Boid3D(new Vector3(randomRange(-20, 20), randomRange(-20, 20), randomRange(-20, 20)), new Vector3(randomRange(-1, 1), randomRange(-1, 1), randomRange(-1, 1)), this));
		}
	}
	addToScene(Thing) {
		this.scene.add(Thing);
	}
	tick() {
		this.camera.tick();
		this.flock.run();
	}
	render() {
		// Render changes in scene
		this.renderer.render(this.scene, this.camera.actualCamera);
	}
}

function randomRange(min, max) {
	return (Math.random() * (max - min)) + min;
}