let tool;
tool = {
  name: "Paintbrush",
  type: class {
    constructor(scene, canvas2D, size, update, getMetadata, setMetadata) {
      this.scene = scene;
      this.canvas2D = canvas2D;
      this.size = size;
      this.update = update;
      this.getMetadata = getMetadata;
      this.setMetadata = setMetadata;
    }
    setup () {
      this.isPainting = false;
      this.pointerObservable = this.scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case 0x01: // MOUSEDOWN
            if (pointerInfo.event.button == 0) {
              this.isPainting = true;
              // this.paintColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            }
            break;
          case 0x02: // MOUSEUP
            if (pointerInfo.event.button == 0) {
              this.isPainting = false;
            }
            break;
          case 0x04: // MOUSEMOVE
            if (this.isPainting) {
              if (pointerInfo.pickInfo.hit) {
                const ctx = this.canvas2D.getContext('2d');
                const x = pointerInfo.pickInfo.getTextureCoordinates().x * this.size.width;
                const y = (1 - pointerInfo.pickInfo.getTextureCoordinates().y) * this.size.height;
                ctx.fillStyle = this.getMetadata().color;
                ctx.globalAlpha = this.getMetadata().opacity;
                ctx.beginPath();
                ctx.ellipse(x, y, 15, 15, 0, 0, Math.PI * 2);
                ctx.fill();
                this.update();
              }
            }
            break;
        }
      });
    }
    cleanup () {
      this.isPainting = false;
      if (this.pointerObservable) {
        this.scene.onPointerObservable.remove(this.pointerObservable);
      }
    }
  }
}
