_TOOL_DATA_ = {
  name: "Floodfill",
  type: class {
    constructor(parameters) {
      this.parameters = parameters;
    }
    setup () {
      this.pointerObservable = this.parameters.scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.pickInfo.hit && pointerInfo.type == 0x01) {
          const ctx = this.parameters.canvas2D.getContext('2d');
          ctx.fillStyle = this.parameters.getMetadata().color;
          ctx.globalAlpha = this.parameters.getMetadata().opacity;
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillRect(0,0, this.parameters.size.width, this.parameters.size.height);
          this.parameters.updateTexture();
        }
      });
    }
    cleanup () {
      if (this.pointerObservable) {
        this.parameters.scene.onPointerObservable.remove(this.pointerObservable);
      }
    }
  }
}
