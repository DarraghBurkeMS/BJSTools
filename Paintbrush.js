_TOOL_DATA = {
  name: 'Paintbrush',
  type: class {
      constructor(getParameters) {
          this.radius = 15;
          this.getParameters = getParameters;
          this.GUI = {};
      }
      paint(pointerInfo) {
          const { canvas2D, getMouseCoordinates, metadata, updateTexture } = this.getParameters();
          const ctx = canvas2D.getContext('2d');
          const { x, y } = getMouseCoordinates(pointerInfo);
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = metadata.color;
          ctx.globalAlpha = metadata.opacity;
          ctx.lineWidth = this.radius;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineTo(x, y);
          ctx.stroke();
          updateTexture();
      }
      setup() {
          const { scene, getMouseCoordinates, GUI, canvas2D } = this.getParameters();
          // const radiusLabel = new BABYLON.GUI.TextBlock();
          // radiusLabel.text = `Brush Width: ${this.radius}`;
          // radiusLabel.color = 'white';
          // radiusLabel.height = '20px';
          // radiusLabel.style = GUI.style;
          // GUI.toolWindow.addControl(radiusLabel);
          // const radiusSlider = new BABYLON.GUI.Slider();
          // radiusSlider.height = '20px';
          // radiusSlider.value = this.radius;
          // radiusSlider.minimum = 1;
          // radiusSlider.maximum = 100;
          // radiusSlider.step = 1;
          // radiusSlider.isThumbCircle = true;
          // radiusSlider.background = '#a3a3a3';
          // radiusSlider.color = '#33648f';
          // radiusSlider.borderColor = '#33648f';
          // radiusSlider.onValueChangedObservable.add(value => {
          //     this.radius = value;
          //     this.GUI.radiusLabel.text = `Brush Width: ${this.radius}`;
          // });
          // GUI.toolWindow.addControl(radiusSlider);
          // this.GUI = { radiusLabel, radiusSlider };
          this.pointerObservable = scene.onPointerObservable.add((pointerInfo) => {
              if (pointerInfo.pickInfo.hit) {
                  if (pointerInfo.type === this.getParameters().BABYLON.PointerEventTypes.POINTERDOWN) {
                      if (pointerInfo.event.button == 0) {
                          this.isPainting = true;
                          const { x, y } = getMouseCoordinates(pointerInfo);
                          const ctx = canvas2D.getContext('2d');
                          ctx.beginPath();
                          ctx.moveTo(x, y);
                      }
                  }
                  if (pointerInfo.type === this.getParameters().BABYLON.PointerEventTypes.POINTERMOVE && this.isPainting) {
                      this.paint(pointerInfo);
                  }
              }
              if (pointerInfo.type === this.getParameters().BABYLON.PointerEventTypes.POINTERUP) {
                  if (pointerInfo.event.button == 0) {
                      this.isPainting = false;
                  }
              }
          });
          this.isPainting = false;
      }
      cleanup() {
          Object.entries(this.GUI).forEach(([key, value]) => value.dispose());
          this.isPainting = false;
          if (this.pointerObservable) {
              this.getParameters().scene.onPointerObservable.remove(this.pointerObservable);
          }
      }
  },
  usesWindow: true,
  icon: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHN0eWxlPSJmaWxsOm5vbmUiLz48cGF0aCBkPSJNMjksMTFhMy41
  NywzLjU3LDAsMCwxLDAsNS4wNkwxNywyOGEyLjM0LDIuMzQsMCwwLDEtMSwuNThMMTAuOTEsMzBhLjc1Ljc1LDAsMCwxLS45Mi0uOTJMMTEuMzgsMjRBMi4zNCwyLjM0LDAsMCwxLDEyLDIzbDEyLTEyQTMuNTcsMy41NywwLDAsMSwyOSwxMVpNMjMsMTQuMSwxMywy
  NGEuNjkuNjksMCwwLDAtLjE5LjMzbC0xLjA1LDMuODUsMy44NS0xQS42OS42OSwwLDAsMCwxNiwyN0wyNS45LDE3Wm0yLTItMSwxTDI3LDE2bDEtMUEyLjA4LDIuMDgsMCwxLDAsMjUsMTIuMDdaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+`
};

