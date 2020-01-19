import {random, rotateRight, rotateLeft} from './utils.js'


const SHAPE = {
    'L': [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
    ],
    'J': [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
    ],
    'Z': [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    'S': [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
    ],
    'T': [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    'I': [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    'O': [
        [1, 1],
        [1, 1],
    ],
}

class Tetromino {
    constructor(x, y, shape) {
        // x,y 表示方块的左上角
        this.x = x
        this.y = y

        this.body = SHAPE[shape]

        this.shapes = [];
    }

    rotateRight() {
        rotateRight(this.body)
    }

    rotateLeft() {
        rotateLeft(this.body)
    }

    left() {
        this.x -= 1
    }

    right() {
        this.x += 1
    }

    down() {
        this.y += 1
    }

    randomReset(x, y) {
        if (this.shapes.length == 0) {
            this.shapes = [
                'L', 'L', 'L', 'L',
                'J', 'J', 'J', 'J',
                'Z', 'Z', 'Z', 'Z',
                'S', 'S', 'S', 'S',
                'T', 'T', 'T', 'T',
                'I', 'I', 'I', 'I',
                'O', 'O', 'O', 'O',
            ]
        }
        // remove a single piece
        let shape = this.shapes.splice(random(0, this.shapes.length - 1), 1)[0]

        this.x = x
        this.y = y

        this.body = SHAPE[shape]
    }

}

export default Tetromino
