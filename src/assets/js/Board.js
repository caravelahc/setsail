export default class Board{
    constructor(canvas, render, size, pac){
        this.size = size
        this.p5 = render
        this.pac = pac
        this.positions = this.getPositions(canvas)
        console.log(this)
    }

    getPositions(canvas){

        let rows = Math.round((canvas.offsetHeight) / this.size)
        let cols = Math.round((canvas.offsetWidth) / this.size)

        let positions = this.setGrid(canvas, rows, cols)

        let pacx = Math.ceil(this.p5.random() * cols)
        let pacy = Math.ceil(this.p5.random() * rows)

        while (positions[pacy][pacx] == 3) {
            pacx = Math.ceil(this.p5.random() * cols)
            pacy = Math.ceil(this.p5.random() * rows)
        }

        this.pac.px = pacx
        this.pac.py = pacy
        positions[pacy][pacx] = 1;

        return positions
    }

    setGrid(canvas, rows, cols){
        let positions = []

        for (let i = 0; i < rows; i++) {
            positions[i] = []
            for (let j = 0; j < cols; j++) {
                if (Math.random() > 0.8 || i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
                    positions[i][j] = 3
                }else{
                    positions[i][j] = 0
                }
            }
        }

        return positions
    }

    update(){
        this.checkNext()

        if (this.pac.oldy != this.pac.y || this.pac.oldx != this.pac.x) {
            if (this.positions[this.pac.py][this.pac.px] == 3) {
                this.pac.px = this.pac.oldx
                this.pac.py = this.pac.oldy
            }else{
                this.positions[this.pac.oldy][this.pac.oldx] = 2
                this.positions[this.pac.py][this.pac.px] = 1
            }
        }
    }

    checkNext(){
        if (this.pac.xspeed > 0) if (this.positions[this.pac.py][this.pac.px + 1] == undefined || this.positions[this.pac.py][this.pac.px + 1] == 3) this.pac.xspeed = 0
        if (this.pac.xspeed < 0) if (this.positions[this.pac.py][this.pac.px - 1] == undefined || this.positions[this.pac.py][this.pac.px - 1] == 3) this.pac.xspeed = 0
        if (this.pac.yspeed > 0) if (this.positions[this.pac.py + 1][this.pac.px] == undefined || this.positions[this.pac.py + 1][this.pac.px] == 3) this.pac.yspeed = 0
        if (this.pac.yspeed < 0) if (this.positions[this.pac.py - 1][this.pac.px] == undefined || this.positions[this.pac.py - 1][this.pac.px] == 3) this.pac.yspeed = 0
    }

    show(){
        for (let i = 0; i < this.positions.length; i++) {
            for (let j = 0; j < this.positions[i].length; j++) {
                switch (this.positions[i][j]) {
                    case 0:
                        this.p5.fill(255, 255, 0)
                        this.p5.ellipseMode(this.p5.CORNER) 
                        this.p5.ellipse(j * this.size + (this.size / 2.5), i * this.size + (this.size / 2.5), this.size / 6)
                        break
                    case 1:
                        this.pac.show(i, j, this.size)
                        break
                    case 3:
                        this.p5.noFill()
                        this.p5.strokeWeight(2)
                        this.p5.stroke('#003b6f')
                        this.p5.rect(j * this.size, i * this.size, this.size, this.size)
                        this.p5.noStroke()
                        break
                }
            }
        }
    }
}