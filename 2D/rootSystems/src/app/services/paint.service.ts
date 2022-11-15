import { Injectable } from '@angular/core';
import Circle from '../logic/maths_objects/Circle';
import Line from '../logic/maths_objects/Line';
import Point from '../logic/maths_objects/Point';
import Polygon from '../logic/maths_objects/Polygon';
import { CanvasService } from './canvas.service';
import { CoordinateSystemService } from './coordinate-system.service';

export enum PaintLayer{
  default,
  layer0,
  layer1,
  layer2,
  layer3,
  layer4
}


@Injectable({
  providedIn: 'root'
})
export class PaintService {

  constructor(
    private canvas: CanvasService,
    private coord: CoordinateSystemService) {}
  paintLine(line: Line, layer: PaintLayer = PaintLayer.layer2){
    const start = this.coord.convertToPaintCoordinates(line.start);
    const end = this.coord.convertToPaintCoordinates(line.end);
    return this.canvas.getPaintLayer(layer)
    .line(start.x, start.y, end.x, end.y)
    .stroke({ width: line.width, color: line.color, dasharray: line.dashed ? line.dashString: ""})
  }
  paintCircle(circle: Circle, layer: PaintLayer = PaintLayer.layer2){
    const paintCoordinates = this.coord.convertToPaintCoordinates(circle.center);
    return this.canvas.getPaintLayer(layer)
    .circle(circle.radius*2)
    .move(paintCoordinates.x- circle.radius, paintCoordinates.y-circle.radius)
    .attr({ fill: circle.color })
  }
  paintPolygon(polygon: Polygon, layer: PaintLayer = PaintLayer.layer2){
      const pointsOnViewport: Array<Point> = [];
      for(let point of polygon.points){
          pointsOnViewport.push(this.coord.convertToPaintCoordinates(point));
      }
      let pointString = "";
      pointsOnViewport.forEach((point) => {pointString += `${point.x},${point.y} `});
      return this.canvas.getPaintLayer(layer).polygon(pointString).fill({color: polygon.color});
  }
}
