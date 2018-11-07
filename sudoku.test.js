import { solveSudoku } from "./sudoku";

const unsolvedSudoku = [
  [0, 0, 8, 4, 0, 3, 5, 0, 6],
  [0, 0, 3, 1, 0, 2, 0, 0, 4],
  [0, 4, 5, 7, 0, 0, 0, 9, 0],
  [6, 9, 0, 0, 0, 5, 0, 0, 7],
  [0, 8, 0, 0, 0, 0, 0, 5, 0],
  [4, 0, 0, 3, 0, 0, 0, 1, 8],
  [0, 7, 0, 0, 0, 6, 2, 4, 0],
  [1, 0, 0, 5, 0, 7, 8, 0, 0],
  [8, 0, 6, 9, 0, 1, 3, 0, 0]
];

test("solved sudoku columns sum 45", () => {
  const sudoku = unsolvedSudoku;
  if (solveSudoku(sudoku, 0, 0)) {
    for (let i = 0; i < 9; i++) {
      let sum = 0;
      for (let j = 0; j < 9; j++) {
        sum += sudoku[j][i];
      }
      expect(sum).toBe(45);
    }
  }
});

test("solved sudoku rows sum 45", () => {
  const sudoku = unsolvedSudoku;
  if (solveSudoku(sudoku, 0, 0)) {
    sudoku.forEach(row => {
      let sum = 0;
      row.forEach(cell => (sum += cell));
      expect(sum).toBe(45);
    });
  }
});

test("solved sudoku 3x3 boxes sum 45", () => {
  const sudoku = unsolvedSudoku;
  if (solveSudoku(sudoku, 0, 0)) {
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        expect(getBoxSum(sudoku, i, j)).toBe(45);
      }
    }
  }
});

test("each solved sudoku row has all numbers from 1 to 9", () => {
  const sudoku = unsolvedSudoku;
  if (solveSudoku(sudoku, 0, 0)) {
    sudoku.forEach(row => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      row.forEach(cell => {
        const index = numbers.indexOf(cell);
        if (index !== -1) {
          numbers.splice(index, 1);
        }
      });
      expect(numbers.length).toBe(0);
    });
  }
});

test("each solved sudoku column has all numbers from 1 to 9", () => {
  const sudoku = unsolvedSudoku;
  if (solveSudoku(sudoku, 0, 0)) {
    for (let i = 0; i < 9; i++) {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let j = 0; j < 9; j++) {
        const index = numbers.indexOf(sudoku[j][i]);
        if (index !== -1) {
          numbers.splice(index, 1);
        }
      }
      expect(numbers.length).toBe(0);
    }
  }
});

test("each solved sudoku 3x3 box has all numbers from 1 to 9", () => {
  const sudoku = unsolvedSudoku;
  if (solveSudoku(sudoku, 0, 0)) {
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        //Expect no remaining numbers
        expect(getBoxRemainingNumbers(sudoku, i, j)).toBe(0);
      }
    }
  }
});

/**
 *
 * HELPERS
 *
 */

function getBoxRemainingNumbers(grid, row, col) {
  if (row > 6 || row < 0 || col < 0 || col > 6) return 9;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      const index = numbers.indexOf(grid[i][j]);
      if (index !== -1) {
        numbers.splice(index, 1);
      }
    }
  }
  return numbers.length;
}

function getBoxSum(grid, row, col) {
  if (row > 6 || row < 0 || col < 0 || col > 6) return 0;
  let sum = 0;
  for (let i = row; i < row + 3; i++) {
    for (let j = col; j < col + 3; j++) {
      sum += grid[i][j];
    }
  }
  return sum;
}
