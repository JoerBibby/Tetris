//  need to figure out how to create the game loop and have the tetraminos 
// fall down. 





const cols = 10;
const rows = 20;
const block_size = 30;
var time = { start: 0, elapsed: 0, level: 1000};


const canvas = document.getElementById("board");

const context = canvas.getContext("2d");


//calculate size of canvas 
context.canvas.width = block_size * cols;
context.canvas.height = block_size * rows;

//scale blocks
context.scale(block_size, block_size);

let board = new Board();

function play(){
    board.reset();
    let piece = new Piece(context);
    
    board.piece = piece;
    board.animate();
}

const moves = {
    [KEY.UP]: p => board.piece.rotate(p),
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
    [KEY.SPACE]: p => ({ ...p, y: p.y + 1})
};

document.addEventListener("keydown", event => {
    if(moves[event.key]){
        
        //prevent event from bubbling 
       event.preventDefault();
        //get new state of piece
        let p = moves[event.key](board.piece);
        
        if (board.valid(p)){ 

            board.piece.move(p);
            //clear old piece 
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                
            board.piece.draw();
        }

        if (event.key === KEY.SPACE){
            // Hard drop 
            while (board.valid(p)){
                board.piece.move(p);
                p = moves[KEY.DOWN](board.piece);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                board.piece.draw();
            }
        }
    }; 
        
    
});






