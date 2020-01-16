class Game {
    constructor() {
        this.fps = 5
        this.runing = false
        this.actions = {}
        this.draw()

        this.lastDrawTime = null
        this.fpsInterval = 1000 / this.fps
    }

    registerAction(key, action) {
        this.actions[key] = action
    }

    listen() {
        window.addEventListener('keydown', (event) => {
            let action = this.actions[event.key]
            action && action()
        })
    }

    draw() { }

    update() { }

    start() {
        if (this.runing) {
            return
        }

        this.runing = true
        this.interval = setInterval(() => {
            try {
                this.update()
                this.draw()
            } catch(e) { // 死亡
                console.error(e.stack)
                // this.snake.reset(7, 7)
                clearInterval(this.interval)
                this.runing = false
            }
        }, 1000 / this.fps)
    }

    run() {
        this.timer = setTimeout(() => {
            try {
                this.update()
                this.draw()

                this.timer = setTimeout(this.run.bind(this), 1000 / this.fps)
            } catch(e) { // 死亡
                console.error(e.stack)
                clearTimeout(this.timer)
            }
        }, 1000 / this.fps)
    }

    loop(timestamp) {
        if (!this.lastDrawTime) {
            this.lastDrawTime = timestamp
        }

        let elapsed = timestamp - this.lastDrawTime

        try {
            if (elapsed > this.fpsInterval) {
                this.lastDrawTime = timestamp
                this.update()
                this.draw()
            }
            this.req = requestAnimationFrame(this.loop.bind(this))
        } catch(e) { // 死亡
            console.error(e.stack)
            cancelAnimationFrame(this.req)
        }
    }
}

export default Game
