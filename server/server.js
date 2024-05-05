const EXPRESS = require("express");
const BP = require('body-parser');
const app = EXPRESS();
const PORT = 3000;

const Logger = require("./logger");
const logger = new Logger("./server.log");

app.set("view engine", "ejs");
app.set("views", "public");

app.use(BP.urlencoded({ extended: true }));

// Store contacts in memory
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
  if (contacts.find(contact => contact.email === email)) {
    res.status(409).render("templates/error");
    return
  }
  let id = lastId++;
  contacts.push({id, name, email});
  res.status(201).render("templates/contact", { id, name, email });
});

// This is for seeing all the contacts in JSON format
app.get("/contacts", (req, res) => {
    logger.log(req);
    res.status(200).json(contacts);
});   

// Get the form to update the contacts
app.get("/contacts/:id/update", (req, res) => {
  let id = parseInt(req.params.id);
  let contact = contacts.find(contact => contact.id === id);
  res.render("templates/update", { contact });
})

// Update the contacts using their id
app.put("/contacts/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let { name, email } = req.body;

  // Ensure the email is unique
  // If not, load the update_error template which has an OOB swap
  if (contacts.find(contact => contact.email === email)) {
    res.status(409).render("templates/update_error", { contact: {id, name, email} });
    return
  }

  contacts = contacts.map(contact => {
    if (contact.id === id) {
      return { id, name, email };
    }
    return contact;
  });

  res.status(200).render("templates/contact", { id, name, email });
})

// Get the form to update the contacts
app.get("/contacts/:id/update", (req, res) => {
  let id = parseInt(req.params.id);
  let contact = contacts.find(contact => contact.id === id);
  res.render("templates/update", { contact });
})

// Update the contacts using their id
app.put("/contacts/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let { name, email } = req.body;

  contacts = contacts.map(contact => {
    if (contact.id === id) {
      return { id, name, email };
    }
    return contact;
  });

  res.status(200).render("templates/contact", { id, name, email });
})

// This is for deleting a contact via its ID
app.delete("/contacts/:id", (req, res) => {
  logger.log(req);

  const id = req.params.id;
  contacts = contacts.filter(contact => contact.id != id);

  res.status(204).send("");
});

app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
