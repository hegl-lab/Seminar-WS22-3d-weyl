import { RootSystems2D } from "src/app/data/rootSystems";
import Point from "../maths_objects/Point";
import { Hyperplane } from "./Hyperplane";
import { WeylChamber } from "./WeylChamber";

export class Root{
    angle: number;
    length: number;
    isSimple: boolean = false;
    isPositive: boolean = true;
    constructor(d:
        {
            angle: number,
            length: number,
            isSimple: boolean,
            isPositive?: boolean
        }){
        this.angle = d.angle;
        this.length = d.length;
        this.isSimple = d.isSimple;
        this.isPositive = d.isPositive != null ? d.isPositive : true;
    }
    getNegative(){
        return new Root({
            angle: this.angle + Math.PI,
            length: this.length,
            isSimple: false,
            isPositive: false
        })
    }
    getVector(){
        return new Point(
            Math.cos(this.angle)*this.length,
            Math.sin(this.angle)*this.length
        )
    }
}

export default class RootSystem{
    type: RootSystems2D
    private _simpleRoots: Array<Root> = [];
    // The minimum angle occuring in this root system
    private _minimumAngle: number;
    constructor(
        type: RootSystems2D,
        simpleRoots: Array<Root>, minimumAngle: number){
        this.type = type;
        this._simpleRoots = simpleRoots;
        this._minimumAngle = minimumAngle;
    }
    getAllRoots(){
        const allRoots = [...this._simpleRoots];
        this._simpleRoots.forEach((root: Root) => {
            allRoots.push(root.getNegative());
        })
        return allRoots;
    }

    getHyperplanes(){
        const hyperplanes: Array<Hyperplane> = [];
        for(let root of this._simpleRoots){
            hyperplanes.push(new Hyperplane(root.angle+Math.PI/2));
        }
        hyperplanes.sort((a,b) => {
            if(a.angle < b.angle){
                return -1;
            }
            else if(a.angle === b.angle){
                return 0;
            }
            return 1;
        })
        return hyperplanes;
    }

    getAllWeylChambers(){
        const weylChambers: Array<WeylChamber> = [];
        const hyperplanes = this.getHyperplanes();
        for(let hyperplane of hyperplanes){
            // Add two weyl chambers - one for every side of the hyperplane
            const weylChamber1 = new WeylChamber(hyperplane.angle, this._minimumAngle);
            const weylChamber2 = new WeylChamber(hyperplane.angle + Math.PI, this._minimumAngle);
            weylChambers.push(weylChamber1);
            weylChambers.push(weylChamber2);
        }
        console.log(weylChambers);
        weylChambers.sort((a,b) => {
            if(a.startAngle < b.startAngle){
                return -1;
            }
            else if(a.startAngle === b.startAngle){
                return 0;
            }
            return 1;
        })
        return weylChambers;
    }
    getFundamentalWeylChamber(){
        return this.getAllWeylChambers()[0];
    }
}