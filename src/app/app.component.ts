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
        this.board_ctx.strokeStyle = 'pink'
        this.board_ctx.lineWidth = 4
        this.board_ctx.fillRect(0, 0, this.board.width, this.board.height)
        this.board_ctx.strokeRect(0, 0, this.board.width, this.board.height)
        this.board_ctx.strokeStyle = 'rgb(141, 230, 246)'
        this.board_ctx.moveTo(0, 350)
        this.board_ctx.lineTo(5, 350)
        this.board_ctx.lineWidth = 2
        this.board_ctx.stroke()
    }
}
