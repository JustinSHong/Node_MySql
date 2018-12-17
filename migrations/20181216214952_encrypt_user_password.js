const { saltHashPassword } = require("../store");

exports.up = function(knex, Promise) {
    // add encrypted_password and salt columns
    return knex.schema
        .table("user", t => {
            t.string("salt").notNullable();
            t.string("encrypted_password").notNullable();
        })
        .then(() => knex("user"))
        .then(users =>
            // migrate users who already in the database
            Promise.all(users.map(convertPassword))
        )
        .then(() => {
            return knex.schema.table("user", t => {
                t.dropColumn("password");
            });
        });

    function convertPassword(user) {
        const { salt, hash } = saltHashPassword(user.password);
        return knex("user")
            .where({ id: user.id })
            .update({
                salt,
                encrypted_password: hash
            });
    }
};

// when migration occurs we can not get the original PW
exports.down = function(knex, Promise) {
    return knex.schema.table("user", t => {
        t.dropColumn("salt");
        t.dropColumn("encrypted_password");
        t.string("password").notNullable();
    });
};
