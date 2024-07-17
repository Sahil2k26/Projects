const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Todos}=require("../db/index")
const z=require("zod")

const usernameSchema=z.string().email()
const passwordSchema=z.string().min(5)
const todoSchema=z.object({
    title:z.string(),
    description:z.string(),
    completed:z.string()
})





// send data in body
router.post("/signup",async (req,res)=>{
    const user=req.body.username;
    const pass=req.body.password;

    const resUser=usernameSchema.safeParse(user);
    const resPass=passwordSchema.safeParse(pass);

    if(!(resUser.success && resPass.success)){
        res.status(403).send("Invalid user/Password")
    }

    // check for duplicate username;
    const a=await User.findOne({
        username:user
    })

    if(a){
        res.status(403).send("this username already exists");
        return;
    }

    await User.create({
        username:user,
        password:pass
    })

    res.json({
        msg:"User created Successfully"
    })


})


// Router.post("/signin",async (req,res)=>{
//     const user=req.body.username;
//     const pass=req.body.password;

//     const resUser=usernameSchema.safeParse(user);
//     const resPass=passwordSchema.safeParse(pass);

//     if(!(resUser.success && resPass.success)){
//         res.status(403).send("Invalid user/Password")
//     }

//     const a=await User.findOne({
//         username:user
//     })
//     if(!a){
//         res.status(404).send("user not found")
//     }
    




// })

//send data in body
router.post("/todos",userMiddleware,async (req,res)=>{

    const user=req.username

    // const response=todoSchema.safeParse(req.body)
    // if(!response.success){
    //     res.status(403).send("Invalid data format")
    //     return;
    // }

    const t=req.body.title;
    const d=req.body.description;
    const c="false"


    const todoId=await Todos.create({
        title:t,
        description:d,
        completed:c
    })


    await User.updateOne({
        username:user
    },{
        "$push":{
            todos:todoId
        }
    })

    res.json({
        msg:"todo is saved successfully"
    })
})

router.get("/todos",userMiddleware,async (req,res)=>{
    const user=req.username;
    const userData=await User.findOne({
        username:user
    })

    const todos=await Todos.find({
        _id:{
            "$in":userData.todos
        }
    })

    res.json({
        todos:todos
    })

})

// taking title in body to determine the todo
router.put("/completed",userMiddleware,async (req,res)=>{

    const id=req.body._id;


    await Todos.updateOne({
        _id:id
        
    },{
        "$set":{
            completed:"true"
        }   
       
    });

    // let todoList=userData.todos;

    // const i= userData.todos.find((item)=>{
    //     return item.title==title
    // })
    // if(i<0){
    //     res.status(404).send("todo is not found");
    //     return;
    // }
    
    // console.log(userData.todos);


    // todoList[i]["completed"]="true";
    // userData["todos"]=todoList;

    // await User.replaceOne({username:user},userData);

    res.json({msg:"done successfully"})

})

router.delete("/todos",async (req,res)=>{
    const id=req.body._id;
    await Todos.deleteOne({_id:id});
    res.json({msg:"done successfully"})

})

module.exports = router