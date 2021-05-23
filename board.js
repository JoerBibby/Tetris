
// function Animate(p){
//     while (board.valid(p)){
//         setInterval(p => ({ ...p, x: p.x - 1}), 1000);
//     }
// }
    

class Board {
    //reset when new game starts 

    reset(){
        this.grid = this.getEmptyBoard();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
    //get 20 * 10 matrix filled with 0s
    getEmptyBoard(){
        return Array.from(
            {length: rows}, () => Array(cols).fill(0)
        );
    }
    isEmpty(value){
        return value === 0;
    }
    insideWalls(x){
        return (x >= 0 && x <= 9 );
    }
    aboveFloor(y){
        return (y <= 19);
    }
    notOccupied(x, y){
        return this.grid[y] && this.grid[y][x] === 0;
    }
    //check for colisions when moving a piece
    valid(p, board) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    this.isEmpty(value) ||
                    (this.insideWalls(x) &&
                    this.aboveFloor(y) && this.notOccupied(x, y))
                );
            });
        });

        
    }
    reallyAboveFloor(p){
        return p.shape.every((row, dy) => {
            let y = p.y + dy;
            return this.aboveFloor(y);
        })
    }
    animate(now = 0){
        
        time.elapsed = now - time.start;

        if(time.elapsed > time.level){
            time.start = now;
            this.drop();
        }

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        // need to freeze only once the piece has hit the bottom 
        // if(!this.valid(this.piece)){
        //     this.freeze();
        //     console.table(this.grid);
        // }
        
        
        this.piece.draw();

        requestAnimationFrame(this.animate.bind(this));

        // requestId = requestAnimationFrame(animate);
       
    }

    freeze(){
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0){
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });

        let piece = new Piece(context);
    
         board.piece = piece;
    }

    drop(){
        let p = moves[KEY.DOWN](this.piece);

        if(this.valid(p)){
            this.piece.move(p);
        }else{
            this.freeze();
        }
    }

    drawBoard(){
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value > 0){
                    context.fillStyle = COLORS[value - 1];
                    context.fillRect(x, y, 1, 1);
                }
            });
        });

        
    }
}