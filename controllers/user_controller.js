const User = require('../models/users');

module.exports.auth = (req,res) => {
    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('auth');
}

module.exports.createUser = async (req,res) =>{
    if(req.body.password != req.body.confirmPassword){
        console.log("Password not matchig with confirm password")
        return res.redirect('back');
    }

    try{
        const user = await User.findOne({email : req.body.email});
        if(!user){
            const newUser = await User.create({
                username : req.body.username,
                email: req.body.email,
                password: req.body.password
            })

            req.login(newUser, (err)=>{
                if(err){
                    console.log(err);
                    return res.redirect('back');
                }
                return res.redirect('/');
            })
        }else{
            console.log("user already present");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout(req.user, err => {
        if(err){
            return next(err);
        } 
        return res.redirect("/users/sign-in");
    });
}