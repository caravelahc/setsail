export default class Pac{
    
    constructor(size, render){
        this.size = size
        this.p5 = render
        this.upperMouth = 1.75
        this.lowerMouth = 0.25
        this.mouthSpeed = 0.05
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

        if (this.upperMouth < 1.75 || this.upperMouth >= 2) {
            this.mouthSpeed *= -1 
        }
     
        this.p5.noStroke()
        this.p5.fill(255, 255, 0)

        // Normal
        this.p5.arc(
            j * boardSize + (boardSize / 4) + this.deltaX,
            i * boardSize + (boardSize / 4) + this.deltaY,
            this.size,
            this.size,
            (this.lowerMouth -= this.mouthSpeed) * this.p5.PI + this.direction,
            (this.upperMouth += this.mouthSpeed) * this.p5.PI + this.direction,
            this.p5.PIE
        )
    }

    keyPressed(key){
        switch (key){
            case 'w':
                if (this.notMoving()) {
                    this.yspeed = -2
                    this.xspeed = 0
                }
                this.rotateUp()
                this.nextYSpeed = -2
                this.nextXSpeed = 0
                break
            case 'a':
                if (this.notMoving()) {
                    this.yspeed = 0
                    this.xspeed = -2
                }
                this.rotateLeft()
                this.nextYSpeed = 0
                this.nextXSpeed = -2
                break
            case 's':
                if (this.notMoving()) {
                    this.yspeed = 2
                    this.xspeed = 0
                }
                this.rotateDown()
                this.nextYSpeed = 2
                this.nextXSpeed = 0
                break
            case 'd':
                if (this.notMoving()) {
                    this.yspeed = 0
                    this.xspeed = 2
                }
                this.rotateRight()
                this.nextYSpeed = 0
                this.nextXSpeed = 2
                break
        }
    }

    brakes(){
        this.xspeed = 0
        this.yspeed = 0
    }

    notMoving(){
        return this.xspeed + this.yspeed == 0
    }

    rotateDown(){
        this.rotate(this.p5.HALF_PI)
    }

    rotateUp(){
        this.rotate(-this.p5.HALF_PI)
    }

    rotateLeft(){
        this.rotate(this.p5.PI)
    }

    rotateRight(){
        this.rotate(0)
    }

    rotate(radAngle){
        this.direction = radAngle;
    }
}
