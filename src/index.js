const file = require("./file");
const testCase = require("./test-case");

function runTestCases() {
  try {
    const filePath = file.getFilePath();
    const inputData = file.readFile(filePath);
    const testCaseList = testCase.getTestCaseList(inputData);
    
    testCaseList.forEach((testCaseData, index) => {
      console.log(`Test case ${index + 1}:`);
      testCase.runTestCase(testCaseData);
    });
  } catch (error) {
    console.log(error.message)
    runTestCases();
  }
}

runTestCases();