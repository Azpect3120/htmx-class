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

app.post("/contacts", (req, res) => {
  logger.log(req);
  let { name, email } = req.body;
  if (contacts.find(contact => contact.email === email)) {
    res.status(409).render("templates/error");
    return
  }
  let id = lastId++;
  contacts.push({id, name, email});
  res.status(201).render("templates/contact", { id, name, email });
});

app.get("/contacts", (req, res) => {
  logger.log(req);
  res.status(200).json(contacts);
});

app.delete("/contacts/:id", (req, res) => {
  logger.log(req);

  const id = req.params.id;
  contacts = contacts.filter(contact => contact.id != id);

  res.status(204).send("");
});


app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
