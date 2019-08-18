import Pac from '../js/Pac.js'
import Board from '../js/Board.js'

export default (p)=> {
    
    let pac = new Pac(15, p)
    let board

    p.setup = function() {

        let canvasContent = document.querySelector('div.game')
        let elt = p.createCanvas(canvasContent.offsetWidth - canvasContent.offsetWidth % 30, canvasContent.offsetHeight - canvasContent.offsetHeight % 30)
        
        board = new Board(elt.canvas, p, 30, pac)
        
        canvasContent.childNodes.forEach(child => {
            child.remove()
        })

        window.addEventListener('keypress', (ev)=> pac.keyPressed(ev.key))
        
        canvasContent.appendChild(elt.canvas)
    }

    p.draw = function() {
        p.clear()
        p.background(0)
        pac.update()
        board.update()
        board.show()
    }

}