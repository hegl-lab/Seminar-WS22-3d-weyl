import { Component, OnInit } from '@angular/core';
import S3, { S3Element } from 'src/app/data/groups/S3';
import { RootSystems2D } from 'src/app/data/rootSystems';
import RootSystemPainter from 'src/app/display/painters/RootSystemPainter';
import WeylChamberPainter from 'src/app/display/painters/WeylChamberPainter';
import { Colors } from 'src/app/display/values/colors';
import { RootSystemService } from 'src/app/logic/maths/root-system.service';

@Component({
  selector: 'app-transform-panel',
  templateUrl: './transform-panel.component.html',
  styleUrls: ['./transform-panel.component.sass']
})
export class TransformPanelComponent implements OnInit {
  Colors = Colors;
  S3Element = S3Element;
  currentElement: S3Element = S3Element.e;
  appliedTransformations: Array<S3Element> = [S3Element.e]
  constructor(
    private weylChamberPainter: WeylChamberPainter,
    private rootSystem: RootSystemService
  ) { }

  ngOnInit(): void {
  }
  visible(){
    return this.rootSystem.getType() == RootSystems2D.A2;
  }
  multiplyBy(element: S3Element){
    this.currentElement = S3.multiply(element, this.currentElement);
    this.appliedTransformations = [element, ...this.appliedTransformations];
    this.transformWeylChamber();
  }
  resetTransformation(){
    this.currentElement = S3Element.e;
    this.appliedTransformations = [S3Element.e];
    this.transformWeylChamber();
  }
  async transformWeylChamber(){
    let transformation: {rotate: number, flip: 'x' | 'y' | 'none'} = {
      rotate: 0,
      flip: 'none'
    }
    switch(this.currentElement){
      case S3Element.e:
      break;
      case S3Element.s1:
        transformation.rotate = Math.PI/3
        break;
      case S3Element.s2:
        transformation.rotate = Math.PI
        break;
      case S3Element.s3:
        transformation.rotate = Math.PI*2-Math.PI/3
        break;
      case S3Element.d:
        transformation.rotate = -2*Math.PI/3
        break;
      case S3Element.d2:
        transformation.rotate = -4*Math.PI/3
        break;
    }
    this.weylChamberPainter.transformWeylChamber(transformation)
  }
  getColorToElement(element: S3Element){
    switch(element){
      case S3Element.e:
        return Colors.green
      case S3Element.s1:
        return Colors.red
      case S3Element.s2:
        return Colors.orange
      case S3Element.s3:
        return Colors.yellow
      case S3Element.d:
        return Colors.blue
      case S3Element.d2:
        return Colors.turqouis
    }
  }
  getStringToElement(element: S3Element){
    switch(element){
      case S3Element.e:
        return "E"
      case S3Element.s1:
        return "S1"
      case S3Element.s2:
        return "S2"
      case S3Element.s3:
        return "S3"
      case S3Element.d:
        return "D"
      case S3Element.d2:
        return "D2"
    }
  }
}
