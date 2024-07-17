import { useEffect, useState } from "react"
import {  useSetRecoilState,  } from "recoil";
import { ChangeAtom } from "../store/TodosAtom";

export function CreateTodo(){
    // const setChange=useSetRecoilState(ChangeAtom)
    const[title,setTitle]=useState("");
    const[desc,setDesc]=useState("");
    const setchange=useSetRecoilState(ChangeAtom);

    return <div className="CreateTodo">
        <h2>New Todo</h2>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title"  placeholder="Add Title"  onInput={(e)=>{
            setTitle(e.target.value)
        }}/> 
        <label htmlFor="desc">Description</label>
        <input type="text"  name="desc" id="desc" placeholder="Add description" onInput={(e)=>{
            setDesc(e.target.value)}}/> 
        <button className="btn" onClick={()=>{
          
                fetch("http://localhost:3000/user/todos",{
                    method:"POST",
                    body:JSON.stringify({
                        "title":title,
                        "description":desc
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
    
                }
                ).then(async (res)=>{
                    res=await res.json()
                    console.log(res);
                    alert("todo is saved")
                    setchange((c)=>{return (c+1)})
                    // setTodos((todos)=>{return ([...todos,{title:title,description:desc,completed:"false"}])})

                    
                })
            
        }}>Create new Todo</button>
    </div>
}