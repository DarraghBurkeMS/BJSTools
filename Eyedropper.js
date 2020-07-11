let tool;
tool = {
  name: "Eyedropper",
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
      this.pointerObservable = this.scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.pickInfo.hit && pointerInfo.type == 0x01) {
          const ctx = this.canvas2D.getContext('2d');
          const x = pointerInfo.pickInfo.getTextureCoordinates().x * this.size.width;
          const y = (1 - pointerInfo.pickInfo.getTextureCoordinates().y) * this.size.height;
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          this.setMetadata({
            color: "#" + ("000000" + this.rgbToHex(pixel[0], pixel[1], pixel[2])).slice(-6),
            opacity: pixel[3]
          });
        }
      });
    }
    cleanup () {
      if (this.pointerObservable) {
        this.scene.onPointerObservable.remove(this.pointerObservable);
      }
    }
    rgbToHex(r, g, b) {
      return ((r << 16) | (g << 8) | b).toString(16);
    }
  }
}
