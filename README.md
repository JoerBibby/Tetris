Tetris 

This is a JavaScript Tetris game that uses a matrix to represent the logic of tetrominoes and their movement, and uses the canvas element to render this logic for the user. Moving left for example would involve first validating the move then taking 1 from all x coordinates of the constituent squares which make up the piece then erasing the old piece and drawing it anew. 

Particular challenges came in the form of the Maths involved in rotating a piece, and the conceptual difficulties of setting up the game loop using requestAnimationFrame(). This project also offered valuable experience manipulatingarrays and working with classes. 

In the future I would like to add the functionality to have a line vanish when it is filled with squares like in real Tetris, as well as point scoring and levels. 
