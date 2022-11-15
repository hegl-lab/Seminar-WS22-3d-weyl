export class WeylChamber{
    startAngle: number;
    angle: number;
    constructor(startAngle: number, angle: number){
        this.angle = angle;
        // Make sure the angle is not larger than  2*pi or negative
        while(startAngle >= Math.PI*2){
            startAngle -= Math.PI*2;
        }
        while(startAngle <= 0){
            startAngle += Math.PI*2;
        }
        if(Math.abs(startAngle-Math.PI*2)<0.1){
            startAngle = 0;
        }
        this.startAngle = startAngle;
    }
}
