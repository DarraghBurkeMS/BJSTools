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
  },
  icon: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+CiAgICA8ZGVmcz4KICAgICAgICA8c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxn
  IGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPgogICAgICAgIDxnIGlkPSJVSSI+CiAgICAgICAgICAgIDxyZWN0IGNsYXNzPSJjbHMtMSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIi8+CiAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTIz
  LDkuM2EyLjY1LDIuNjUsMCwwLDEtLjE5LDEsMi41OCwyLjU4LDAsMCwxLS41Ny44NkwxMiwyMS40NSw3LDIyLjY4bDEuMjQtNC45NEwxOC41Niw3LjQ1YTIuNTQsMi41NCwwLDAsMSwuODUtLjU3LDIuNywyLjcsMCwwLDEsMS0uMiwyLjUyLDIuNTIsMCwwLDEsMSwu
  MjEsMi40OCwyLjQ4LDAsMCwxLC44My41NiwzLDMsMCwwLDEsLjU2LjgzQTIuNTIsMi41MiwwLDAsMSwyMyw5LjNaTTkuNTgsMTcuODRhMy40NiwzLjQ2LDAsMCwxLDEuNDIuODcsMy41NiwzLjU2LDAsMCwxLC44OCwxLjQzbDguNDQtOC40NkwxOCw5LjM5Wk04LjQx
  LDIxLjMxLDExLDIwLjY3YTIuNjQsMi42NCwwLDAsMC0uMjUtLjY4LDIuMjUsMi4yNSwwLDAsMC0uNDMtLjU3QTIuNjcsMi42NywwLDAsMCw5LjczLDE5YTIuNjQsMi42NCwwLDAsMC0uNjgtLjI1Wk0yMSwxMWwuMzgtLjM3YTIuNzQsMi43NCwwLDAsMCwuMzItLjM2
  QTEuNzgsMS43OCwwLDAsMCwyMiw5LjgzYTEuNzIsMS43MiwwLDAsMCwwLTEuMTUsMS43OCwxLjc4LDAsMCwwLS4zNS0uNTFBMiwyLDAsMCwwLDIxLDcuODFhMS44MSwxLjgxLDAsMCwwLS42My0uMTMsMS42MiwxLjYyLDAsMCwwLS41Mi4wOCwxLjUzLDEuNTMsMCww
  LDAtLjQxLjIzLDIuODMsMi44MywwLDAsMC0uMzcuMzJsLS4zNy4zN1oiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==`
}
