export default class Pac{

    constructor(board, myp5){
        this.board = board
        this.myp5 = myp5
        this.pacSize = board.gridSize / 2
        this.setPacPosition(board)
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

    setPacPosition(){
        let nRows = this.board.nRows
        let nCols = this.board.nCols

        let pacX = Math.ceil(this.myp5.random() * nCols)
        let pacY = Math.ceil(this.myp5.random() * nRows)

        while(!this.validPacPosition(pacX, pacY)) {
            pacX = Math.ceil(this.myp5.random() * nCols)
            pacY = Math.ceil(this.myp5.random() * nRows)            
        }
        
        this.board.map[pacY][pacX] = 1;
    }

    validPacPosition(x, y){
        if (this.board.outOfRange(x, y)) {
            return false
        } else if (this.board.isWall(x, y)) {
            return false
        }

        return true
    }

    // update(){
    //     this.checkNext()

    //     if (this.pac.oldy != this.pac.y || this.pac.oldx != this.pac.x) {
    //         if (this.map[this.pac.py][this.pac.px] == 3) {
    //             this.pac.px = this.pac.oldx
    //             this.pac.py = this.pac.oldy
    //         } else{
    //             this.map[this.pac.oldy][this.pac.oldx] = 2
    //             this.map[this.pac.py][this.pac.px] = 1
    //         }
    //     }
    // }

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

    show(i, j){

        if (this.upperMouth < 1.75 || this.upperMouth >= 2) {
            this.mouthSpeed *= -1 
        }

        this.myp5.noStroke()
        this.myp5.fill(255, 255, 0)

        // Normal
        this.myp5.arc(
            j * this.board.gridSize + (this.board.gridSize / 4) + this.deltaX,
            i * this.board.gridSize + (this.board.gridSize / 4) + this.deltaY,
            this.pacSize,
            this.pacSize,
            (this.lowerMouth -= this.mouthSpeed) * this.myp5.PI + this.direction,
            (this.upperMouth += this.mouthSpeed) * this.myp5.PI + this.direction,
            this.myp5.PIE
        )
    }

    checkNext(){
        if (this.invalidNextMove()) this.brakes() 
    }

    invalidNextMove(){
        return (this.movingUp() && this.invalidUpPosition()) || (this.movingLeft() && this.invalidLeftPosition()) || (this.movingDown() && this.invalidDownPosition()) || (this.movingRight() && this.invalidRightPosition())
    }

    moveUp(){
        if (this.notMoving()) {
            this.yspeed = -2
            this.xspeed = 0
        }
        this.rotateUp()
        this.nextYSpeed = -2
        this.nextXSpeed = 0
    }

    moveLeft(){
        if (this.notMoving()) {
            this.yspeed = 0
            this.xspeed = -2
        }
        this.rotateLeft()
        this.nextYSpeed = 0
        this.nextXSpeed = -2
    }

    moveDown(){
        if (this.notMoving()) {
            this.yspeed = 2
            this.xspeed = 0
        }
        this.rotateDown()
        this.nextYSpeed = 2
        this.nextXSpeed = 0
    }

    moveRight(){
        if (this.notMoving()) {
            this.yspeed = 0
            this.xspeed = 2
        }
        this.rotateRight()
        this.nextYSpeed = 0
        this.nextXSpeed = 2
    }

    notMoving(){
        return this.xspeed + this.yspeed == 0
    }

    movingRight(){
        return this.xspeed > 0
    }

    movingLeft(){
        return this.xspeed < 0
    }

    movingDown(){
        return this.yspeed > 0
    }

    movingUp(){
        return this.yspeed < 0
    }

    invalidRightPosition(){
        return this.map[this.py][this.px + 1] == undefined || this.map[this.py][this.px + 1] == 3
    }

    invalidLeftPosition(){
        return this.map[this.py][this.px - 1] == undefined || this.map[this.py][this.px - 1] == 3
    }

    invalidDownPosition(){
        return this.map[this.py + 1][this.px] == undefined || this.map[this.py + 1][this.px] == 3
    }

    invalidUpPosition(){
        return this.map[this.py - 1][this.px] == undefined || this.map[this.py - 1][this.px] == 3
    }

    rotateDown(){
        this.rotate(this.myp5.HALF_PI)
    }

    rotateUp(){
        this.rotate(-this.myp5.HALF_PI)
    }

    rotateLeft(){
        this.rotate(this.myp5.PI)
    }

    rotateRight(){
        this.rotate(0)
    }

    rotate(radAngle){
        this.direction = radAngle;
    }

    brakes(){
        this.xspeed = 0
        this.yspeed = 0
    }
}
