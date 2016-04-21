document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#game',
        data: function () {
            return {
                gameProcess: true,
                
                mapWidth: 600,
                mapHeight: 250,
                
                boardPosition: 0,
                boardWidth: 100,
                boardHeight: 10,
                boardStep: 30,
                
                ballX: 0,
                ballY: 0,
                ballWidth: 50,
                ballHeight: 50,
                ballStep: 10,
                ballDirectionX: 1,
                ballDirectionY: 1
            }
        },
        
        ready: function () {
            var self = this;
            this.intervalId = setInterval(function () {
                self.makeStep();
            }, 100)
        },
        
        methods: {
            makeStep: function () {
                this.ballX += this.ballStep * this.ballDirectionX;
                this.ballY += this.ballStep * this.ballDirectionY;
                
                if (this.ballX + this.ballWidth >= this.mapWidth || this.ballX <= 0) {
                    this.ballDirectionX = -this.ballDirectionX;
                }
                
                if (this.ballY <= 0) {
                    this.ballDirectionY = -this.ballDirectionY;
                }
                
                if (this.ballY + this.ballHeight >= this.mapHeight - this.boardHeight) {
                    var ballPosition = this.ballX + Math.floor(this.ballWidth / 2);
                    if (ballPosition >= this.boardPosition && ballPosition <= this.boardPosition + this.boardWidth) {
                        this.ballDirectionY = -this.ballDirectionY;
                    } else {
                        clearInterval(this.intervalId);
                        this.gameProcess = false;
                        this.$els.field.classList.add('game-over');
                    }
                }
            },
            move: function (e) {
                this.boardPosition = e.clientX - Math.floor(this.boardWidth / 2);
                if (this.boardPosition < 0) {
                    this.boardPosition = 0;
                }
                if (this.boardPosition + this.boardWidth > this.mapWidth) {
                    this.boardPosition = this.mapWidth - this.boardWidth;
                }
            }
        }
    });
})
