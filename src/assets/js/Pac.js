export default class Pac{
    
    constructor(size, render){
        this.size = size
        this.p5 = render
        this.i = 0.25 // upper mouth radian
        this.x = 1.75 // lower mouth radian
        this.speed = 0.01 // speed of mouth opening & closing
    }

    show(){
        this.p5.fill(255,255,0)
        this.p5.stroke(255,255,0)

        if (this.i <= 0 || this.i >= 0.28) {
            this.speed = this.speed * (-1) 
        }
        
        this.p5.arc(this.size, this.size, this.size, this.size, 
            (this.i -= this.speed) * this.p5.PI, (this.x += this.speed) * this.p5.PI, this.p5.PIE);
    }
}