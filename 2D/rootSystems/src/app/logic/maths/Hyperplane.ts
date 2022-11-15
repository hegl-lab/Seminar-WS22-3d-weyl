export class Hyperplane{
    angle: number;
    constructor(angle: number){
        // Make sure the angle is not larger than  2*pi or negative
        while(angle > Math.PI*2){
            angle -= Math.PI*2;
        }
        while(angle < 0){
            angle += Math.PI*2;
        }
        this.angle = angle;
    }
}