class Piece {
    constructor(context){
        this.context = context;
        const typeId = this.randomizeTetraminoType(COLORS.length);
        this.color = COLORS[typeId];
        this.shape = SHAPES[typeId];
            
        //starting position
        this.x = 3;
        this.y = 0;
    }
    draw(){
        this.context.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) =>{
                if(value > 0){
                    this.context.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
        board.drawBoard();
    }
    move(p){
        this.x = p.x;
        this.y = p.y;
    }
    rotate(p){
        
        // clone with json for immutability
        let clone = JSON.parse(JSON.stringify(p));
        //Do algorithm
        for (let y = 0; y < p.shape.length; y++){
            for (let x = 0; x < y; x++){
                [p.shape[x][y], p.shape[y][x]] =
                [p.shape[y][x], p.shape[x][y]];
            }
        }
        //reverse the order of the columns
        p.shape.forEach(row => row.reverse());

        return clone;
        
        
    }
    
    randomizeTetraminoType(noOfTypes){
        return Math.floor(Math.random() * noOfTypes);
    }
}

