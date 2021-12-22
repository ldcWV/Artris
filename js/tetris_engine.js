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

tetris_engine.prototype.squareEmpty = function(x, y) {
    if (x < 0 || x >= BOARD_WIDTH || y < 0) return false;
    if (y >= BOARD_HEIGHT) return true;
    if (this.state.board[x][y]) return false;
    return true;
}

tetris_engine.prototype.intersectionExists = function() {
    let piece = this.state.curPiece;
    let rot = this.state.curRot;
    for (let i = 0; i < PIECES[piece][rot].length; i++) {
        for (let j = 0; j < PIECES[piece][rot][i].length; j++) {
            if (PIECES[piece][rot][i][j]) {
                let x = this.state.curX + i;
                let y = this.state.curY + j;
                if (!this.squareEmpty(x, y)) return true;
            }
        }
    }
    return false;
}

tetris_engine.prototype.freeze = function() {
    let piece = this.state.curPiece;
    let rot = this.state.curRot;
    for (let i = 0; i < PIECES[piece][rot].length; i++) {
        for (let j = 0; j < PIECES[piece][rot][i].length; j++) {
            if (PIECES[piece][rot][i][j]) {
                let x = this.state.curX + i;
                let y = this.state.curY + j;
                this.state.board[x][y] = piece;
            }
        }
    }
}

tetris_engine.prototype.tick = function() {
    this.state.curY--;
    if (this.intersectionExists()) {
        this.state.curY++;
        this.freeze();
        this.newFallingPiece();
    }
}

tetris_engine.prototype.left = function() {
    this.state.curX--;
    if (this.intersectionExists()) {
        this.state.curX++;
        return false;
    }
    return true;
}

tetris_engine.prototype.right = function() {
    this.state.curX++;
    if (this.intersectionExists()) {
        this.state.curX--;
        return false;
    }
    return true;
}

tetris_engine.prototype.down = function() {
    while (!this.intersectionExists()) {
        this.state.curY--;
    }
    this.state.curY++;
    this.freeze();
    this.newFallingPiece();
}
