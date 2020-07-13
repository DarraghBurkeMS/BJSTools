_TOOL_DATA_ = {
  name: "Eyedropper",
  type: class {
    constructor(parameters) {
      this.parameters = parameters;
    }
    setup () {
      this.pointerObservable = this.parameters.scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.pickInfo.hit && pointerInfo.type == 0x01) {
          const ctx = this.parameters.canvas2D.getContext('2d');
          const x = pointerInfo.pickInfo.getTextureCoordinates().x * this.parameters.size.width;
          const y = (1 - pointerInfo.pickInfo.getTextureCoordinates().y) * this.parameters.size.height;
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          this.parameters.setMetadata({
            color: "#" + ("000000" + this.rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6),
            opacity: pixel[3]
          });
        }
      });
    }
    cleanup () {
      if (this.pointerObservable) {
        this.parameters.scene.onPointerObservable.remove(this.pointerObservable);
      }
    }
    rgbToHex(r, g, b) {
      return ((r << 16) | (g << 8) | b).toString(16);
    }
  }
}
