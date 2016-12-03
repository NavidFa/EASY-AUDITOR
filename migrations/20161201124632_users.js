
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('firstName');
        table.string('lastName');
        table.string('username');
        table.string('password');
        table.json('tokens');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
