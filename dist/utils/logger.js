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
exports.logMessage = exports.logError = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const format_1 = __importDefault(require("date-fns/format"));
const chalk_1 = __importDefault(require("chalk"));
const uuid_1 = require("uuid");
const dir = path_1.default.resolve(__dirname, "..", "logs");
/**
 * Log events.
 * @param message Message to log.
 * @param logFileName Name of the log file to write to.
 */
const logEvents = (message, logFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = (0, format_1.default)(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir);
        fs_1.default.appendFileSync(path_1.default.join(dir, logFileName), logItem);
    }
    catch (err) {
        console.log(err);
    }
    ;
});
/**
 * @description Creates an error log file.
 * @param message Message to log.
 */
function logError(message) {
    logEvents(message, 'errors.log');
    console.log(chalk_1.default.red(message));
}
exports.logError = logError;
;
/**
 * @description Creates a message log file.
 * @param message Message to log.
 */
function logMessage(message) {
    logEvents(message, 'messages.log');
    console.log(chalk_1.default.green(message));
}
exports.logMessage = logMessage;
//# sourceMappingURL=logger.js.map