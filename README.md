# Zerospacer CLI
## Description
A gag CLI tool that adds zero-width spaces between characters inside a file.

## Prerequisites
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Installation
```bash
npm i zerospacer-cli
```

## Usage
To use this CLI tool, run the following command:
```bash
zerospacer -i <inputFile> -o <outputFile> -u
```
Specify the input file using the `-i` flag. \
The `-u` flag is optional and is used to remove zero-width spaces from the input file (i.e. unzerospacer). \
If the `-o` flag is not specified, the output file will be the same as the input file.

## License
Licensed under MIT License. See [LICENSE](LICENSE) for more information.
