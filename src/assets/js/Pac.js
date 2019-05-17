export default class Pac{
    
    constructor(size, render){
        this.size = size
        this.p5 = render
        this.um = 0.25 // upper mouth radian
        this.lm = 1.75 // lower mouth radian
        this.mouthSpeed = 0.01 // speed of mouth opening & closing
        this.nextXSpeed = 1
        this.nextYSpeed = 0
        this.xspeed = 1
        this.yspeed = 0
        this.oldx
        this.oldy
        this.px
        this.py
        this.deltaX = 0
        this.deltaY = 0
        console.log(this)
    }

    update(){
        this.deltaX += this.xspeed
        this.deltaY += this.yspeed

        if (this.deltaX > 30) {
            this.xspeed = this.nextXSpeed
            this.yspeed = this.nextYSpeed
            this.oldx = this.px
            this.oldy = this.py
            this.deltaX = 0
            this.deltaY = 0
            this.px++
        }
        if (this.deltaX < -30) {
            this.xspeed = this.nextXSpeed
            this.yspeed = this.nextYSpeed
            this.oldx = this.px
            this.oldy = this.py
            this.deltaX = 0
            this.deltaY = 0
            this.px--
        }
        if (this.deltaY > 30) {
            this.xspeed = this.nextXSpeed
            this.yspeed = this.nextYSpeed
            this.oldx = this.px
            this.oldy = this.py
            this.deltaX = 0
            this.deltaY = 0
            this.py++
        }
        if (this.deltaY < -30) {
            this.xspeed = this.nextXSpeed
            this.yspeed = this.nextYSpeed
            this.oldx = this.px
            this.oldy = this.py
            this.deltaX = 0
            this.deltaY = 0
            this.py--
        }
        
    }

    show(i, j, boardSize){
        this.p5.fill(255,255,0)
        this.p5.stroke(255,255,0)

        if (this.um <= 0 || this.um >= 0.28) {
            this.mouthSpeed = this.mouthSpeed * (-1) 
        }
        
        this.p5.arc(j * boardSize + (boardSize / 4) + this.deltaX , i * boardSize + (boardSize / 4) + this.deltaY, this.size, this.size, 
            (this.um -= this.mouthSpeed) * this.p5.PI, (this.lm += this.mouthSpeed) * this.p5.PI, this.p5.PIE);
    }
}