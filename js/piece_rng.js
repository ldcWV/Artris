function piece_rng() {
    let arr = new Array(NUM_PIECE_TYPES);
    for (let i = 0; i < NUM_PIECE_TYPES; i++) {
        arr[i] = i+1;
    }

    function shuffle() {
        for (let i = NUM_PIECE_TYPES-1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }

    shuffle(arr);

    let cur_idx = 0;

    this.gen = function() {
        if (cur_idx == NUM_PIECE_TYPES) {
            shuffle(arr);
            cur_idx = 0;
        }
        return arr[cur_idx++];
    }
}