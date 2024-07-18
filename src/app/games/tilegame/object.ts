import * as p5 from "p5";

export class Object {
    x:number = 0;
    y:number = 0;
    radius:number = 0;
    p!:p5;
    constructor(_context:p5, _x:number,_y:number,_radius:number){
        this.x = _x;
        this.y= _y;
        this.radius = _radius;
        this.p = _context;

    }
    show(){
        this.p.fill('white');
        this.p.ellipse(this.x, this.y,this.radius);
    }
    update(){
        this.x = this.x + 1;
        //console.log(this.x);
    }
}
