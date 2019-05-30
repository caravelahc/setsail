export default class Game{
	constructor(board, pac){
		this.board = board
		this.pac = pac
	}

	showGame(){
		let nRows = this.board.nRows
		let nCols = this.board.nCols

		for (let i = 0; i < nRows; i++) {
            for (let j = 0; j < nCols; j++) {
                switch (this.board.map[i][j]) {
                    case 0:
                        this.board.drawFood(j, i)
                        break
                    case 1:
                        this.pac.show(i, j)
                        break
                    case 3:
                        this.board.drawWall(j, i)
                        break
                }
            }
        }
	}

	update(){
		// this.board.update()
		// this.pac.update()
	}

	keyPressed(key){
		switch (key){
            case 'w':
                this.pac.moveUp()
                break
            case 'a':
                this.pac.moveLeft()
                break
            case 's':
               	this.pac.moveDown()
                break
            case 'd':
                this.pac.moveRight()
                break
        }
	}
}