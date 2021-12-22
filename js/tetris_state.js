function tetris_state(width, height) {
    this.width = width;
    this.height = height;

    this.board = new Array(this.width);
    for (let i = 0; i < this.width; i++) {
        this.board[i] = new Array(this.height);
        for (let j = 0; j < this.height; j++) {
            this.board[i][j] = 0;
        }
    }
}