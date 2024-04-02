const EXPRESS =  require("express");
const app = EXPRESS();
const PORT = 3000;

const Logger = require("./logger");
const logger = new Logger("./server.log");

app.set("view engine", "ejs");
app.set("views", "public");

app.get("/", (req, res) => {
    logger.log(req);
    res.render("index");
});


app.listen(PORT, () => console.log(`Server listening on :${PORT}`));