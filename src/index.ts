import { Command, OptionValues } from "commander";
import chalk from "chalk";
import figlet from "figlet";

import { zeroify } from "./commands/zeroify";


const program = new Command();

console.log(chalk.cyan(figlet.textSync(
	"Zerospacer CLI"
)));

program
	.version("1.0.0")
	.description("Adds zero-width whitespaces to a project")
	.option("-i, --input <file>", "Input file")
	.option("-o, --output <file>", "Output file")
	.option("-u, --undo", "Undoes zero-width whitespacing")
	.action((options: OptionValues) => {
		// If no arguments are passed, output the help menu.
		if (process.argv.slice(2).length === 0) {
			program.outputHelp();
			return;
		};

		zeroify(options);
	})
	.parse(process.argv);
