class InputParser {
  constructor(data, option) {
    this.data = data;
    this.option = option;
  }
  getFileBytes() {
    try {
      const size = Buffer.byteLength(this.data, "utf8");
      return size;
    } catch (error) {
      console.error(error);
    }
  }
  getWords() {
    const words = this.data.split(/[\s,]+/).filter((item) => item != "");
    return words.length;
  }

  getChars() {
    const char = this.data.split("");
    return char.length;
  }
  getNumberOfLines() {
    const lines = this.data.split("\n");
    return lines.length;
  }

  processData() {
    if (this.option === "-c") {
      const bytes = this.getFileBytes();
      console.log(`${bytes}`);
    } else if (this.option === "-l") {
      const lines = this.getNumberOfLines();
      console.log(`${lines}`);
    } else if (this.option === "-w") {
      const words = this.getWords();
      console.log(`${words} `);
    } else if (this.option === "-m") {
      const chars = this.getChars();
      console.log(`${chars}`);
    } else {
      const chars = this.getChars();
      const lines = this.getNumberOfLines();
      const words = this.getWords();

      console.log(`${chars} ${lines} ${words}  `);
    }
  }
}

export default InputParser;
