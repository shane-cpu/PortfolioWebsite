
class Camera {
	constructor(Loc, Rot, scene) {
		this.Pos = Loc;
		this.Rot = Rot;
		this.dir = 0;

		this.actualCamera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000); // creating the camera in 3D space
		scene.addToScene(this.actualCamera);

		this.newPos = this.Pos.clone();
		this.newPos.x = this.Pos.x * Math.cos(this.dir);
		this.newPos.z = this.Pos.z * Math.sin(this.dir);

		this.actualCamera.position.x = this.newPos.x;
		this.actualCamera.position.y = this.newPos.y;
		this.actualCamera.position.z = this.newPos.z;

		this.actualCamera.lookAt(Rot.x, Rot.y, Rot.z);
	}
	tick() {
		this.dir += .005;

		this.newPos = this.Pos.clone();
		this.newPos.x = this.Pos.x * Math.cos(this.dir);
		this.newPos.z = this.Pos.z * Math.sin(this.dir);

		this.actualCamera.position.x = this.newPos.x;
		this.actualCamera.position.y = this.newPos.y;
		this.actualCamera.position.z = this.newPos.z;

		this.actualCamera.lookAt(this.Rot.x, this.Rot.y, this.Rot.z);
	}
}