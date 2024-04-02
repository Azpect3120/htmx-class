const EXPRESS =  require("express");
const app = EXPRESS();
const PORT = 3000;

const Logger = require("./logger");
const logger = new Logger("./server.log");

logger.log("Hello world!");



app.listen(PORT, () => console.log(`Server listening on :${PORT}`));