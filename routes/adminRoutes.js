const express = require('express');
const admin_router = express.Router();

const adminController = require("../controllers/admin-controller/admin-controller");
const multer = require('multer');


const session = require("express-session");
const config = require("../config/session");
admin_router.use(session({secret:config.sessionSecret}))

const bodyParser = require("body-parser");
admin_router.use(bodyParser.json());
admin_router.use(bodyParser.urlencoded({extended:true}));

// admin_router.set('view engine','ejs');
// admin_router.set('views','./views/admin');


const auth = require("../middleware/adminAuth");






admin_router.get('/admin',adminController.Login);
admin_router.post('/admin/login',adminController.adminLogin);

admin_router.get('/admin/empList',adminController.empList);

admin_router.get('/admin/login',adminController.adminProfile);
admin_router.get('/addemployee',adminController.addEmployee);
admin_router.post('/admin/addemployee',adminController.submitEmployee);

admin_router.get('/admin/edit-user',adminController.editUser);
admin_router.post('/admin/edit-user',adminController.updateEmployee);

admin_router.get('/admin/delete-user',adminController.deleteUser);


module.exports = {
   adminRoutes: admin_router
}

// classname::memberFunction()