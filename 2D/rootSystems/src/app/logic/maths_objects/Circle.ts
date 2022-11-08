import Point from "./Point";

export default class Circle{
    center: Point;
    radius: number;
    color: string;
    constructor(d: {
        center: Point,
        radius: number,
        color: string
    }){
        this.center = d.center;
        this.radius = d.radius;
        this.color = d.color;
    }
}