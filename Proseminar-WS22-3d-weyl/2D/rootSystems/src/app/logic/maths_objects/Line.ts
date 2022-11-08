import Point from "./Point"

export default class Line{
    start: Point
    end: Point
    color: string;
    width: number;
    dashed: boolean = false;
    dashString: string = '';

    constructor(d: {start: Point, end: Point, color: string, width: number, dashed?: boolean, dashString?: string}){
        this.start = d.start;
        this.end = d.end;
        this.color = d.color;
        this.width = d.width;
        this.dashed = d.dashed != null ? d.dashed : false;
        this.dashString = d.dashString != null ? d.dashString : "";
    }
}