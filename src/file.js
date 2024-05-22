const prompt = require("prompt-sync")({ sigint: true });
const fs = require('fs');
const { CONSTANTS } = require("./constants");

function getFilePath() {
  const filePath = prompt("Enter path to file (txt): ");
  
  if (!filePath.endsWith('.txt')) {
    console.log("Error: Incorrect file format");
    return getFilePath();
  }

  return filePath;
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  } catch (e) {
    throw new Error(`Error while reading file or file was not found`);
  }
}

module.exports = {
  getFilePath,
  readFile
};