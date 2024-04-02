"use strict";

const FS = require("fs");

module.exports = class Logger {
    constructor (path) {
        this.logFilePath = path;
        this.flushLogFile();
    }

    log(req) {
        let formatted = this.formatLog(req);
        console.log(formatted);
        this.writeToLogFile(formatted + "\n"); 
    }

    formatLog(req) {
        let formatted = `[${req.method}] ${req.url}`;
        return formatted;
    }

    writeToLogFile(entry) {
        FS.writeFile(this.logFilePath, entry, { flag: "a+"}, err => console.error);
    }

    flushLogFile() {
        FS.writeFile(this.logFilePath, "", err => console.error);
    }
}