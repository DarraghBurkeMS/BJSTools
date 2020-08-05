_TOOL_DATA_ = {
    name: 'Paintbrush',
    type: class {
        constructor(getParameters) {
            this.GUI = {};
            this.radius = 15;
            this.getParameters = getParameters;
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
            const { scene, getMouseCoordinates, GUI, canvas2D, BABYLON } = this.getParameters();
            this.GUI.radiusLabel = new BABYLON.GUI.TextBlock();
            this.GUI.radiusLabel.text = `Brush Width: ${this.radius}`;
            this.GUI.radiusLabel.color = 'white';
            this.GUI.radiusLabel.height = '20px';
            this.GUI.radiusLabel.style = GUI.style;
            GUI.toolWindow.addControl(this.GUI.radiusLabel);
            this.GUI.radiusSlider = new BABYLON.GUI.Slider();
            this.GUI.radiusSlider.height = '20px';
            this.GUI.radiusSlider.value = this.radius;
            this.GUI.radiusSlider.minimum = 1;
            this.GUI.radiusSlider.maximum = 100;
            this.GUI.radiusSlider.step = 1;
            this.GUI.radiusSlider.isThumbCircle = true;
            this.GUI.radiusSlider.background = '#a3a3a3';
            this.GUI.radiusSlider.color = '#33648f';
            this.GUI.radiusSlider.borderColor = '#33648f';
            this.GUI.radiusSlider.onValueChangedObservable.add(value => {
                this.radius = value;
                this.GUI.radiusLabel.text = `Brush Width: ${this.radius}`;
            });
            GUI.toolWindow.addControl(this.GUI.radiusSlider);
            this.pointerObservable = scene.onPointerObservable.add((pointerInfo) => {
                var _a;
                if ((_a = pointerInfo.pickInfo) === null || _a === void 0 ? void 0 : _a.hit) {
                    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                        if (pointerInfo.event.button == 0) {
                            this.isPainting = true;
                            const { x, y } = getMouseCoordinates(pointerInfo);
                            const ctx = canvas2D.getContext('2d');
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                        }
                    }
                    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE && this.isPainting) {
                        this.paint(pointerInfo);
                    }
                }
                if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERUP) {
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