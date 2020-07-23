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
            opacity: pixel[3] / 255
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
  icon: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHN0eWxlPSJmaWxsOm5vbmUiLz48cGF0aCBkPSJNMjkuMzIsMTAu
  NjhjLTEuNjYtMS42Ni00LjA2LTEtNS41Ni41YTExLjg5LDExLjg5LDAsMCwwLTEuNjYsMi4zMUwyMiwxMy40MWExLjg5LDEuODksMCwwLDAtMi42NiwwbC0uOS45YTEuODksMS44OSwwLDAsMC0uMjIsMi4zOWwtNi4wOSw2LjA5YTIuNzUsMi43NSwwLDAsMC0uNzMs
  MS4yOGwtLjgxLDMuMjYtLjU2LjU2YTEuMTYsMS4xNiwwLDAsMCwwLDEuNjVsLjQxLjQxYTEuMTcsMS4xNywwLDAsMCwxLjY1LDBsLjU2LS41NiwzLjI2LS44MWEyLjc1LDIuNzUsMCwwLDAsMS4yOC0uNzNsNi4xNC02LjE0YTEuODcsMS44NywwLDAsMCwuODQuMjEs
  MS44MywxLjgzLDAsMCwwLDEuMzMtLjU1bC45LS45YTEuODcsMS44NywwLDAsMCwuMDgtMi41NywxMS41NCwxMS41NCwwLDAsMCwyLjMyLTEuNjZDMzAuMzIsMTQuNzQsMzEsMTIuMzUsMjkuMzIsMTAuNjhaTTE2LjE1LDI2Ljc5YTEuMjEsMS4yMSwwLDAsMS0uNTgu
  MzNMMTIsMjhsLjktMy41OWExLjIxLDEuMjEsMCwwLDEsLjMzLS41OGw2LjA3LTYuMDcsMi45NCwyLjk0Wm05LjIxLTcuMzgtLjkuOWMtLjE5LjItLjM0LjItLjU0LDBsLTQuNC00LjRhLjQuNCwwLDAsMSwwLS41NGwuOS0uOWEuNDMuNDMsMCwwLDEsLjI3LS4xMS4z
  OS4zOSwwLDAsMSwuMjcuMTFsNC40LDQuNEEuMzguMzgsMCwwLDEsMjUuMzYsMTkuNDFabTMuMzgtNS45M2EzLjcsMy43LDAsMCwxLTEsMS43LDExLjY3LDExLjY3LDAsMCwxLTIuMzUsMS42MkwyMy4yLDE0LjU5YTExLjY3LDExLjY3LDAsMCwxLDEuNjItMi4zNSwz
  LjcsMy43LDAsMCwxLDEuNy0xLDEuODMsMS44MywwLDAsMSwyLjIyLDIuMjJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+`
}
