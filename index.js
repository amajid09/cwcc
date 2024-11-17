#!/usr/bin/env node
const fs = require("node:fs").promises;
const argOne = process.argv[2];
const argTwo = process.argv[3];

const getOptions = () => {
  const options = ["-c", "-w", "-l", "-m"];

  if (options.includes(argOne)) {
    return argOne;
  } else if (options.includes(argTwo)) {
    return argTwo;
  } else {
    return "";
  }
};
const getFile = () => {
  if (argOne.includes(".txt")) {
    return argOne;
  } else if (argTwo.includes(".txt")) {
    return argTwo;
  } else {
    return "";
  }
};

const getFileBytes = async (file) => {
  try {
    const stat = await fs.stat(file);
    const [_, filename] = file.split("/");
    console.log(`${stat.size} ${filename}`);
  } catch (error) {
    console.error(error);
  }
};
const getWords = async (data) => {
  const words = data.split(/[\s,]+/).filter((item) => item != "");
  return words.length;
};

const getChars = async (data) => {
  const char = data.split("");
  return char.length;
};
const getNumberOfLines = async (data) => {
  const lines = data.split("\n");
  return lines.length;
};

const readFile = async (file) => {
  const name = file.split("/")[1];
  try {
    const data = await fs.readFile(file, "utf8");
    return { data, name };
  } catch (error) {
    console.error(error);
    return { data: "", name };
  }
};
const run = async () => {
  const file = getFile();
  const option = getOptions();
  const { data, name } = await readFile(file);
  if (option === "-c") {
    const bytes = await getFileBytes(file);
    console.log(`${bytes} ${name}`);
  } else if (option === "-l") {
    const lines = await getNumberOfLines(data);
    console.log(`${lines} ${name}`);
  } else if (option === "-w") {
    const words = await getWords(data);
    console.log(`${words} ${name}`);
  } else if (option === "-m") {
    const chars = await getChars(data);
    console.log(`${chars} ${name}`);
  } else {
    const chars = await getChars(data);
    const lines = await getNumberOfLines(data);
    const words = await getWords(data);

    console.log(`${chars} ${lines} ${words}   ${name}`);
  }
};

// process.stdin.setEncoding("utf8");
// process.stdin.on("data", (chunk) => {});

run();
