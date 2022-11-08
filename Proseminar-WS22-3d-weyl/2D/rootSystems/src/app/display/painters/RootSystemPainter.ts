import { Injectable } from "@angular/core";
import { rootSystems, RootSystems2D } from "src/app/data/rootSystems";
import { RootSystemService } from "src/app/logic/maths/root-system.service";
import RootSystem, { Root } from "src/app/logic/maths/RootSystem";
import Circle from "src/app/logic/maths_objects/Circle";
import Line from "src/app/logic/maths_objects/Line";
import Point from "src/app/logic/maths_objects/Point";
import Polygon from "src/app/logic/maths_objects/Polygon";
import { CanvasService } from "src/app/services/canvas.service";
import { CoordinateSystemService } from "src/app/services/coordinate-system.service";
import { PaintLayer, PaintService } from "src/app/services/paint.service";
import { Colors } from "../values/colors";
import Painter from "./Painter.interface";

@Injectable({
    providedIn: 'root',
})
export default class RootSystemPainter implements Painter{
    paintLayer: PaintLayer = PaintLayer.default;
    constructor(
        private canvas: CanvasService,
        private rootSystem: RootSystemService,
        private coord: CoordinateSystemService,
        private painter: PaintService
    ){}
    paint(layer?: PaintLayer){
        const roots = this.rootSystem.getRoots();
        this.paintExtraGeometry();
        // Paint the roots
        for(let root of roots){
            this.paintRoot(root);
            // Make sure to only paint the hyperplane once
            if(root.isPositive)
                this.paintHyperplane(root.angle+Math.PI/2);
        }
        if(layer != undefined){
            this.paintLayer = layer;
        }
        
    }
    // Used to paint extra objects that should only appear with certain root systems
    paintExtraGeometry(){
        let type = this.rootSystem.getType();
        switch(type){
            case RootSystems2D.A2:
                this.paintTriangle();
                break;
            case RootSystems2D.B2:
                this.paintSquare();
                break;
            case RootSystems2D.C2:
                this.paintSquare();
                break;
            case RootSystems2D.G2:
                this.paintHexagon();
                break;
        }
    }
    paintVectorEnd(point: Point, color: string){
        this.painter.paintCircle(
            new Circle({center: point, color: color, radius: 16}), PaintLayer.layer4);
    }
    paintVectorLine(startPoint: Point, endPoint: Point){
        const line = new Line({
            start: startPoint,
            end: endPoint,
            color: '#ffffff',
            width: 7
        })
        this.painter.paintLine(line, this.paintLayer);
    }

    paintRoot(root: Root){
        const point = root.getVector();
        this.paintVectorLine(new Point(0,0), point);
        this.paintVectorEnd(point, root.isSimple ? Colors.brightRed : Colors.brightGreen);
    }

    paintHyperplane(startAngle: number){
        const startAngleInDegree = (startAngle/(Math.PI*2))*360
        const maxLength = this.coord.getCrossLength()/2;
        const line = new Line({
            start: new Point(-maxLength, 0),
            end: new Point(maxLength, 0),
            color: '#ffffff',
            width: 2,
            dashed: true,
            dashString: "12 12"
        })
        this.painter.paintLine(line, PaintLayer.layer3).transform({rotate: -startAngleInDegree});
    }
    paintTriangle(){
        let triangle = new Polygon({
            points: [
                new Point(
                    Math.cos(Math.PI/3),
                    Math.sin(Math.PI/3),
                ),
                new Point(Math.cos(Math.PI),Math.sin(Math.PI)),
                new Point(
                    Math.cos(2*Math.PI - Math.PI/3),
                    Math.sin(2*Math.PI - Math.PI/3)
                )
            ],
            color: '#9999CC'
        })
        this.painter.paintPolygon(
            triangle,
            PaintLayer.layer3
        ).opacity(0.5)
    }
    paintSquare(){
        let square = new Polygon({
            points: [
                new Point(
                    0.5,
                    0.5
                ),
                new Point(
                    -0.5,
                    0.5
                ),
                new Point(
                    -0.5,
                    -0.5
                ),
                new Point(
                    0.5,
                    -0.5
                ),
            ],
            color: '#9999CC'
        })
        this.painter.paintPolygon(
            square,
            PaintLayer.layer3
        ).opacity(0.5).transform({rotate: 45})
    }
    paintHexagon(){
        let hexagon = new Polygon({
            points: [
                new Point(
                    0.8,
                    0
                ),
                new Point(
                    0.8*Math.cos(Math.PI/3),
                    0.8*Math.sin(Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(2*Math.PI/3),
                    0.8*Math.sin(2*Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(3*Math.PI/3),
                    0.8*Math.sin(3*Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(4*Math.PI/3),
                    0.8*Math.sin(4*Math.PI/3),
                ),
                new Point(
                    0.8*Math.cos(5*Math.PI/3),
                    0.8*Math.sin(5*Math.PI/3),
                ),
            ],
            color: '#9999CC'
        })
        this.painter.paintPolygon(
            hexagon,
            PaintLayer.layer3
        ).opacity(0.5).transform({rotate: 30})
    }
}