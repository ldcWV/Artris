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
    if (this.state.board[x][y] != PIECE_NULL) return false;
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

tetris_engine.prototype.clearEmptyRows = function() {
    let cnt = 0;
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        let full = true;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (this.state.board[x][y] == PIECE_NULL) full = false;
        }
        if (full) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                this.state.board[x][y] = PIECE_NULL;
            }
            cnt++;
        } else {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                this.state.board[x][y - cnt] = this.state.board[x][y];
                if (cnt != 0) this.state.board[x][y] = PIECE_NULL;
            }
        }
    }
    console.log(cnt);
    return cnt;
}

tetris_engine.prototype.tick = function() {
    this.state.curY--;
    if (this.intersectionExists()) {
        this.state.curY++;
        this.freeze();
        this.clearEmptyRows();
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
    this.clearEmptyRows();
    this.newFallingPiece();
}

tetris_engine.prototype.try_wallkicks = function(wallkicks) {
    for (let i = 0; i < wallkicks.length; i++) {
        this.state.curX += wallkicks[i][0];
        this.state.curY += wallkicks[i][1];
        if (!this.intersectionExists()) {
            return true;
        }
        this.state.curX -= wallkicks[i][0];
        this.state.curY -= wallkicks[i][1];
    }
    return false;
}

tetris_engine.prototype.rotateRight = function() {
    let oldRot = this.state.curRot;
    this.state.curRot = (this.state.curRot + 1) % 4;
    if (!this.intersectionExists()) return true;
    let res = this.try_wallkicks(this.state.curPiece == PIECE_I ? WALLKICK_I_90[oldRot] : WALLKICK_NORMAL_90[oldRot]);
    if (!res) this.state.curRot = oldRot;
    return res;
}

tetris_engine.prototype.rotate180 = function() {
    let oldRot = this.state.curRot;
    this.state.curRot = (this.state.curRot + 2) % 4;
    if (!this.intersectionExists()) return true;
    let res = this.try_wallkicks(this.state.curPiece == PIECE_I ? WALLKICK_I_180[oldRot] : WALLKICK_NORMAL_180[oldRot]);
    if (!res) this.state.curRot = oldRot;
    return res;
}

tetris_engine.prototype.rotateLeft = function() {
    let oldRot = this.state.curRot;
    this.state.curRot = (this.state.curRot + 3) % 4;
    if (!this.intersectionExists()) return true;
    let res = this.try_wallkicks(this.state.curPiece == PIECE_I ? WALLKICK_I_270[oldRot] : WALLKICK_NORMAL_270[oldRot]);
    if (!res) this.state.curRot = oldRot;
    return res;
}

tetris_engine.prototype.restart = function() {
    for (let i = 0; i < BOARD_WIDTH; i++) {
        for (let j = 0; j < BOARD_HEIGHT; j++) {
            this.state.board[i][j] = PIECE_NULL;
        }
    }
    for (let i = 0; i < NUM_NEXT_PIECES; i++) {
        this.state.nextPieces[i] = this.rng.gen();
    }
    this.newFallingPiece();
}
