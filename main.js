//  need to figure out how to create the game loop and have the tetraminos 
// fall down. 





const cols = 10;
const rows = 20;
const block_size = 30;
var time = { start: 0, elapsed: 0, level: 1000 };

// access canvas element
const canvas = document.getElementById("board");
// set the context as 2d so that we can draw on it 
const context = canvas.getContext("2d");


//calculate size of canvas 
context.canvas.width = block_size * cols;
context.canvas.height = block_size * rows;

// set the units of the canvas to be equal to the size of the blocks
context.scale(block_size, block_size);
// create board instance to access in play function 
let board = new Board();

function play() {
    // reset produces new logic matrix and clears the canvas for if a previous game was played 
    board.reset();
    // produce new piece and then initialize the game loop causing the piece to fall
    let piece = new Piece(context);
    board.piece = piece;
    board.animate();
}

const moves = {
    [KEY.UP]: p => board.piece.rotate(p),
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1 })
};
// add event listeners to the relevant keys 
document.addEventListener("keydown", event => {
    if (moves[event.key]) {

        //prevent event from bubbling 
        event.preventDefault();
        //get new state of piece
        let p = moves[event.key](board.piece);

        if (board.valid(p)) {

            board.piece.move(p);
            //clear old piece 
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            board.piece.draw();
        }

        if (event.key === KEY.SPACE) {
            // Hard drop 
            while (board.valid(p)) {
                board.piece.move(p);
                p = moves[KEY.DOWN](board.piece);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                board.piece.draw();
            }
        }
    };


});






