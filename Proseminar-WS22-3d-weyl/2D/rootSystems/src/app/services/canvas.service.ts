import { Injectable } from '@angular/core';
import { G, Svg } from '@svgdotjs/svg.js';
import { PaintLayer } from './paint.service';

export class Canvas{
  height: number;
  width: number;
  pixelsInOneUnit: number;
  constructor(d: {height: number, width: number, pixelsInOneUnit: number }){
    this.height = d.height;
    this.width = d.width;
    this.pixelsInOneUnit = d.pixelsInOneUnit;
  }
}


@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  canvas!: Canvas; // Data about the displayed canvas
  paintContainer!: Svg; // Reference to the container where the data will be plotted

  // SVG Groups are used to put certain elements in the foreground and others in the background
  // independently of their drawing time
  paintLayers: Array<Svg> = [];

  initializeCanvas(c: Canvas){
    this.canvas = c;
  }
  initializePaintLayers(layers: Array<Svg>){
    this.paintLayers = layers;
  }
  get height(){
    return this.canvas.height;
  }
  get width(){
    return this.canvas.width;
  }
  get pixelsInOneUnit(){
    return this.canvas.pixelsInOneUnit;
  }
  getPaintLayer(layer: PaintLayer){
    switch(layer){
      case PaintLayer.layer0:
        return this.paintLayers[0];
      case PaintLayer.layer1:
        return this.paintLayers[1];
      case PaintLayer.layer2:
        return this.paintLayers[2];
      case PaintLayer.layer3:
        return this.paintLayers[3];
      case PaintLayer.layer4:
        return this.paintLayers[4];
    }
    // Standard
    return this.paintLayers[2];
  }
}
