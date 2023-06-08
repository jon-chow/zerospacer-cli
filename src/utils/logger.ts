import fs from "fs";
import path from "path";
import format from "date-fns/format";
import chalk from "chalk";
import { v4 as uuid } from "uuid";


const dir = path.resolve(__dirname, "..", "logs");

/**
 * Log events.
 * @param message Message to log.
 * @param logFileName Name of the log file to write to.
 */
const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(dir))
      fs.mkdirSync(dir);
    
    fs.appendFileSync(path.join(dir, logFileName), logItem);
  } catch (err) {
    console.log(err);
  };
};


/**
 * @description Creates an error log file.
 * @param message Message to log.
 */
function logError(message: string): void {
  logEvents(message, 'errors.log');
  console.log(chalk.red(message));
};

/**
 * @description Creates a message log file.
 * @param message Message to log.
 */
function logMessage(message: string): void {
  logEvents(message, 'messages.log');
  console.log(chalk.green(message));
}

export { logError, logMessage };
