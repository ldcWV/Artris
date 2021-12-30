function start() {
    const tile_size_px = 20;
    const sidebar_width_px = 100;
    const canvas_width = BOARD_WIDTH * tile_size_px + sidebar_width_px;
    const canvas_height = BOARD_HEIGHT * tile_size_px;

    let gameCanvas = document.getElementById('game-canvas');
    gameCanvas.width = canvas_width;
    gameCanvas.height = canvas_height;
    let gameContext = gameCanvas.getContext('2d');

    function draw(state) {
        // background
        gameContext.fillStyle = BG_COLOR;
        gameContext.fillRect(0,0,canvas_width-sidebar_width_px,canvas_height);

        // current squares on board
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_HEIGHT; j++) {
                if (state.board[i][j] != PIECE_NULL) {
                    gameContext.fillStyle = PIECE_COLORS[state.board[i][j]];
                    gameContext.fillRect(i*tile_size_px, tile_size_px*(BOARD_HEIGHT-j-1), tile_size_px, tile_size_px);
                }
            }
        }

        // falling piece shadow
        gameContext.globalAlpha = 0.5;
        let dropAmount = BOARD_HEIGHT;
        for (let i = 0; i < PIECES[state.curPiece][state.curRot].length; i++) {
            for (let j = 0; j < PIECES[state.curPiece][state.curRot][i].length; j++) {
                if (PIECES[state.curPiece][state.curRot][i][j]) {
                    let x = state.curX + i;
                    let y = state.curY + j;
                    dropAmount = Math.min(dropAmount, y - state.getHeight(x));
                }
            }
        }
        for (let i = 0; i < PIECES[state.curPiece][state.curRot].length; i++) {
            for (let j = 0; j < PIECES[state.curPiece][state.curRot][i].length; j++) {
                if (PIECES[state.curPiece][state.curRot][i][j]) {
                    let x = state.curX + i;
                    let y = state.curY + j - dropAmount;
                    gameContext.fillStyle = PIECE_COLORS[state.curPiece];
                    gameContext.fillRect(x*tile_size_px, tile_size_px*(BOARD_HEIGHT-y-1), tile_size_px, tile_size_px);
                }
            }
        }
        gameContext.globalAlpha = 1;

        // falling piece
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
    }

    let engine = new tetris_engine();
    let ai = new tetris_ai(engine);

    function tickHandler() {
        engine.tick();
        //draw(engine.state);
    }
    setInterval(tickHandler, 500);

    function tmp() {
        draw(engine.state);
    }
    setInterval(tmp, 10);

    ai.start();
    
    /*document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case "Down": // IE/Edge specific
            case "ArrowDown":
                engine.down();
                draw(engine.state);
                break;
            case "Left":
            case "ArrowLeft":
                engine.left();
                draw(engine.state);
                break;
            case "Right":
            case "ArrowRight":
                engine.right();
                draw(engine.state);
                break;
            case "c":
                engine.rotateRight();
                draw(engine.state);
                break;
            case "x":
                engine.rotate180();
                draw(engine.state);
                break;
            case "z":
                engine.rotateLeft();
                draw(engine.state);
                break;
            case "r":
                engine.restart();
                draw(engine.state);
                break;
        }
    });*/
}
