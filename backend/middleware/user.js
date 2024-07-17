const {User}=require("../db/index")
const z=require("zod")

const usernameSchema=z.string().email()
const passwordSchema=z.string().min(5)

async function userMiddleware(req,res,next){
    const user="kion@gmail.com"
;
    const pass="passingby";

    const resUser=usernameSchema.safeParse(user);
    const resPass=passwordSchema.safeParse(pass);

    if(!(resUser.success && resPass.success)){
        res.status(403).send("Invalid user/Password")
    }


    const v=await User.findOne({
        username:user,
        password:pass
    })
    if(v){
        req.username=user;
        next();
    }
    else{
        res.status(403).send("user doesnt exists")

    }

}

module.exports = userMiddleware;

