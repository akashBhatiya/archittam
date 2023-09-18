const User = require('../models/users');
const Product = require('../models/products');

module.exports.addProduct = async (req,res) => {

    // if (!req.isAuthenticated()) {
    //     console.log('User is not authenticated');
    //     return res.redirect('/users/sign-in'); // Redirect to the sign-in page
    // }

    // const user  = await User.findOne({email: "admin@gmail.com"});
    // if(req.user.id != user.id){
    //     console.log('admin is not loged in/ other user loged in');
    //     return res.redirect('/users/sign-out');
    // }
    return res.render('admin/addProduct');
}

module.exports.createProduct = (req,res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    console.log(JSON.parse(receivedData.images));
    console.log(JSON.parse(receivedData.variantsTypes));
    // Handle the data and send a response
    res.json({ message: 'Data received successfully.' });
}