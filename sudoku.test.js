import {solveSudoku} from './sudoku';

const sudoku = [
    [0,0,8,4,0,3,5,0,6],
    [0,0,3,1,0,2,0,0,4],
    [0,4,5,7,0,0,0,9,0],
    [6,9,0,0,0,5,0,0,7],
    [0,8,0,0,0,0,0,5,0],
    [4,0,0,3,0,0,0,1,8],
    [0,7,0,0,0,6,2,4,0],
    [1,0,0,5,0,7,8,0,0],
    [8,0,6,9,0,1,3,0,0]
];

test('sudoku solution not null', () => {
    const solvedSudoku = solveSudoku(sudoku);
    expect(solvedSudoku).not.toBe(null);
});

test('solved sudoku rows sum 45', () => {
    const solvedSudoku = solveSudoku(sudoku);
    solvedSudoku.forEach( row => {
        let sum = 0;
        row.forEach(cell => sum+=cell);
        expect(sum).toBe(45);
    })
});
