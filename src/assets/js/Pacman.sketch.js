import Pac from '../js/Pac.js'
import Board from '../js/Board.js'
import Game from '../js/Game.js'

export default (myp5)=>{

    let gridSize = 30
    
    let game
    let board
    let pac

    myp5.setup = function(){

        let divCanvas = document.querySelector('div.game')

        myp5.canvasWidth = divCanvas.offsetWidth
        myp5.canvasHeight = divCanvas.offsetHeight

        let elt = myp5.createCanvas(myp5.canvasWidth, myp5.canvasHeight)

        board = new Board(gridSize, myp5)
        pac = new Pac(board, myp5)
        game = new Game(board, pac)

        divCanvas.childNodes.forEach(child => {
            child.remove()
        })

        window.addEventListener('keypress', (ev)=> game.keyPressed(ev.key))

        divCanvas.appendChild(elt.canvas)
    }

    myp5.draw = function(){
        myp5.clear()
        myp5.background(0)
        game.showGame()
    }

}