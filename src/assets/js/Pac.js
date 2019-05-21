export default class Pac{
    
    constructor(size, render){
        this.size = size
        this.p5 = render
        this.um = 1.75 // upper mouth radian
        this.lm = 0.25 // lower mouth radian
        this.mouthSpeed = 0.05 // speed of mouth opening & closing
        this.nextXSpeed = 2
        this.nextYSpeed = 0
        this.xspeed = 2
        this.yspeed = 0
        this.oldx
        this.oldy
        this.px
        this.py
        this.deltaX = 0
        this.deltaY = 0
        this.direction = 0
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

        if (this.um < 1.75 || this.um >= 2) {
            this.mouthSpeed *= -1 
        }
	 
        this.p5.noStroke()
        this.p5.fill(255, 255, 0)

        // Normal
        this.p5.arc(
            j * boardSize + (boardSize / 4) + this.deltaX , 
            i * boardSize + (boardSize / 4) + this.deltaY, 
            this.size, 
            this.size, 
	    (this.lm -= this.mouthSpeed) * this.p5.PI + this.direction, 
	    (this.um += this.mouthSpeed) * this.p5.PI + this.direction, 
            this.p5.PIE)
    }
}
