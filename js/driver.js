function start() {
    const tile_size_px = 20;
    const sidebar_width_px = 100;
    const canvas_width = BOARD_WIDTH * tile_size_px + sidebar_width_px;
    const canvas_height = BOARD_HEIGHT * tile_size_px;

    let gameCanvas = document.getElementById('game-canvas');
    gameCanvas.width = canvas_width;
    gameCanvas.height = canvas_height;
    let gameContext = gameCanvas.getContext('2d', {alpha: false});

    function draw(state) {
        gameContext.save();

        gameContext.fillStyle = BG_COLOR;
        gameContext.fillRect(0,0,canvas_width-sidebar_width_px,canvas_height);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_HEIGHT; j++) {
                if (state.board[i][j] != 0) {
                    gameContext.fillStyle = PIECE_COLORS[state.board[i][j]];
                    gameContext.fillRect(i*tile_size_px, tile_size_px*(BOARD_HEIGHT-j-1), tile_size_px, tile_size_px);
                }
            }
        }
        for (let i = 0; i < PIECES[state.curPiece][state.curRot].length; i++) {
            for (let j = 0; j < PIECES[state.curPiece][state.curRot][i].length; j++) {
                if (PIECES[state.curPiece][state.curRot][i][j]) {
                    let x = state.curX + i;
                    let y = state.curY + j;
                    gameContext.fillStyle = PIECE_COLORS[state.curPiece];
                    gameContext.fillRect(x*tile_size_px, tile_size_px*(BOARD_HEIGHT-y-1), tile_size_px, tile_size_px);
                }
            }
        }
        gameContext.restore();
    }

    let engine = new tetris_engine();

    function tickHandler() {
        engine.tick();
        draw(engine.state);
    }
    setInterval(tickHandler, 500);
    
    document.addEventListener('keydown', function(event) {
        switch(event.which) {
            case 40: // down
                engine.down();
                break;
            case 37: //left
                engine.state.curX--;
                //engine.left();
                break;
            case 39: //right
                engine.state.curX++;
                //engine.right();
                break;
        }
    });
}
