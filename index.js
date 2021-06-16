const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const host = "localhost";
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const UserController = require('./controllers/UserController');
const EmployeeController = require('./controllers/EmployeeController');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`Node Js is running ...!`);
})

app.post('/register', (req, res) => {
    UserController.register(req, res);
});

app.post('/login', (req, res) => {
    UserController.login(req, res);
});

app.post('/forgot_password', (req, res) => {
    UserController.forgotPassword(req, res);
});

app.post('/reset_password', (req, res) => {
    UserController.resetPassword(req, res);
});

app.post('/add_employee', (req, res, next) => {
    AuthMiddleware.UserToken(req, res, next);
},(req, res) => {
    EmployeeController.add(req, res);
});

app.get('/get_employees',  (req, res, next) => {
    AuthMiddleware.UserToken(req, res, next);
},(req, res)=> {
    EmployeeController.index(req, res);
});

app.put('/update_employee/:id', (req, res, next) => {
    AuthMiddleware.UserToken(req, res, next);
},(req, res) => {
    EmployeeController.update(req, res);
});

app.delete('/delete_employee/:id', (req, res, next) => {
    AuthMiddleware.UserToken(req, res, next)
},(req, res) => {
    EmployeeController.destroy(req, res);
});

var server = require('http').createServer(app);
server.listen(port, (req, res, next) => {
    console.log(`Node server started on : <${host}:${port}>`);
});