const express = require("express");
const store = require("./store");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.listen(7555, () => {
    console.log(`\n=== Server running on http://localhost:7555 === \n`);
});
