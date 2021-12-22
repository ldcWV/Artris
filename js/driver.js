const board_width = 10;
const board_height = 22;
const tile_size_px = 20;
const sidebar_width_px = 100;
const canvas_width = board_width * tile_size_px + sidebar_width_px;
const canvas_height = board_height * tile_size_px;

const background_color = 'rgb(64,64,64)';
// empty, i, o, t, s, z, j, l
const piece_colors = ['', 'rgb(0,255,255)','rgb(255,255,0)','rgb(102,0,204)','rgb(0,255,0)','rgb(255,0,0)','rgb(0,0,255)','rgb(255,153,0)'];

function start() {
    let gameCanvas = document.getElementById('game-canvas');
    gameCanvas.width = canvas_width;
    gameCanvas.height = canvas_height;
    let gameContext = gameCanvas.getContext('2d');

    function draw(state) {
        gameContext.fillStyle = background_color;
        gameContext.fillRect(0,0,canvas_width-sidebar_width_px,canvas_height);
        for (var i = 0; i < board_width; i++) {
            for (var j = 0; j < board_height; j++) {
                if (state.board[i][j] != 0) {
                    gameContext.fillStyle = piece_colors[state.board[i][j]];
                    gameContext.fillRect(i*tile_size_px, tile_size_px*(board_height-j-1), tile_size_px, tile_size_px);
                }
            }
        }
    }

    let state = new tetris_state(board_width, board_height);
    state.board[0][0] = 1;
    state.board[1][0] = 4;
    state.board[0][1] = 3;
    state.board[0][2] = 1;
    state.board[0][3] = 3;
    state.board[0][4] = 2;
    state.board[0][6] = 1;
    state.board[0][9] = 5;
    state.board[9][0] = 5;
    state.board[0][21] = 6;
    state.board[9][21] = 1;
    draw(state);
}
