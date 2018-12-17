const knex = require("knex")(require("./knexfile"));
const crypto = require("crypto");

function saltHashPassword(password) {
    const salt = randomString();
    const hash = crypto.createHmac("sha512", salt).update(password);
    return {
        salt,
        hash: hash.digest("hex")
    };
}

function randomString() {
    return crypto.randomBytes(4).toString("hex");
}

module.exports = {
    saltHashPassword,
    createUser({ username, password }) {
        console.log(`Add user ${username} with password ${password}`);
        return knex("user").insert({
            username,
            password
        });
    }
};
