const bcrypt=require('bcrypt')
const User=require('../modules/user')
const jwt=require('jsonwebtoken')


const register  = async(req,res)    =>  {

    try{
        try
        {
            const find =await User.findOne({username:req.body.username});
            if(find==null)
            {
                const salt=await bcrypt.genSalt(10);
                const hashPassword=await bcrypt.hash(req.body.password,salt);
                const user =new User({
                    username:req.body.username,
                    email:req.body.email,
                    password:hashPassword,
                });
                const person=user.save()
                const token=jwt.sign({id:person._id,username:req.body.email},process.env.SECRET_KEY,{expiresIn:'30d'});
                res.status(200).cookie('token',token,{httpOnly:true}).json({person,token:token});
            
            }
            else
            {
                res.status(403).json('You are already registered with us!!')
            }
        }
        catch(err)
        {
                console.log(err);
                res.status(500).json('Internal _ Server _Error')
        }
    }
    catch(err)
    {
        res.status(404).json('PAGE NOT FOUND\n')
        console.log(err)
    }
}


const login=async(req,res)=>{
    try{
        const find=User.findOne({username:req.body.username});
        if(find!=null && find!=undefined)
        {
            const 
        }
    }
}