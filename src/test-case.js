const game = require("./game");
const { CONSTANTS } = require("./constants");

function getTestCaseList(inputData) {
  const dataRows = inputData.split("\r\n");

  if (dataRows.length === 0 || Number(dataRows[0]) === NaN || Number(dataRows[0]) < CONSTANTS.MIN_TEST_CASE_NUMBER || Number(dataRows[0]) > CONSTANTS.MAX_TEST_CASE_NUMBER) {
    throw new Error("Incorrect number of test cases");
  }

  const testCaseNumber = Number(dataRows[0]);

  if (dataRows.length !== testCaseNumber * CONSTANTS.MATRIX_SIZE + 1) {
    throw new Error("Incorrect test cases");
  }

  const testCaseList = [];
  let testCase = [];

  for (let i = 1; i < dataRows.length; i++) {
    const row = dataRows[i].split(' ');

    if (row.some(value => Number(value) === NaN || Number(value) < 0 || Number(value) > 2) || row.length !== CONSTANTS.MATRIX_SIZE) {
      throw new Error("Incorrect test cases");
    }

    testCase.push(row.map(value => Number(value)));

    if ( i % CONSTANTS.MATRIX_SIZE === 0) {
      testCaseList.push(testCase);
      testCase = [];
    }
  }

  return testCaseList;
}

function runTestCase(testCaseData) {
  const winner = game.start(testCaseData);

  console.log(winner.value);
  
  if (winner.position) {
    console.log(`${winner.position.row} ${winner.position.column}`);
  }
}

module.exports = {
  getTestCaseList,
  runTestCase
};