_TOOL_DATA_ = {
    name: 'Paintbrush',
    type: class {
        constructor(getParameters) {
            this.width = 15;
            this.mousePos = null;
            this.getParameters = getParameters;
        }
        paint(pointerInfo) {
            const { getMouseCoordinates, metadata, updatePainting, BABYLON } = this.getParameters();
            let { x, y } = getMouseCoordinates(pointerInfo);
            if (metadata.select.x1 != -1) {
                x -= metadata.select.x1;
                y -= metadata.select.y1;
            }
            if (this.mousePos == null) {
                this.mousePos = new BABYLON.Vector2(x, y);
            }
            const { ctx } = this;
            let xx = this.mousePos.x;
            let yy = this.mousePos.y;
            let stepCount = 0;
            const distance = this.width / 4;
            const step = new BABYLON.Vector2(x - this.mousePos.x, y - this.mousePos.y).normalize().multiplyByFloats(distance, distance);
            const numSteps = new BABYLON.Vector2(x - this.mousePos.x, y - this.mousePos.y).length() / distance;
            while (stepCount < numSteps) {
                ctx.globalAlpha = 1.0;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.drawImage(this.circleCanvas, Math.floor(xx - this.width / 2), Math.floor(yy - this.width / 2));
                ctx.globalAlpha = metadata.alpha;
                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(this.circleCanvas, Math.floor(xx - this.width / 2), Math.floor(yy - this.width / 2));
                xx += step.x;
                yy += step.y;
                stepCount++;
                if (numSteps - stepCount < 1) {
                    xx = x;
                    yy = y;
                }
            }
            updatePainting();
            this.mousePos = new BABYLON.Vector2(x, y);
        }
        setBrushWidth(width) {
            this.width = width;
            this.GUI.widthLabel.text = `Brush Width: ${this.width}`;
        }
        setup() {
            const { scene, GUI, BABYLON } = this.getParameters();
            const widthLabel = new BABYLON.TextBlock();
            widthLabel.color = 'white';
            widthLabel.heightInPixels = 20;
            widthLabel.style = GUI.style;
            GUI.toolWindow.addControl(widthLabel);
            const widthSlider = new BABYLON.Slider();
            widthSlider.heightInPixels = 20;
            widthSlider.value = this.width;
            widthSlider.minimum = 1;
            widthSlider.maximum = 100;
            widthSlider.step = 1;
            widthSlider.isThumbCircle = true;
            widthSlider.background = '#a3a3a3';
            widthSlider.color = '#33648f';
            widthSlider.borderColor = '#33648f';
            widthSlider.onValueChangedObservable.add(value => this.setBrushWidth(value));
            GUI.toolWindow.addControl(widthSlider);
            this.GUI = { widthLabel, widthSlider };
            this.setBrushWidth(this.width);
            this.pointerObserver = scene.onPointerObservable.add((pointerInfo) => {
                const { startPainting, stopPainting, metadata, BABYLON } = this.getParameters();
                if (pointerInfo.pickInfo && pointerInfo.pickInfo.hit) {
                    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
                        if (pointerInfo.event.button == 0) {
                            this.isPainting = true;
                            const circleCanvas = document.createElement('canvas');
                            circleCanvas.width = this.width;
                            circleCanvas.height = this.width;
                            const circleCtx = circleCanvas.getContext('2d');
                            circleCtx.imageSmoothingEnabled = false;
                            let pixels = new Array(4 * this.width * this.width);
                            const dis = this.width * this.width / 4;
                            const rgb = BABYLON.Color3.FromHexString(metadata.color);
                            const r = Math.floor(rgb.r * 255);
                            const g = Math.floor(rgb.g * 255);
                            const b = Math.floor(rgb.b * 255);
                            let idx = 0;
                            for (let y = -Math.ceil(this.width / 2); y < Math.floor(this.width / 2); y++) {
                                for (let x = -Math.ceil(this.width / 2); x < Math.floor(this.width / 2); x++) {
                                    pixels[idx++] = r;
                                    pixels[idx++] = g;
                                    pixels[idx++] = b;
                                    pixels[idx++] = (x * x + y * y <= dis) ? 255 : 0;
                                }
                            }
                            circleCtx.putImageData(new ImageData(Uint8ClampedArray.from(pixels), this.width, this.width), 0, 0);
                            this.circleCanvas = circleCanvas;
                            this.ctx = startPainting();
                            this.paint(pointerInfo);
                        }
                    }
                    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE && this.isPainting) {
                        this.paint(pointerInfo);
                    }
                }
                if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERUP) {
                    if (pointerInfo.event.button == 0) {
                        this.isPainting = false;
                        this.circleCanvas.parentNode.removeChild(this.circleCanvas);
                        stopPainting();
                        this.mousePos = null;
                    }
                }
            });
            this.isPainting = false;
        }
        cleanup() {
            Object.entries(this.GUI).forEach(([key, value]) => value.dispose());
            this.isPainting = false;
            if (this.pointerObserver) {
                this.getParameters().scene.onPointerObservable.remove(this.pointerObserver);
            }
        }
    },
    usesWindow: true,
    icon: `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHN0eWxlPSJmaWxsOm5vbmUiLz48cGF0aCBkPSJNMjksMTFhMy41NywzLjU3LDAsMCwxLDAsNS4wNkwxNywyOGEyLjM0LDIuMzQsMCwwLDEtMSwuNThMMTAuOTEsMzBhLjc1Ljc1LDAsMCwxLS45Mi0uOTJMMTEuMzgsMjRBMi4zNCwyLjM0LDAsMCwxLDEyLDIzbDEyLTEyQTMuNTcsMy41NywwLDAsMSwyOSwxMVpNMjMsMTQuMSwxMywyNGEuNjkuNjksMCwwLDAtLjE5LjMzbC0xLjA1LDMuODUsMy44NS0xQS42OS42OSwwLDAsMCwxNiwyN0wyNS45LDE3Wm0yLTItMSwxTDI3LDE2bDEtMUEyLjA4LDIuMDgsMCwxLDAsMjUsMTIuMDdaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+`
};
