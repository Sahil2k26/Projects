const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://sahil:VK8i5cpXcHTCHTls@cluster0.qigbjuo.mongodb.net/Todo-App");

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todos"
    }]
})

const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
    completed:String

})

const User=mongoose.model("User",UserSchema);
const Todos=mongoose.model("Todos",todoSchema);

module.exports={
    User,
    Todos
}