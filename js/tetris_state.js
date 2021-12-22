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
