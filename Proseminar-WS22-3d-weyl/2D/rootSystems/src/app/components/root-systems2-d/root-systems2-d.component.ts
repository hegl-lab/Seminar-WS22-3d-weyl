import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Svg, SVG } from '@svgdotjs/svg.js';
import { rootSystems } from 'src/app/data/rootSystems';
import GridPainter from 'src/app/display/painters/GridPainter';
import RootSystemPainter from 'src/app/display/painters/RootSystemPainter';
import WeylChamberPainter from 'src/app/display/painters/WeylChamberPainter';
import { RootSystemService } from 'src/app/logic/maths/root-system.service';
import RootSystem, { Root } from 'src/app/logic/maths/RootSystem';
import { Canvas, CanvasService } from 'src/app/services/canvas.service';
import { PaintLayer } from 'src/app/services/paint.service';

@Component({
  selector: 'app-root-systems2-d',
  templateUrl: './root-systems2-d.component.html',
  styleUrls: ['./root-systems2-d.component.sass']
})
export class RootSystems2DComponent implements OnInit {
  @ViewChild('paintContainer') paintContainer!: ElementRef;

  @ViewChild('paintContainerLayer0') layer0!: ElementRef;
  @ViewChild('paintContainerLayer1') layer1!: ElementRef;
  @ViewChild('paintContainerLayer2') layer2!: ElementRef;
  @ViewChild('paintContainerLayer3') layer3!: ElementRef;
  @ViewChild('paintContainerLayer4') layer4!: ElementRef;

  paintSvgContainer!: Svg;


  constructor(
    private canvas: CanvasService,
    private gridPainter: GridPainter,
    private rootSystemPainter: RootSystemPainter,
    private weylChamberPainter: WeylChamberPainter,
    private rootSystemService: RootSystemService
    ) {
      rootSystemService.repaintEvent.subscribe(() => {
        this.repaintObjects();
      });
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.initializeCanvas();
    this.paintObjects();
  }
  repaintObjects(){
    this.clearCanvas();
    this.initializeCanvas();
    this.paintObjects();
  }
  paintObjects(){
    this.gridPainter.paint(PaintLayer.layer0);
    this.weylChamberPainter.paint(PaintLayer.layer1);
    this.rootSystemPainter.paint(PaintLayer.layer4);
  }
  clearCanvas(){
    this.paintSvgContainer.remove();
  }
  initializeCanvas(){
    // Set canvas dimensions
    const canvasHeight = document.body.clientHeight-4;
    const canvasWidth = document.body.clientWidth-1;
    this.paintSvgContainer  = SVG().addTo(this.paintContainer.nativeElement).size(
      canvasWidth,
      canvasHeight
    )
    // Initalize the different layers with the screen dimensions
    const layers = [
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight),
      this.paintSvgContainer.nested().size(canvasWidth, canvasHeight)
    ]
    const canvas = new Canvas({
      height: canvasHeight,
      width: canvasWidth,
      pixelsInOneUnit: 150
    });
    this.canvas.initializeCanvas(canvas);
    this.canvas.initializePaintLayers(layers);
  }
}
