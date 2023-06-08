"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeroify = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../utils/logger");
/**
 * @description Adds zero-width whitespaces to a project.
 * @param {*} options.input Input file
 * @param {*} options.output Output file
 * @param {*} options.undo Undo zeroification (default: false)
 */
function zeroify(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { input, output, undo } = options;
            let inputPath = path_1.default.resolve(input);
            let outputPath;
            // Check if output file is specified.
            // If not, use the input file as the output file.
            try {
                outputPath = path_1.default.resolve(output);
            }
            catch (error) {
                outputPath = inputPath;
            }
            ;
            yield promises_1.default.readFile(inputPath, "utf8").then((data) => {
                let unzeroified = data.split("");
                if (undo) {
                    // Remove the zero-width whitespaces from the input file.
                    unzeroified.map((char, index) => {
                        if (char.charCodeAt(0) === 8203)
                            unzeroified[index] = "";
                    });
                }
                else {
                    // Convert the input file to zero-width whitespaces.
                    unzeroified = unzeroified.map((char) => {
                        return char + "\u200B";
                    });
                }
                ;
                // Write the unzeroified file to the output path.
                fs_1.default.writeFileSync(outputPath, unzeroified.join(""), "utf8");
                (0, logger_1.logMessage)(`Successfully ${undo ? "un" : ""}zeroified "${inputPath}" and saved it to "${outputPath}"`);
            });
        }
        catch (error) {
            (0, logger_1.logError)("An error occurred while zeroifying the file!");
            process.exit(1);
        }
        ;
    });
}
exports.zeroify = zeroify;
;
//# sourceMappingURL=zeroify.js.map