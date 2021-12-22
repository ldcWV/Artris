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

    let rng = new piece_rng();
    this.curPiece = rng.gen();
    this.nextPieces = new Array(NUM_NEXT_PIECES);
    for (let i = 0; i < NUM_NEXT_PIECES; i++) {
        this.nextPieces[i] = rng.gen();
    }

    this.curX = BOARD_WIDTH/2 - 2;
    this.curY = BOARD_HEIGHT-3;
    this.curRot = 0;
}
