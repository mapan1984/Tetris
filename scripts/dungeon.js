import Tetromino from './tetromino.js'

class Dungeon {
    constructor(width, height, gridSize, mapId) {
        this.width = width
        this.height = height
        this.gridSize = gridSize
        this.xMax = this.width / this.gridSize
        this.yMax = this.height / this.gridSize
        this.context = document.querySelector(mapId).getContext('2d')

        this.initGrids()
        this.initTetromino()
    }

    clean() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    initGrids() {
        this.grids = []
        for (let y = 0; y <= this.yMax; y++) {
            let row = []
            for (let x = 0; x < this.xMax; x++) {
                if (y == this.yMax) {
                    row.push(1)
                } else {
                    row.push(null)
                }
            }
            this.grids.push(row)
        }
    }

    initTetromino() {
        this.tetromino = new Tetromino(Math.floor(this.xMax / 2), -3, 'L')
    }

    check(tetromino) {
        let tetrominoGrids = []

        let isFill = false

        for (let i = 0; i < tetromino.body.length; i++) {
            let row = tetromino.body[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] == 1) {
                    let x = tetromino.x + j
                    let y = tetromino.y + i

                    tetrominoGrids.push([x, y])

                    // 再向下就会碰撞
                    if (this.grids[y+1] && this.grids[y+1][x]) {
                        isFill = true
                    }
                }
            }
        }

        if (isFill) {
            for (let [x, y] of tetrominoGrids) {
                if (this.grids[y]) {
                    this.grids[y][x] = 1
                }
            }
        }

        return isFill
    }

    checkX(direction) {
        for (let i = 0; i < this.tetromino.body.length; i++) {
            let row = this.tetromino.body[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] == 1) {
                    let x = this.tetromino.x + j
                    let y = this.tetromino.y + i

                    if (direction == 'left') {
                        x -= 1
                    } else if (direction == 'right') {
                        x += 1
                    }

                    if (x < 0 || x > this.xMax - 1) {
                        return true
                    }

                    if (this.grids[y] && this.grids[y][x]) {
                        return true
                    }
                }
            }
        }
        return false
    }

    update() {
        this.tetromino.down()
        let isFill = this.check(this.tetromino)
        if (isFill) {
            console.log('isFill')
            this.tetromino.randomReset(Math.floor(this.xMax / 2), -4)
        }
    }

    moveTetrominoLeft() {
        console.log('moveTetrominoLeft')
        if (!this.checkX('left')) {
            this.tetromino.left()
        }
    }

    moveTetrominoRight() {
        console.log('moveTetrominoRight')
        if (!this.checkX('right')) {
            this.tetromino.right()
        }
    }

    rotateTetromino() {
        this.tetromino.rotate()
    }

    show() {
        this.context.fillStyle = "#18ca53"
        for (let i = 0; i < this.tetromino.body.length; i++) {
            let row = this.tetromino.body[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] == 1) {
                    let x = this.tetromino.x + j
                    let y = this.tetromino.y + i
                    this.context.fillRect(
                        x*this.gridSize,
                        y*this.gridSize,
                        this.gridSize,
                        this.gridSize
                    )
                }
            }
        }

        this.context.fillStyle = "#12610f"
        for (let y = 0; y <= this.yMax; y++) {
            for (let x = 0; x < this.xMax; x++) {
                if (this.grids[y][x] == 1) {
                    this.context.fillRect(
                        x*this.gridSize,
                        y*this.gridSize,
                        this.gridSize,
                        this.gridSize
                    )
                }
            }
        }


        this.context.strokeStyle = 'lightgrey'
        this.context.beginPath()
        for (let x = 0; x < this.width; x += this.gridSize) {
            this.context.moveTo(x, 0)
            this.context.lineTo(x, this.height)
        }
        for (let y = 0; y < this.height; y += this.gridSize) {
            this.context.moveTo(0, y)
            this.context.lineTo(this.width, y)
        }
        this.context.stroke()
    }
}

export default Dungeon
