import { Command } from "commander";
import chalk from "chalk";
import figlet from "figlet";

import { zeroify } from "./commands/zeroify";


const program = new Command();

console.log(chalk.cyan(figlet.textSync(
	"Zeroify CLI"
)));

program
	.version("1.0.0")
	.description("Adds zero-width whitespaces to a project")
	.option("-i, --input <file>", "Input file")
	.option("-o, --output <file>", "Output file")
	.option("-r, --undo", "Undoes zero-width whitespacing")
	.action((options: ZeroifyOptions) => {
		zeroify(options);
	})
	.parse(process.argv);
  

  const options = program.opts();
  