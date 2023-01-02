const mongoose = require('mongoose');
const userModel = require("../../models/user-model");
const User = new userModel();
const bcrypt = require('bcrypt');
const rendomString = require('randomstring');

class adminController {

    async Login(req,res){
        
        try {
            
            res.render("../views/admin/login");


        } catch (error) {
            throw error;
        }

    }

    async adminLogin(req,res){
        
        try {
                const email = req.body.email;
                const password = req.body.password;

                const userEmail = await userModel.findOne({email:email});
            
            if (userEmail) {
                    const isMatch = await bcrypt.compare(req.body.password, userEmail.password);

                    if(isMatch){

                        if(userEmail.role==0){

                            res.render("../views/admin/login");
                            
                        }
                        else{
                            req.session.admin_id = userEmail._id;
                            const adminData = await userModel.findById({_id: req.session.admin_id});
                            res.render("../views/admin/profile",{
                                admin:adminData,
                            });  
                        }
                        
                    }
                    else{
                        res.render("../views/admin/login");
                    }
            } else {
                    res.render("../views/admin/login");
            }
            } catch (error) {
            throw error;
        }
    }

    async adminProfile(req,res){

        try {
            // const adminData = await userModel.findById({_id: req.session.admin_id});
            // const employeeData = await userModel;
            await res.render("../views/admin/profile",{
                // admin:adminData,
                // employee:employeeData
            });
            
        } catch (error) {
            throw error;
        }

    }

    async empList(req,res){
        try {
            const employeeData = await userModel.find({role:0});
            res.render('../views/admin/employeeList',{
                empData:employeeData
            })
        } catch (error) {
            throw error;
        }
    }
    
    async addEmployee(req,res){
        try {
            res.render('../views/admin/addemployee');
        } catch (error) {
            console.log('error');
        }
    }

    async submitEmployee(req,res){
        try {
            // const name = req.body.name;
            // const email = req.body.eamil;
            // const phone = req.body.phone;

            let userData = new userModel(req.body);

            let saveUser = await userData.save();

            if (saveUser != null) {
                res.redirect("/admin/empList");
            }else{
                res.redirect("/admin/addemployee");
            }
             

        } catch (error) {
            console.log('error');
        }
    }

    //edit-user

    async editUser(req,res){
        try {
            const id = req.query.id;
            const employeeData = await userModel.findById({_id:id});
            if(employeeData){
                res.render('../views/admin/editUser',{employee:employeeData});
            }else{
                res.redirect("/admin/empList");

            }

            
        } catch (error) {
            
        }
    }

    async updateEmployee(req,res){
        try {
            // const Uid = req.body.name;
            // console.log(Uid);
            const userData1 = await userModel.findByIdAndUpdate({"_id":req.body.Uid}, {$set:{"name":req.body.name, "email":req.body.email, "phone":req.body.phone}});
            res.redirect("/admin/empList");
        } catch (error) {
            console.log(error);
        }
    }

    //delete-user

    async deleteUser(req,res){
        try {
            
            const id = req.query.id;
            // console.log (id);
            await userModel.deleteOne({_id:id});
            res.redirect("/admin/empList");

        } catch (error) {
            
        }
    }






}
module.exports = new adminController();