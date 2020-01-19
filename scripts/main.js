import Game from './game.js'
import Dungeon from './dungeon.js'


let game = new Game()

let dungeon = new Dungeon(200, 400, 20, '#dungeon')

game.draw = function() {
    dungeon.clean()
    dungeon.show()
}

game.update = function() {
    dungeon.update()
}

game.registerAction('h', () => {
    dungeon.moveTetrominoLeft()
})

game.registerAction('l', () => {
    dungeon.moveTetrominoRight()
})

game.registerAction('j', () => {
    dungeon.rotateLeftTetromino()
})

game.registerAction('k', () => {
    dungeon.rotateRightTetromino()
})

// 按空格开始
// game.registerAction(' ', game.start.bind(game))
game.registerAction(' ', game.loop.bind(game))

game.listen()
