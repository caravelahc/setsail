export default class Board{
    constructor(canvas, render, size, pac) {
        this.p5 = render
        this.size = size
        this.pac = pac
        this.maze = this.makeMaze(canvas)
    }

    makeMaze(canvas) {

        let nRows = Math.round((canvas.offsetHeight) / this.size)
        let nCols = Math.round((canvas.offsetWidth) / this.size)

        let maze = this.makeGrid(canvas, nRows, nCols)

        this.setPacPosition(maze)

        return maze
    }

    setPacPosition(maze) {
        let nRows = maze.length - 1
        let nCols = maze[0].length - 1

        let pacx = Math.ceil(this.p5.random() * nCols)
        let pacy = Math.ceil(this.p5.random() * nRows)

        while(!this.validPacPosition(maze, pacx, pacy)) {
            pacx = Math.ceil(this.p5.random() * nCols)
            pacy = Math.ceil(this.p5.random() * nRows)            
        }

        this.pac.px = pacx
        this.pac.py = pacy
        
        maze[pacy][pacx] = 1;
    }

    update() {
        this.checkNext()

        if (this.pac.oldy != this.pac.y || this.pac.oldx != this.pac.x) {
            if (this.maze[this.pac.py][this.pac.px] == 3) {
                this.pac.px = this.pac.oldx
                this.pac.py = this.pac.oldy
            }else{
                this.maze[this.pac.oldy][this.pac.oldx] = 2
                this.maze[this.pac.py][this.pac.px] = 1
            }
        }
    }

    checkNext() {
        if (this.invalidNextMove()) this.pac.brakes() 
    }

    show() {
        for (let i = 0; i < this.maze.length; i++) {
            for (let j = 0; j < this.maze[i].length; j++) {
                switch (this.maze[i][j]) {
                    case 0:
                        this.drawFood(j, i)
                        break
                    case 1:
                        this.pac.show(i, j, this.size)
                        break
                    case 3:
                        this.drawWall(j, i)
                        break
                }
            }
        }
    }

    makeGrid(canvas, rows, cols) {
        let grid = []

        for (let i = 0; i < rows; i++) {
            grid[i] = []
            for (let j = 0; j < cols; j++) {
                if (Math.random() > 0.8 || i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
                    grid[i][j] = 3
                }else{
                    grid[i][j] = 0
                }
            }
        }

        return grid
    }

    drawFood(x, y) {
        this.p5.fill(255, 255, 0)
        this.p5.ellipseMode(this.p5.CORNER) 
        this.p5.ellipse(x * this.size + (this.size / 2.5), y * this.size + (this.size / 2.5), this.size / 6)
    }

    drawWall(x, y) {
        this.p5.noFill()
        this.p5.strokeWeight(2)
        this.p5.stroke('#003b6f')
        this.p5.rect(x * this.size, y * this.size, this.size, this.size)
        this.p5.noStroke()
    }

    validPacPosition(maze, x, y) {
        return maze[y][x] != 3
    }

    invalidNextMove() {
        return (this.movingRight() && this.invalidRightPosition()) || (this.movingLeft() && this.invalidLeftPosition()) || (this.movingDown() && this.invalidDownPosition()) || (this.movingUp() && this.invalidUpPosition())
    }

    movingRight() {
        return this.pac.xspeed > 0
    }
    
    movingLeft() {
        return this.pac.xspeed < 0
    }

    movingDown() {
        return this.pac.yspeed > 0
    }

    movingUp() {
        return this.pac.yspeed < 0
    }

    invalidRightPosition() {
        return this.maze[this.pac.py][this.pac.px + 1] == undefined || this.maze[this.pac.py][this.pac.px + 1] == 3
    }

    invalidLeftPosition() {
        return this.maze[this.pac.py][this.pac.px - 1] == undefined || this.maze[this.pac.py][this.pac.px - 1] == 3
    }

    invalidDownPosition() {
        return this.maze[this.pac.py + 1][this.pac.px] == undefined || this.maze[this.pac.py + 1][this.pac.px] == 3
    }

    invalidUpPosition() {
        return this.maze[this.pac.py - 1][this.pac.px] == undefined || this.maze[this.pac.py - 1][this.pac.px] == 3
    }
}