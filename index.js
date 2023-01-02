const http = require('http');
const fs = require('fs');
const express = require('express');
const adminRoutes = require('./routes/admin-routes');
const adminroutes1 = require('./routes/adminRoutes');
// app.use('/admin',adminroutes1);
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

const app = express();

require('./config/database')();

app.set("views", __dirname + '/views');
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ "extended": true }));
app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.token = req.session.token;
    res.locals.user_info = req.session.user_info;
    res.locals.messages = req.flash();
    next();
});

var server = http.createServer(app);

app.use(adminRoutes.routes);
app.use(adminroutes1.adminRoutes);

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log('Server running on port : ' + PORT);
});
