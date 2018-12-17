const express = require("express");
const store = require("./store");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.post("/createUser", (req, res) => {
    store
        .createUser({
            username: req.body.username,
            password: req.body.password
        })
        .then(() => res.sendStatus(200));
});

app.listen(7555, () => {
    console.log(`\n=== Server running on http://localhost:7555 === \n`);
});
