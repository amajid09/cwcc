#!/usr/bin/env node

import FileParser from "./file.js";
import InputParser from "./input.js";

const interactive = process.stdin.isTTY;

const argOne = process.argv[2];
const argTwo = process.argv[3];
if (interactive) {
  const file = new FileParser(argOne, argTwo);
  file.processFile();
} else {
  let data = "";
  const option = process.argv.slice(-1)[0];
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    data += chunk;
  });
  process.stdin.on("end", () => {
    const inputParser = new InputParser(data, option);
    inputParser.processData();
  });
}
