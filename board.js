


class Board {
     
    // get new matrix to represent game logic, clear the canvas to get rid of previously played pieces 
    reset() {
        this.grid = this.getEmptyBoard();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
    //get 20 * 10 matrix filled with 0s
    getEmptyBoard() {
        return Array.from(
            { length: rows }, () => Array(cols).fill(0)
        );
    }
    isEmpty(value) {
        return value === 0;
    }
    insideWalls(x) {
        return (x >= 0 && x <= 9);
    }
    aboveFloor(y) {
        return (y <= 19);
    }
    notOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }
    //check for colisions when moving a piece, return true if the proposed move does not place the piece either outside of the board 
    // or on top of another piece 
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
    reallyAboveFloor(p) {
        return p.shape.every((row, dy) => {
            let y = p.y + dy;
            return this.aboveFloor(y);
        })
    }
    // this creates the game loop 
    animate(now = 0) {
        time.elapsed = now - time.start;
        // after one second drop the piece 
        if (time.elapsed > time.level) {
            time.start = now;
            this.drop();
        }
        // clear and redraw the piece 
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);       

        this.piece.draw();
        // use requestAniamtionFrame to casue this function to be called repeatedly, causing the piece to gradually fall down the screen 
        requestAnimationFrame(this.animate.bind(this));        
    }
    
    freeze() {
        // permanently draw the piece on the board 
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
        // make a new piece which will fall from the top 
        let piece = new Piece(context);

        board.piece = piece;
    }

    drop() {
        // drop the piece one square if possible, if not (it has reached the bottom or has hit another piece), call freeze() which 
        // draws it permanently on the board 
        let p = moves[KEY.DOWN](this.piece);

        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
        }
    }

    drawBoard() {
        // if a value in the grid is > 0, draw it appropriately. Essentially convert the state of board logic into its corresponding 
        //visual representation
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    context.fillStyle = COLORS[value - 1];
                    context.fillRect(x, y, 1, 1);
                }
            });
        });


    }
}