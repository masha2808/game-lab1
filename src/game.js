const { CONSTANTS } = require("./constants");

function start(data) {
  return findWinner(data);
};

function findWinner(data) {
  for (let i = 0; i < CONSTANTS.MATRIX_SIZE; i++) {
    for (let j = 0; j < CONSTANTS.MATRIX_SIZE; j++) {
      if (data[i][j] !== 0 && (checkRow(data, i, j) || checkColumn(data, i, j) || checkRightDiagonal(data, i, j) || checkLeftDiagonal(data, i, j))) {
        return {
          value: data[i][j],
          position: {
            row: i + 1,
            column: j + 1
          }
        };
      }
    }
  }

  return {
    value: 0
  };
}

function checkRow(data, i, j) {
  return j + CONSTANTS.STEP < CONSTANTS.MATRIX_SIZE && 
    checkRowByStep(data, i, j, CONSTANTS.STEP) && 
    checkWinner(checkRowByStep, data, i, j, CONSTANTS.STEP - 1);
}

function checkColumn(data, i, j) {
  return i + CONSTANTS.STEP < CONSTANTS.MATRIX_SIZE && 
    checkColumnByStep(data, i, j, CONSTANTS.STEP) && 
    checkWinner(checkColumnByStep, data, i, j, CONSTANTS.STEP - 1);
}

function checkRightDiagonal(data, i, j) {
  return j + CONSTANTS.STEP < CONSTANTS.MATRIX_SIZE && 
    i + CONSTANTS.STEP < CONSTANTS.MATRIX_SIZE && 
    checkRightDiagonalByStep(data, i, j, CONSTANTS.STEP) && 
    checkWinner(checkRightDiagonalByStep, data, i, j, CONSTANTS.STEP - 1);
}

function checkLeftDiagonal(data, i, j) {
  return j - CONSTANTS.STEP >= 0 && 
    i + CONSTANTS.STEP < CONSTANTS.MATRIX_SIZE && 
    checkLeftDiagonalByStep(data, i, j, CONSTANTS.STEP) && 
    checkWinner(checkLeftDiagonalByStep, data, i, j, CONSTANTS.STEP - 1);
}

function checkRowByStep(data, i, j, step) {
  return data[i][j] === data[i][j + step];
}

function checkColumnByStep(data, i, j, step) {
  return data[i][j] === data[i + step][j];
}

function checkRightDiagonalByStep(data, i, j, step) {
  return data[i][j] === data[i + step][j + step];
}

function checkLeftDiagonalByStep(data, i, j, step) {
  return data[i][j] === data[i + step][j - step];
}

function checkWinner(check, data, i, j, maxStep) {
  return Array.from({ length: maxStep }, (_, i) => i + 1)
    .every(step => check(data, i, j, step));
}

module.exports = {
  start
};