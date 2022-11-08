import { Injectable } from '@angular/core';
import Line from 'src/app/logic/maths_objects/Line';
import Point from 'src/app/logic/maths_objects/Point';
import { CanvasService } from 'src/app/services/canvas.service';
import { CoordinateSystemService } from 'src/app/services/coordinate-system.service';
import { PaintLayer, PaintService } from 'src/app/services/paint.service';
import {Colors} from 'src/app/display/values/colors';

import Painter from './Painter.interface';
import Circle from 'src/app/logic/maths_objects/Circle';

@Injectable({
  providedIn: 'root',
})
export default class GridPainter implements Painter {
  linesBetweenUnit: number = 4;
  paintLayer: PaintLayer = PaintLayer.default;
  constructor(
    private c: CanvasService,
    private p: PaintService,
    private coord: CoordinateSystemService
  ) {}

  paint(layer: PaintLayer) {
    this.paintHorizontalLines();
    this.paintVerticalLines();
    this.paintCoordinateSystem();
    this.paintNullPoint();
    if(layer){
      this.paintLayer = layer;
    }
  }
  paintNullPoint(){
    this.p.paintCircle(new Circle({
        center: new Point(0,0),
        radius: 16,
        color: "#ffffff"
    }),
    PaintLayer.layer4)
  }
  paintHorizontalLines() {
    const dim = this.coord.getCoordinateSystemDimensions();
    const numberOfLines = dim.height * this.linesBetweenUnit;
    const distanceBetweenLines = 1 / this.linesBetweenUnit;

    // Paint lines above the center point
    for (let i = 0; i <= numberOfLines / 2; i++) {
      let yPosition = -distanceBetweenLines * i;
      // Main Line
      if (i % this.linesBetweenUnit === 0) {
        this.paintFullUnitGridLine(-dim.left, yPosition, dim.right, yPosition);
    //  A line between the main lines
      } else {
        this.paintBetweenGridLine(-dim.left, yPosition, dim.right, yPosition);
      }
    }
    // Paint lines below the center point
    for (let i = 0; i <= numberOfLines / 2; i++) {
      let yPosition = distanceBetweenLines * i;
      // A line between the main lines
      if (i % this.linesBetweenUnit === 0) {
        this.paintFullUnitGridLine(-dim.left, yPosition, dim.right, yPosition);
        // Main line
      } else {
        this.paintBetweenGridLine(-dim.left, yPosition, dim.right, yPosition);
      }
    }
  }
  paintVerticalLines() {
    const dim = this.coord.getCoordinateSystemDimensions();
    const numberOfLines = dim.width * this.linesBetweenUnit;
    const distanceBetweenLines = 1 / this.linesBetweenUnit;

    // Paint lines to the left of the center point
    for (let i = 0; i <= numberOfLines / 2; i++) {
      let xPosition = -distanceBetweenLines * i;
      // A line between the main lines
      if (i % this.linesBetweenUnit === 0) {
        this.paintFullUnitGridLine(xPosition, dim.top, xPosition, -dim.bottom);
        // Main line
      } else {
        this.paintBetweenGridLine(xPosition, dim.top, xPosition, -dim.bottom);
      }
    }
    // Paint lines below the center point
    for (let i = 0; i <= numberOfLines / 2; i++) {
      let xPosition = distanceBetweenLines * i;
      // A line between the main lines
      if (i % this.linesBetweenUnit === 0) {
        this.paintFullUnitGridLine(xPosition, dim.top, xPosition, -dim.bottom);
        // Main line
      } else {
        this.paintBetweenGridLine(xPosition, dim.top, xPosition, -dim.bottom);
      }
    }
  }

  paintCoordinateSystem() {
    const dim = this.coord.getCoordinateSystemDimensions();
    // x-Axis
    this.paintLine(
      new Line({
        start: new Point(-dim.left, 0),
        end: new Point(dim.right, 0),
        color: Colors.purple300,
        width: 7,
      }),
    );
    // y-Axis
    this.paintLine(
      new Line({
        start: new Point(0, dim.top),
        end: new Point(0, -dim.bottom),
        color: Colors.purple300,
        width: 7,
      }),
    );
  }
  // Paints the lines that seperate to units
  paintFullUnitGridLine(x0: number, y0: number, x1: number, y1: number) {
    const line = new Line({
      start: new Point(x0, y0),
      end: new Point(x1, y1),
      color: Colors.purple400,
      width: 5,
    });
    this.paintLine(line);
  }
  // Paints the lines inbetween a unit
  paintBetweenGridLine(x0: number, y0: number, x1: number, y1: number) {
    const line = new Line({
      start: new Point(x0, y0),
      end: new Point(x1, y1),
      color: Colors.purple500,
      width: 2,
      dashed: true,
      dashString: '12 12',
    });
    this.paintLine(line);
  }
  paintLine(line: Line) {
    this.p.paintLine(line, this.paintLayer);
  }
}
