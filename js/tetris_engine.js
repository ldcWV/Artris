function tetris_engine() {
    this.state = new tetris_state();
    this.rng = new piece_rng();

    this.state.nextPieces = new Array(NUM_NEXT_PIECES);
    for (let i = 0; i < NUM_NEXT_PIECES; i++) {
        this.state.nextPieces[i] = this.rng.gen();
    }
    this.newFallingPiece();
}

tetris_engine.prototype.newFallingPiece = function() {
    if (NUM_NEXT_PIECES == 0) {
        this.state.curPiece = this.rng.gen();
    } else {
        this.state.curPiece = this.state.nextPieces.shift(); // pop first element
        this.state.nextPieces.push(this.rng.gen());
    }
    this.state.curX = BOARD_WIDTH/2 - 2;
    this.state.curY = BOARD_HEIGHT - 1 - (this.state.curPiece == PIECE_I);
    this.state.curRot = 0;
}

tetris_engine.prototype.tick = function() {
    this.state.curY--;
}
