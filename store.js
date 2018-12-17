const knex = require("knex")(require("./knexfile"));
const crypto = require("crypto");

function saltHashPassword({ password, salt = randomString(0) }) {
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
    },
    authenticate({ username, password }) {
        // get user's salt, use it to encrypt PW, and check it against the encrypted_password
        console.log(`Authenticating user ${username}`);
        return knex("user")
            .where({ username })
            .then(([user]) => {
                if (!user) return { success: false };
                const { hash } = saltHashPassword({
                    password,
                    salt: user.salt
                });
                return { success: hash === user.encrypted_password };
            });
    }
};
