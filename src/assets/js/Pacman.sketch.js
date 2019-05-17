import Pac from '../js/Pac.js'
import Board from '../js/Board.js'

export default (p)=>{
    
    let pac = new Pac(15, p)
    let board

    p.setup = function(){

        let canvasContent = document.querySelector('div.game')
        let elt = p.createCanvas(canvasContent.offsetWidth - canvasContent.offsetWidth % 30, canvasContent.offsetHeight - canvasContent.offsetHeight % 30)
        board = new Board(elt.canvas, p, 30, pac)
        canvasContent.childNodes.forEach(child => {
            child.remove()
        })

        window.addEventListener('keypress', 
            (ev)=>{
                switch (ev.key){
                    case 'w':
                        if (pac.xspeed + pac.yspeed == 0) {
                            pac.yspeed = -1
                            pac.xspeed = 0
                        }
                        pac.nextYSpeed = -1
                        pac.nextXSpeed = 0
                        break
                    case 'a':
                        if (pac.xspeed + pac.yspeed == 0) {
                            pac.yspeed = 0
                            pac.xspeed = -1
                        }
                        pac.nextYSpeed = 0
                        pac.nextXSpeed = -1
                        break
                    case 's':
                        if (pac.xspeed + pac.yspeed == 0) {
                            pac.yspeed = 1
                            pac.xspeed = 0
                        }
                        pac.nextYSpeed = 1
                        pac.nextXSpeed = 0
                        break
                    case 'd':
                        if (pac.xspeed + pac.yspeed == 0) {
                            pac.yspeed = 0
                            pac.xspeed = 1
                        }
                        pac.nextYSpeed = 0
                        pac.nextXSpeed = 1
                        break
                }
            }
        )
        
        canvasContent.appendChild(elt.canvas)
    }

    p.draw = function(){
        p.clear()
        p.background(0)
        pac.update()
        board.update()
        board.show()
    }

}