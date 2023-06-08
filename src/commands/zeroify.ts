import { OptionValues } from "commander";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { logError, logMessage } from "../utils/logger";


/**
 * @description Adds zero-width whitespaces to a project.
 * @param {*} options.input Input file
 * @param {*} options.output Output file
 * @param {*} options.undo Undo zeroification (default: false)
 */
export async function zeroify(options: OptionValues): Promise<void> {
	try {
		const { input, output, undo } = options;
		let inputPath = path.resolve(input);
		let outputPath: string;

		// Check if output file is specified.
		// If not, use the input file as the output file.
		try {
			outputPath = path.resolve(output);
		} catch (error) {
			outputPath = inputPath;
		};

		await fsPromises.readFile(inputPath, "utf8").then((data: string) => {
			let unzeroified = data.split("");

			if (undo) {
				// Remove the zero-width whitespaces from the input file.
				unzeroified.map((char: string, index: number) => {
					if (char.charCodeAt(0) === 8203)
						unzeroified[index] = "";
				});
			} else {
				// Convert the input file to zero-width whitespaces.
				unzeroified = unzeroified.map((char: string) => {
					return char + "\u200B";
				});
			};

			// Write the unzeroified file to the output path.
			fs.writeFileSync(outputPath, unzeroified.join(""), "utf8");
			logMessage(`Successfully ${ undo ? "un" : "" }zeroified '${inputPath}' and saved it to "${outputPath}"`);
		});
	} catch (error) {
		logError("An error occurred while zeroifying the file!");
		process.exit(1);
	};
};
