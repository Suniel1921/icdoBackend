//register controller
const authModel = require("../model/authModel");
const bcrypt = require ("bcrypt");
const JWT = require ("jsonwebtoken");
const contactModel = require("../model/contact");


exports.register = async (req, res)=>{
   try {
    const {name, email, password} = req.body;
    //validation
    if(!name || !email || !password){
        return res.status(400).send({success: false, message: "All fields are required"});
    }
    //check user already exit or not
    const user = await authModel.findOne({email});
    if(user){
        return res.status(400).send({success: false, message: "User already Exit"})
    }

    //hashed user password
    const hashedPassword = await bcrypt.hash(password,10);

    //saving new user in database
    const newUser = await authModel.create({name, email, password:hashedPassword});
    return res.status(201).send({success: true, message: "User Register Successfully", newUser})
    
   } catch (error) {
    return res.status(500).send({success: false,  message: 'Error while registering user',error})    
   }
}



//login controller
exports.login = async (req ,res)=>{
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(400).send({success: false, messag: "Email and password are required"});
        }
        //check user exit or not
        const user = await  authModel.findOne({email});
        if(!user){
            return res.status(404).send({success: false, message: "user not found"});
        }

        // check password 
        const matchPassword = await bcrypt.compare(password, user.password);
        if(!matchPassword){
            return res.status(400).send({success: false , message: "Invalid Credentials"});
        }
        //Generate token 
        const token = JWT.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '7d'});
        return res.status(200).send({success: true, message: "Login successfully", user: {name: user.name, email:user.email},token});


        
    } catch (error) {
        return res.status(500).send({success: false, message: "Error while loging User",error})
        
    }
}



//protected route controller
exports.protectedRoute = async (req ,res)=>{
    res.status(200).send({ok: true});
}

//admin route controller
exports.admin = (req, res)=>{
    res.status(200).send({ok: true});
}





// contact us controller

exports.contact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // Validation
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        // Create a new contact entry
        const newContact = await contactModel.create({ name, email, phone, subject, message });

        return res.status(201).json({ success: true, message: "Thanks for contacting us!", newContact });
    } catch (error) {
        console.error('Error in contact form submission:', error);
        return res.status(500).json({ success: false, message: `Internal server error ${error}` });
    }
}



//get all contact data in admin dashboard

exports.getAllContactData = async (req ,res)=>{
    try {
        const allContactData = await contactModel.find({});
        if(!allContactData && allContactData.lenght === 0){
            return res.status(400).json({success: false, message : "No Contact Message"})
        }
        return res.status(200).json({success: true, message: "All Contact Data found", allContactData});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
        
    }

}