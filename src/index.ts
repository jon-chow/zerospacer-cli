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
	.option("-u, --undo", "Undoes zero-width whitespacing")
	.parse(process.argv);
  

const options = program.opts();

if (!options.input) {
	console.log(chalk.red("Error: You must specify an input file!"));
	process.exit(1);
};

if (!options.output) {
	options.output = options.input;
};

console.log(options);

zeroify(options);
