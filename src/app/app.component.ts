import { Component, HostListener } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { PacmanComponent } from './shared/ui/pacman/pacman.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PacmanComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'pacMan'

    board: any
    board_ctx: any

    board_border = 'black'
    board_background = 'rgb(234, 234, 234)'

    // Horizontal velocity
    dx = 20
    // Vertical velocity
    dy = 0

    gameVelocity = 400

    score = 0
    boardWidth = 800
    boardHeight = 800

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        const LEFT_KEY = 37
        const RIGHT_KEY = 39
        const UP_KEY = 38
        const DOWN_KEY = 40

        const keyPressed = event.keyCode
        const goingUp = this.dy === -20
        const goingDown = this.dy === 20
        const goingRight = this.dx === 20
        const goingLeft = this.dx === -20

        if (keyPressed === LEFT_KEY && !goingRight) {
            this.dx = -20
            this.dy = 0
        }

        if (keyPressed === UP_KEY && !goingDown) {
            this.dx = 0
            this.dy = -20
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {
            this.dx = 20
            this.dy = 0
        }

        if (keyPressed === DOWN_KEY && !goingUp) {
            this.dx = 0
            this.dy = 20
        }
    }

    constructor() {}

    ngOnInit(): void {
        this.board = document.getElementById('gameCanvas')
        this.board_ctx = this.board?.getContext('2d')
        this.drawMap()
    }

    drawMap() {
        this.board_ctx.fillStyle = 'black'
        this.board_ctx.strokeStyle = '#ff9933'
        this.board_ctx.lineWidth = 4

        this.board_ctx.beginPath()
        this.board_ctx.roundRect(0, 0, this.board.width, this.board.height, [
            22,
        ])
        this.board_ctx.fill()
        this.board_ctx.stroke()

        this.board_ctx.beginPath()
        this.board_ctx.strokeStyle = 'rgb(141, 230, 246)'

        // Upper part
        // Move to middle of left border
        this.board_ctx.moveTo(0, 350)
        this.board_ctx.lineTo(15, 350)
        this.board_ctx.lineTo(15, 15)
        this.board_ctx.lineTo(300, 15)
        this.board_ctx.moveTo(300, 0)
        this.board_ctx.lineTo(300, 65)

        this.board_ctx.moveTo(350, 0)
        this.board_ctx.lineTo(350, 15)
        this.board_ctx.lineTo(450, 15)
        this.board_ctx.lineTo(450, 0)

        this.board_ctx.moveTo(500, 0)
        this.board_ctx.lineTo(500, 65)
        this.board_ctx.moveTo(500, 15)

        this.board_ctx.lineTo(785, 15)
        this.board_ctx.lineTo(785, 350)
        this.board_ctx.lineTo(800, 350)

        // Lower part
        this.board_ctx.moveTo(0, 450)
        this.board_ctx.lineTo(15, 450)
        this.board_ctx.lineTo(15, 785)
        this.board_ctx.lineTo(300, 785)
        this.board_ctx.lineTo(300, 800)

        this.board_ctx.moveTo(350, 800)
        this.board_ctx.lineTo(350, 785)
        this.board_ctx.lineTo(450, 785)
        this.board_ctx.lineTo(450, 800)

        this.board_ctx.moveTo(500, 800)
        this.board_ctx.lineTo(500, 785)
        this.board_ctx.lineTo(785, 785)
        this.board_ctx.lineTo(785, 450)
        this.board_ctx.lineTo(800, 450)

        // Inner shapes

        this.board_ctx.lineWidth = 6
        this.board_ctx.stroke()
    }
}
