const EXPRESS =  require("express");
const BP = require('body-parser');
const app = EXPRESS();
const PORT = 3000;

const Logger = require("./logger");
const logger = new Logger("./server.log");

app.set("view engine", "ejs");
app.set("views", "public");

app.use(BP.urlencoded({ extended: true }));

let contacts = [];
let lastId = 0;

app.get("/", (req, res) => {
    logger.log(req);
    res.status(200).render("index", {contacts});
});

// This just creates the contact 
// Node the ID and contacts array is new
// No database
app.post("/contacts", (req, res) => {
    logger.log(req);
    let { name, email } = req.body;
    let id = lastId++;
    contacts.push({id, name, email});
    res.status(201).render("templates/contact", { id, name, email });
});

// This is for seeing all the contacts in JSON format
app.get("/contacts", (req, res) => {
    logger.log(req);
    res.status(200).json(contacts);
});

// This is for deleting a contact via its ID
app.delete("/contacts/:id", (req, res) => {
    logger.log(req);

    const id = req.params.id;
    contacts = contacts.filter(contact => contact.id != id);

    res.status(204).send("");
});


app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
