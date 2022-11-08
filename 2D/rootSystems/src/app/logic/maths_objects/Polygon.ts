import Point from "./Point";

export default class Polygon{
    points: Array<Point> = [];
    color: string
    constructor(d: {points: Array<Point>, color: string}){
        this.points = d.points;
        this.color = d.color;
    }
}