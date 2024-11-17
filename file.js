import fs from "node:fs/promises";
class FileParser {
  constructor(argOne, argTwo) {
    this.argOne = argOne;
    this.argTwo = argTwo;
  }
  getOptions() {
    const options = ["-c", "-w", "-l", "-m"];

    if (options.includes(this.argOne)) {
      return this.argOne;
    } else if (options.includes(this.argTwo)) {
      return this.argTwo;
    } else {
      return "";
    }
  }
  getFile() {
    if (this.argOne.includes(".txt")) {
      return this.argOne;
    } else if (this.argTwo.includes(".txt")) {
      return this.argTwo;
    } else {
      return "";
    }
  }

  async getFileBytes(file) {
    try {
      const stat = await fs.stat(file);
      const [_, filename] = file.split("/");
      console.log(`${stat.size} ${filename}`);
    } catch (error) {
      console.error(error);
    }
  }
  async getWords(data) {
    const words = data.split(/[\s,]+/).filter((item) => item != "");
    return words.length;
  }

  async getChars(data) {
    const char = data.split("");
    return char.length;
  }
  async getNumberOfLines(data) {
    const lines = data.split("\n");
    return lines.length;
  }

  readFile = async (file) => {
    const name = file.split("/")[1];
    try {
      const data = await fs.readFile(file, "utf8");
      return { data, name };
    } catch (error) {
      console.error(error);
      return { data: "", name };
    }
  };

  async processFile() {
    const file = this.getFile();
    const option = this.getOptions();
    const { data, name } = await this.readFile(file);
    if (option === "-c") {
      const bytes = await this.getFileBytes(file);
      console.log(`${bytes} ${name}`);
    } else if (option === "-l") {
      const lines = await this.getNumberOfLines(data);
      console.log(`${lines} ${name}`);
    } else if (option === "-w") {
      const words = await this.getWords(data);
      console.log(`${words} ${name}`);
    } else if (option === "-m") {
      const chars = await this.getChars(data);
      console.log(`${chars} ${name}`);
    } else {
      const chars = await this.getChars(data);
      const lines = await this.getNumberOfLines(data);
      const words = await this.getWords(data);

      console.log(`${chars} ${lines} ${words}   ${name}`);
    }
  }
}
export default FileParser;
