
class Camera {
	constructor(me, player, scene) {
		this.actualCamera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000); // creating the camera in 3D space
		scene.AddToScene(this.actualCamera);
	}
	update(player) {
		if (player == null) return;
		this.actualCamera.position.x = player.player.position.x - player.Forward.x * 20;
		this.actualCamera.position.y = player.player.position.y + 3;
		this.actualCamera.position.z = player.player.position.z - player.Forward.z * 20;
		this.actualCamera.lookAt(player.player.position);
	}
}