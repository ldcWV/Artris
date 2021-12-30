function tetris_ai(engine) {
    this.engine = engine;
    this.move_queue = [];
}

function evaluate(state) {
    function aggregateHeight() {
        let res = 0;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            res += state.getHeight(x);
        }
        return res;
    }

    function holes() {
        let res = 0;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let cur_blank = 0;
            for (let y = 0; y < BOARD_HEIGHT; y++) {
                if (state.board[x][y]) {
                    res += cur_blank;
                    cur_blank = 0;
                } else {
                    cur_blank++;
                }
            }
        }
        return res;
    }

    function bumpiness() {
        let res = 0;
        let prev = -1;
        for (let x = 0; x < BOARD_WIDTH; x++) {
            let height = state.getHeight(x);
            if (prev != -1) {
                res += Math.abs(height - prev);
            }
            prev = height;
        }
        return res;
    }

    return -aggregateHeight() - holes() - bumpiness();
}

const MOVE_LEFT = 0;
const MOVE_RIGHT = 1;
const MOVE_DOWN = 2;
const MOVE_ROTLEFT = 3;
const MOVE_ROTRIGHT = 4;
const MOVE_ROT180 = 5;

tetris_ai.prototype.plan_moves = function() {
    function eval(state, depth) {
        if (depth == 0) {
            return [evaluate(state), []];
        } else {
            // Try all plans and pick the best one.
            let res = [Number.NEGATIVE_INFINITY, []];
            for (let rot = 0; rot < 4; rot++) {
                for (let offset = -BOARD_WIDTH/2; offset < BOARD_WIDTH/2; offset++) {
                    let temp_engine = new tetris_engine();
                    temp_engine.state = state.clone();
                    let cur_plan = [];

                    if (rot == 1) {
                        temp_engine.rotateLeft();
                        cur_plan.push(MOVE_ROTLEFT);
                    } else if (rot == 2) {
                        temp_engine.rotateRight();
                        cur_plan.push(MOVE_ROTRIGHT);
                    } else if (rot == 3) {
                        temp_engine.rotate180();
                        cur_plan.push(MOVE_ROT180);
                    }
                    if (offset < 0) {
                        for (let i = 0; i < -offset; i++) {
                            temp_engine.left();
                            cur_plan.push(MOVE_LEFT);
                        }
                    } else if (offset > 0) {
                        for (let i = 0; i < offset; i++) {
                            temp_engine.right();
                            cur_plan.push(MOVE_RIGHT);
                        }
                    }
                    temp_engine.down();
                    cur_plan.push(MOVE_DOWN);

                    let score = eval(temp_engine.state, depth - 1)[0];
                    if (score > res[0]) {
                        res[0] = score;
                        res[1] = cur_plan;
                    }
                }
            }
            console.log(res);
            return res;
        }
    }
    
    let best_plan = eval(this.engine.state, 1)[1];
    for (let i = 0; i < best_plan.length; i++) {
        this.move_queue.push(best_plan[i]);
    }
    console.log(this.move_queue);
}

tetris_ai.prototype.move = function() {
    if (this.move_queue.length == 0) {
        this.plan_moves();
    }
    let move = this.move_queue.shift(); // pop out the move
    console.log(move);
    switch (move) {
        case MOVE_LEFT:
            this.engine.left();
            break;
        case MOVE_RIGHT:
            this.engine.right();
            break;
        case MOVE_DOWN:
            this.engine.down();
            break;
        case MOVE_ROTLEFT:
            this.engine.rotateLeft();
            break;
        case MOVE_ROTRIGHT:
            this.engine.rotateRight();
            break;
        case MOVE_ROT180:
            this.engine.rotate180();
            break;
    }
}

tetris_ai.prototype.start = function() {
    setInterval(this.move.bind(this), 200);
}
