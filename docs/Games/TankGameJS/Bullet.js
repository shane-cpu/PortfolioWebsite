
class Bullet {
	constructor(position, MoveVector, scene) {
		this.scene = scene;

		this.bulletGeo = new THREE.SphereGeometry(.2, 8, 8);
		this.bulletMat = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
		this.bullet = new THREE.Mesh(this.bulletGeo, this.bulletMat);
		scene.AddToScene(this.bullet);
		this. AABB = new THREE.Sphere();
		this.bullet.position.x = position.x;
		this.bullet.position.y = position.y;
		this.bullet.position.z = position.z;

		this.bullet.geometry.computeBoundingSphere();

		this.Velocity = { x:MoveVector.x, y:MoveVector.y, z:MoveVector.z };
		this.counter = 1;

		this.isDead = false;
	}
	update(ground, enemies) {
		this.AABB.copy( this.bullet.geometry.boundingSphere ).applyMatrix4( this.bullet.matrixWorld );

		if (this.AABB.intersectsBox(ground.AABB) && this.counter == 1) {
			this.bulletGeo.scale(10,10,10);
			this.counter++;
		}
		enemies.forEach((e) => {
			if (this.AABB.intersectsBox(e.AABB) && this.counter == 1) {
				this.bulletGeo.scale(10,10,10);
				this.counter++;
				e.isDead = true;
			}
		});
		if (this.counter == 1) {
			this.Velocity.y -= 0.005;

			this.bullet.position.x += this.Velocity.x * 2;
			this.bullet.position.y += this.Velocity.y;
			this.bullet.position.z += this.Velocity.z * 2;
		} else {
			this.counter++;
		}
		if (this.counter >= 30) {
			this.bulletGeo.dispose();
			this.bulletMat.dispose();
			this.scene.scene.remove(this.bullet);
			this.isDead = true;
		}
	}
}