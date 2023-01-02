const express = require('express');
const router = express.Router();
const userController = require("../controllers/admin-controller/user-controller");
const multer = require('multer');
const verifyToken = require("../middleware/verifytoken");
const session = require("express-session");
const config = require("../config/session");
const auth = require("../middleware/auth");


router.use(session({secret:config.sessionSecret}))
// const verifyAuth = require("../middleware/verifyauth");

// const Storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./public/uploads/user");
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
//     }
// });

// const uploadFile = multer({ storage: Storage });

// const request_param = multer();

// router.get('/', userController.redirectHome);

router.get('/', userController.getHome);

router.get('/home', userController.getHome);

router.get('/login', userController.getLogin);
router.post('/user/login', userController.userLogin);

router.get('/signup', userController.getSignup);

router.post('/user/signup', userController.userSignup);

router.all('/user/*', verifyToken);

router.get('/profile',auth.isLogin, userController.getProfile);

router.get("/logout",auth.isLogin,userController.userLogout)

module.exports = {
    routes: router
};