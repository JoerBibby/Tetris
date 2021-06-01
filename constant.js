


// key words to access arrowkeys and space for the event listener
const KEY = {
    UP: "ArrowUp",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    SPACE: " "
}
Object.freeze(KEY);
// colours of the different pieces 
const COLORS = [
    "cyan",
    "blue",
    "orange",
    "yellow",
    "green",
    "purple",
    "red"
];
// the different shaped pieces represented in thier matrix form (how they will appear in the grid)
const SHAPES = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    [
        [4, 4],
        [4, 4]
    ],
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
]

