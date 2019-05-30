export default class Board{
    constructor(gridSize, myp5){
        this.gridSize = gridSize
        this.nRows = this.calculateRowNumber(myp5.canvasHeight, gridSize)
        this.nCols = this.calculateColNumber(myp5.canvasWidth, gridSize)
        this.map = this.makeMap()
        this.myp5 = myp5
    }

    SPACE = 0
    WALL = 3

    makeMap(){
        let grid = []

        for (let i = 0; i < this.nRows; i++) {

            grid[i] = []
            
            for (let j = 0; j < this.nCols; j++) {
                if (Math.random() > 0.8 || this.isEdge(j, i)) {
                    grid[i][j] = WALL
                } else{
                    grid[i][j] = SPACE
                }
            }
        }

        return grid
    }

    outOfRange(x, y){
        return (x < 0 || x > this.nCols) || (y < 0 || y > this.nRows)
    }

    isEdge(x, y){
        return x == 0 || y == 0 || x == this.nCols - 1 || y == this.nRows - 1
    }

    isWall(x, y){
        return this.map[y][x] == 3
    }

    drawFood(x, y){
        this.myp5.fill(255, 255, 0)
        this.myp5.ellipseMode(this.myp5.CORNER) 
        this.myp5.ellipse(x * this.gridSize + (this.gridSize / 2.5), y * this.gridSize + (this.gridSize / 2.5), this.gridSize / 6)
    }

    drawWall(x, y){
        this.myp5.noFill()
        this.myp5.strokeWeight(2)
        this.myp5.stroke('#003b6f')
        this.myp5.rect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)
        this.myp5.noStroke()
    }

    calculateRowNumber(canvasHeight, gridSize){
        return Math.round(canvasHeight/gridSize)
    }

    calculateColNumber(canvasWidth, gridSize){
        return Math.round(canvasWidth/gridSize)
    }
}