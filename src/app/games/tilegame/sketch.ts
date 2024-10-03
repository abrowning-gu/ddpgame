import * as p5  from 'p5';
import { Object } from './object';
let obj:any;
let img:p5.Image;
let imgx:number = 20;
let imgy:number = 20;
let canvas:any;
const sketch = (p: p5) => {
    
    p.preload = () => {
        img = p.loadImage('/assets/bug4.png');
    };
  
    p.setup = () => {
     p.createCanvas(p.windowWidth, p.windowHeight -60);
      obj = new Object(p,20,40,10);
    };
  
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight-60);
    };
  
    let x = 0;
  
    p.draw = () => {
       
      p.background(220);
      p.image(img,imgx,imgy);
        obj.show();
        obj.update();
        
    };
    p.touchStarted = dosomething;
    p.mousePressed = dosomething;
    // p.mousePressed = () => {
    //     imgx = imgx + 5;
    // };
   
}

function dosomething(){
    imgx = imgx + 5;
}

export default sketch;