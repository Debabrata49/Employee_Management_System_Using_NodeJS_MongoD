const isLogin = async(req,res,next)=>{
    try {
        if(req.session.user_id){}

        else{
            res.redirect("/login");
        }
        next();


    } catch (error) {
        
    }
}


const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            res.redirect("/login")
        }
    } catch (error) {
        
    }
}

module.exports={
     isLogin,
     isLogout
}