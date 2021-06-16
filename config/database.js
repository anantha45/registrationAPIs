const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'node_test',
        charset: 'utf8mb4',
        multipleStatements: true,
        timezone : "+00:00",
        // debug: true,
    }
});
const Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');
Bookshelf.plugin('pagination');
// Bookshelf.plugin('visibility');
// Bookshelf.plugin('virtuals');
// Bookshelf.plugin('processor');
// Bookshelf.plugin(require('bookshelf-eloquent'));
// Bookshelf.plugin(Helper('bookshelf-extends'));
module.exports = Bookshelf;
