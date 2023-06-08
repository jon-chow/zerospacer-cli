#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const zeroify_1 = require("./commands/zeroify");
const program = new commander_1.Command();
console.log(chalk_1.default.cyan(figlet_1.default.textSync("Zerospacer CLI")));
program
    .version("1.0.0")
    .description("Adds zero-width whitespaces to a project")
    .option("-i, --input <file>", "Input file")
    .option("-o, --output <file>", "Output file")
    .option("-u, --undo", "Undoes zero-width whitespacing")
    .action((options) => {
    // If no arguments are passed, output the help menu.
    if (process.argv.slice(2).length === 0) {
        program.outputHelp();
        return;
    }
    // Zeroify the input file.
    (0, zeroify_1.zeroify)(options);
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map