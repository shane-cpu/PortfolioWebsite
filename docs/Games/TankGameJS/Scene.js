
class Scene {
	constructor() {
		// Set up scene basic attrobutes
		this.scene = new THREE.Scene(); // the scene itself
		this.scene.background = new THREE.Color('cyan');
		this.renderer = new THREE.WebGLRenderer(); // selecting the WebGLRenderer to render the 3D objects
		this.renderer.setSize(800, 600); // setting the size of the rendered window

		let gameHolder = document.getElementById("gameHolder")
		
		gameHolder.appendChild(this.renderer.domElement); // put the window in the html document

		this.spawnCounter = 0;

		this.CreateLevel();
	}
	tick() {
		// Update things in scene
		this.player.update(this.ground);
		this.bullets.forEach((b) => { b.update(this.ground, this.enemies); });
		this.enemies.forEach((e) => { e.update(this.ground, this.bullets); });
		let i = 0;
		while (i < this.bullets.length) {
			if (this.bullets[i].isDead) {
				this.bullets.splice(i, 1);
				break;
			}
			i++;
		}
		i = 0;
		while (i < this.enemies.length) {
			if (this.enemies[i].isDead) {
				this.enemies.splice(i, 1);
				break;
			}
			i++;
		}
		if (this.spawnCounter > 500) {
			this.SpawnEnemies(12);
			this.spawnCounter = 0;
		}
		this.spawnCounter++;
		this.camera.update(this.player);
		this.ground.tick();
	}
	render() {
		// Render changes in scene
		this.renderer.render(this.scene, this.camera.actualCamera);
	}
	AddToScene(Thing) {
		this.scene.add(Thing);
	}
	CreateLevel() {
		this.camera = new Camera({x:5, y:5, z:5}, {x:0, y:0, z:0}, this); // a perspective camera
		this.light = new THREE.AmbientLight(0xffffff, .5);
		this.AddToScene(this.light);
		this.light2 = new THREE.DirectionalLight(0xffffff, .4);
		this.AddToScene(this.light2);

		this.player = new Player({x:0, y:1, z:0, w:1, h:1, d:1}, this); // new player instance
		this.ground = new Ground(0, -1, 0, 100, 1, 100, 0xffffff, this); // the ground
		this.bullets = [];

		this.Points();

		////////////////////////// Enemy Spawning
		this.enemies = [];
		this.SpawnEnemies(12);
	}
	Box(x, y, z, w, h, d, Color) {
		let boxPos = new THREE.BoxGeometry(w, h, d);
		let boxMat = new THREE.MeshPhongMaterial({color: Color});
		let box = new THREE.Mesh(boxPos, boxMat);
		this.AddToScene(box);
		box.position.x = x;
		box.position.y = y;
		box.position.z = z;
		return box;
	}
	SpawnEnemies(Enemies) {
		for (let i = 0; i < Enemies; i++) {
			let e = new Enemy(this);
			this.enemies.push(e);
			switch(i) {
				case 0:
					e.enemy.position.x = this.point1.x;
					e.enemy.position.y = this.point1.y;
					e.enemy.position.z = this.point1.z;
					e.target = this.Mpoint3;
					break;
				case 1:
					e.enemy.position.x = this.point2.x;
					e.enemy.position.y = this.point2.y;
					e.enemy.position.z = this.point2.z;
					e.target = this.Mpoint3;
					break;
				case 2:
					e.enemy.position.x = this.point3.x;
					e.enemy.position.y = this.point3.y;
					e.enemy.position.z = this.point3.z;
					e.target = this.Mpoint3;
					break;
				case 3:
					e.enemy.position.x = this.point4.x;
					e.enemy.position.y = this.point4.y;
					e.enemy.position.z = this.point4.z;
					e.target = this.Mpoint4;
					break;
				case 4:
					e.enemy.position.x = this.point5.x;
					e.enemy.position.y = this.point5.y;
					e.enemy.position.z = this.point5.z;
					e.target = this.Mpoint4;
					break;
				case 5:
					e.enemy.position.x = this.point6.x;
					e.enemy.position.y = this.point6.y;
					e.enemy.position.z = this.point6.z;
					e.target = this.Mpoint4;
					break;
				case 6:
					e.enemy.position.x = this.point7.x;
					e.enemy.position.y = this.point7.y;
					e.enemy.position.z = this.point7.z;
					e.target = this.Mpoint1;
					break;
				case 7:
					e.enemy.position.x = this.point8.x;
					e.enemy.position.y = this.point8.y;
					e.enemy.position.z = this.point8.z;
					e.target = this.Mpoint1;
					break;
				case 8:
					e.enemy.position.x = this.point9.x;
					e.enemy.position.y = this.point9.y;
					e.enemy.position.z = this.point9.z;
					e.target = this.Mpoint1;
					break;
				case 9:
					e.enemy.position.x = this.point10.x;
					e.enemy.position.y = this.point10.y;
					e.enemy.position.z = this.point10.z;
					e.target = this.Mpoint2;
					break;
				case 10:
					e.enemy.position.x = this.point11.x;
					e.enemy.position.y = this.point11.y;
					e.enemy.position.z = this.point11.z;
					e.target = this.Mpoint2;
					break;
				case 11:
					e.enemy.position.x = this.point12.x;
					e.enemy.position.y = this.point12.y;
					e.enemy.position.z = this.point12.z;
					e.target = this.Mpoint2;
					break;
			}
		}
	}
	Points() {
		this.point1 = {x: 45, y: 1, z: 25};
		this.point2 = {x: 45, y: 1, z: 0};
		this.point3 = {x: 45, y: 1, z: -25};
		this.point4 = {x: -45, y: 1, z: 25};
		this.point5 = {x: -45, y: 1, z: 0};
		this.point6 = {x: -45, y: 1, z: -25};
		this.point7 = {x: 25, y: 1, z: 45};
		this.point8 = {x: 0, y: 1, z: 45};
		this.point9 = {x: -25, y: 1, z: 45};
		this.point10 = {x: 25, y: 1, z: -45};
		this.point11 = {x: 0, y: 1, z: -45};
		this.point12 = {x: -25, y: 1, z: -45};

		this.Mpoint1 = {x: 0, y: 1, z: 35};
		this.Mpoint2 = {x: 0, y: 1, z: -35};
		this.Mpoint3 = {x: 35, y: 1, z: 0};
		this.Mpoint4 = {x: -35, y: 1, z: 0};
	}
}

class Ground {
	constructor(x, y, z, w, h, d, Color, scene) {
		this.box = scene.Box(x, y, z, w, h, d, Color);
		this.AABB = new THREE.Box3();
		this.box.geometry.computeBoundingBox();
	}
	tick() {
		this.AABB.copy( this.box.geometry.boundingBox ).applyMatrix4( this.box.matrixWorld );
	}
}