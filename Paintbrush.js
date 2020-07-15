_TOOL_DATA_ = {
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
  },
  icon: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHN0eWxlPSJmaWxsOm5vbmUiLz48cGF0aCBkPSJNMjksMTFhMy41
  NywzLjU3LDAsMCwxLDAsNS4wNkwxNywyOGEyLjM0LDIuMzQsMCwwLDEtMSwuNThMMTAuOTEsMzBhLjc1Ljc1LDAsMCwxLS45Mi0uOTJMMTEuMzgsMjRBMi4zNCwyLjM0LDAsMCwxLDEyLDIzbDEyLTEyQTMuNTcsMy41NywwLDAsMSwyOSwxMVpNMjMsMTQuMSwxMywy
  NGEuNjkuNjksMCwwLDAtLjE5LjMzbC0xLjA1LDMuODUsMy44NS0xQS42OS42OSwwLDAsMCwxNiwyN0wyNS45LDE3Wm0yLTItMSwxTDI3LDE2bDEtMUEyLjA4LDIuMDgsMCwxLDAsMjUsMTIuMDdaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+`
}
