function tetris_state() {
    this.board = new Array(BOARD_WIDTH);
    for (let i = 0; i < BOARD_WIDTH; i++) {
        this.board[i] = new Array(BOARD_HEIGHT);
        for (let j = 0; j < BOARD_HEIGHT; j++) {
            this.board[i][j] = 0;
        }
    }

    this.curPiece = null;
    this.curX = null;
    this.curY = null;
    this.curRot = null;
    this.nextPieces = null;
}

tetris_state.prototype.getHeight = function(x) {
    for (let y = BOARD_HEIGHT-1; y >= 0; y--) {
        if (this.board[x][y]) return y+1;
    }
    return 0;
}
