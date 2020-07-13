let tool;
tool = {
  name: "Paintbrush",
  type: class {
    constructor(parameters) {
      this.parameters = parameters;
    }
    setup () {
      this.isPainting = false;
      this.pointerObservable = this.parameters.scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case 0x01: // MOUSEDOWN
            if (pointerInfo.event.button == 0) {
              this.isPainting = true;
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
                const ctx = this.parameters.canvas2D.getContext('2d');
                const x = pointerInfo.pickInfo.getTextureCoordinates().x * this.parameters.size.width;
                const y = (1 - pointerInfo.pickInfo.getTextureCoordinates().y) * this.parameters.size.height;
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = this.parameters.getMetadata().color;
                ctx.globalAlpha = this.parameters.getMetadata().opacity;
                ctx.beginPath();
                ctx.ellipse(x, y, 15, 15, 0, 0, Math.PI * 2);
                ctx.fill();
                this.parameters.updateTexture();
              }
            }
            break;
        }
      });
    }
    cleanup () {
      this.isPainting = false;
      if (this.pointerObservable) {
        this.parameters.scene.onPointerObservable.remove(this.pointerObservable);
      }
    }
  }
}
