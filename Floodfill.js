let tool;
tool = {
  name: "Floodfill",
  type: class {
    constructor(scene, canvas2D, size, update) {
      this.scene = scene;
      this.canvas2D = canvas2D;
      this.size = size;
      this.update = update;
    }
    setup () {
      this.pointerObservable = this.scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.pickInfo.hit && pointerInfo.type == 0x01) {
          const ctx = this.canvas2D.getContext('2d');
          ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
          ctx.fillRect(0,0, this.size.width, this.size.height);
          this.update();
        }
      });
    }
    cleanup () {
      if (this.pointerObservable) {
        this.scene.onPointerObservable.remove(this.pointerObservable);
      }
    }
  }
}
