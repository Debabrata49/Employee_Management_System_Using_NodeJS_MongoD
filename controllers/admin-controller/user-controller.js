const mongoose = require('mongoose');
const userModel = require('../../models/user-model');
const User = new userModel();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userController {

    async redirectHome(req, res) {
        try {
            res.redirect("/home");

        } catch (err) {
            throw err;
        }
    }

    async getHome(req, res) {
        try {
            await res.render("user/home", {
                page_title: "Home",
                page_name: "home",
                route_name: "signup",
                user_data: [
                    { "name": "John", "user_id": 1 },
                    { "name": "Mark", "user_id": 2 }
                ]
            });

        } catch (err) {
            throw err;
        }
    };
// \\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
    async getSignup(req, res) {
        try {
            await res.render("user/signup");

        } catch (err) {
            throw err;
        }
    };

    async getProfile(req, res) {
        try {
           const userData = await userModel.findById({_id:req.session.user_id});


            await res.render("user/profile",{
                user:userData
            });


        } catch (err) {
            throw err;
        }
    };

    async userSignup(req, res) {
        try {
            

            // await console.log(req.body);
            // req.body.password = User.generateHash(req.body.password);
            const password = req.body.password;
            const rpassword = req.body.rpassword;
            if (password===rpassword) {
                let userData = new userModel(req.body);

                let saveUser = await userData.save();

                if (saveUser != null) {
                    res.redirect("/login");
                }else{
                    res.redirect("/signup");
                }
            } else {
                
                res.send("Password Not Matched ")  
            }
        } catch (err) {
            res.redirect("/signup")
        }
    }

    async getLogin(req, res) {
        try {
            await res.render("user/login", {
                page_title: "Login",
                page_name: "login",
            });

        } catch (err) {
            throw err;
        }
    };

    // async userLogin(req, res){
    //     try {
    //         console.log(req.body, '===req.body===');
    //         let userData = await userModel.findOne({
    //             "email": req.body.email,
    //         });
    //         console.log(userData.email,userData.password, '====userData====')
    //         if(userData != null){

    //             const isMatch = bcrypt.compare(req.body.password, userData.password);
    //             if (isMatch){

    //                 req.render("/profile");

    //                 // let session_time = "10h";

    //                 // let payload = {
    //                 //     "_id": userData._id,
    //                 //     "email": userData.email
    //                 // };

    //                 // let jwtToken = jwt.sign({
    //                 //     payload
    //                 // }, process.env.SECRET_KEY, { expiresIn: session_time });

    //                 // console.log(jwtToken, '===jwtToken===')

    //                 // req.session.token = jwtToken;
    //                 // req.session.user_info = userData;
    //                 // req.flash('success', Variable.loginSuccessMessage);
    //             }else{
    //                 res.redirect("/login");
    //             }
    //         }else{
    //             console.log("No user found!");
    //             // req.flash('error', 'No user found in our database!');
    //             res.redirect("/login");
    //         }
    //     } catch (error) {
            
    //     }
    // }

    ///////////////////////////////////////////////
    async userLogin(req, res){
        try {
            const email = req.body.email;
            const password = req.body.password;

            const userEmail = await userModel.findOne({email:email});
            // console.log(userEmail.password);
            const isMatch = await bcrypt.compare(password, userEmail.password);

            if(isMatch){
                req.session.user_id = userEmail._id;
                res.redirect("/profile");
            }
            else{
                res.redirect("/login");
            }

                
        } catch (error) {
            throw error;
        }
    }

    // logout.....................

    async userLogout(req,res){
        try {
            req.session.destroy();
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
    
};

module.exports = new userController();