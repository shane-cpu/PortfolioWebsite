
class UserInterface {
	constructor(scene, X, Y) {
		this.scene = scene;
		this.health = this.scene.player.HEALTH;
		this.Position = {x:X, y:Y};
		this.ImgOffset = {x:this.Position.x - 58, y:this.Position.y - 58};
	}
	tick() {
		this.health = this.scene.player.HEALTH;
	}
	draw() {
		const gfx = game.view.gfx;
		if (this.health > 10) gfx.drawImage(this.scene.Sprites.HealthSprites[0], this.ImgOffset.x, this.ImgOffset.y);
		else if (this.health <= 10 && this.health > 5) gfx.drawImage(this.scene.Sprites.HealthSprites[1], this.ImgOffset.x, this.ImgOffset.y);
		else if (this.health <= 5 && this.health > 0) gfx.drawImage(this.scene.Sprites.HealthSprites[2], this.ImgOffset.x, this.ImgOffset.y);
		else if (this.health <= 0) gfx.drawImage(this.scene.Sprites.HealthSprites[3], this.ImgOffset.x, this.ImgOffset.y);
	}
}