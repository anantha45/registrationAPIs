const bookshelf= require('../config/database');

module.exports = bookshelf.model('Employee',{
    tableName: 'employees',
});