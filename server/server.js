const EXPRESS =  require("express");
const BP = require('body-parser');
const app = EXPRESS();
const PORT = 3000;

const Logger = require("./logger");
const logger = new Logger("./server.log");

app.set("view engine", "ejs");
app.set("views", "public");

app.use(BP.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    logger.log(req);
    res.render("index");
});

app.post("/contacts", (req, res) => {
    logger.log(req);
    let { name, email } = req.body;
    res.render("templates/contact", { name, email });
});


app.listen(PORT, () => console.log(`Server listening on :${PORT}`));