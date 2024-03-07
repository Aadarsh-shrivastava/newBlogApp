const router=require("express").Router();
const {User}=require('../model/user.model.js')
const Joi=require('joi')
const bcrypt=require('bcrypt')

router.post("/",async(req,res)=>{
    try{
        const{error}=validate(req.body);
        if(error){
            return res.status(400).send({message:error.details[0].message});
        }

        const user=await User.findOne({email:req.body.email});
        // console.log(user)
        if(!user){
            return res.status(401).send({message:"Invalid Email or Password"})
        }

        const validPassword=await bcrypt.compare(
            req.body.password,
            user.password   
        );
        if(!validPassword){
            return res.status(401).send({message:"Invalid Email or Password"})
        }

        const token=user.generateAuthToken();
        console.log(token);
        console.log(user);
        res.status(200).send({data:token,user:user._id,message:"Logged in Successfully"});

    }catch(error){
        res.status(500).send({message:"Internal server error"})
    }
})


const validate=(data)=>{
    const schema=Joi.object({
        email:Joi.string().email().required().label("E-mail"),
        password:Joi.string().required().label("Password")
    });
    return schema.validate(data)
}

module.exports=router
