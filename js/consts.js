const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 22;

const NUM_PIECE_TYPES = 7;
const PIECE_NULL = 0;
const PIECE_I = 1;
const PIECE_O = 2;
const PIECE_T = 3;
const PIECE_S = 4;
const PIECE_Z = 5;
const PIECE_J = 6;
const PIECE_L = 7;

const NUM_NEXT_PIECES = 3;

const BG_COLOR = 'rgb(64,64,64)';
const PIECE_COLORS = ['', 'rgb(0,255,255)','rgb(255,255,0)','rgb(102,0,204)','rgb(0,255,0)','rgb(255,0,0)','rgb(0,0,255)','rgb(255,153,0)'];

// https://tetris.fandom.com/wiki/SRS?file=SRS-pieces.png
const PIECES = [
    // null
    [],
    // I
    [
        [
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0],
            [0,0,1,0]
        ],
        [
            [0,0,0,0],
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0]
        ],
        [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ],
    // O
    [
        [
            [0,0,0],
            [0,1,1],
            [0,1,1],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,1,1],
            [0,1,1],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,1,1],
            [0,1,1],
            [0,0,0]
        ],
        [
            [0,0,0],
            [0,1,1],
            [0,1,1],
            [0,0,0]
        ]
    ],
    // T
    [
        [
            [0,1,0],
            [0,1,1],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,0],
            [0,1,0]
        ],
        [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ]
    ],
    // S
    [
        [
            [0,1,0],
            [0,1,1],
            [0,0,1]
        ],
        [
            [0,0,0],
            [0,1,1],
            [1,1,0]
        ],
        [
            [1,0,0],
            [1,1,0],
            [0,1,0]
        ],
        [
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ]
    ],
    // Z
    [
        [
            [0,0,1],
            [0,1,1],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,0],
            [0,1,1]
        ],
        [
            [0,1,0],
            [1,1,0],
            [1,0,0]
        ],
        [
            [1,1,0],
            [0,1,1],
            [0,0,0]
        ]
    ],
    // J
    [
        [
            [0,1,1],
            [0,1,0],
            [0,1,0]
        ],
        [
            [0,0,0],
            [1,1,1],
            [0,0,1]
        ],
        [
            [0,1,0],
            [0,1,0],
            [1,1,0]
        ],
        [
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ]
    ],
    // L
    [
        [
            [0,1,0],
            [0,1,0],
            [0,1,1]
        ],
        [
            [0,0,0],
            [1,1,1],
            [1,0,0]
        ],
        [
            [1,1,0],
            [0,1,0],
            [0,1,0]
        ],
        [
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ]
    ]
];