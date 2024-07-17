import { useEffect } from "react"
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from "recoil"
import { ChangeAtom, colorAtom, FilteredTodos, TodosAtom } from "../store/TodosAtom"

// it takes array as an input
export function Todos() {
    const change=useRecoilValue(ChangeAtom);
    const setTodos=useSetRecoilState(TodosAtom);
    useEffect(()=>{
        fetch("http://localhost:3000/user/todos").then( async (res)=>{
            res=await res.json();
            setTodos(res.todos);
        })
            
    },[change]);
    const Filteredtodos = useRecoilValue(FilteredTodos)
    return <div className="Todos" >
        {Filteredtodos.map((todo, index) => {
            return <Todo todo={todo} key={index}></Todo>
        })
        }
    </div>
}

function Todo({ todo, index }) {
    // const useReferesher=useRecoilRefresher_UNSTABLE(TodosAtom);
 
    return <div className="My-todos">
        {todo.completed=="true"? <Delete todo={todo}></Delete>:null}
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <IsDonebtn todo={todo}></IsDonebtn>

        
    </div>
}

// function Tick(){
//     return <img  style={{width:"50px" ,height:"50px",objectFit:"cover",position:"relative",left:"0px",zIndex:"1"}} 
//     src="https://w7.pngwing.com/pngs/764/21/png-transparent-ok-check-todo-agenda-icon-symbol-tick-to-do-gui-completed-thumbnail.png" alt="" />
// }

function IsDonebtn({todo}){
    const setColor=useSetRecoilState(colorAtom);
    const setChange=useSetRecoilState(ChangeAtom);
    return  <button className="btn" onClick={() => {

        fetch("http://localhost:3000/user/completed", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "_id": todo._id
            })
        }).then(async (res) => {
            res = await res.json();
            alert("Marked as done")
            
            setColor("Green")
            setChange((c)=>c+1);


            // useReferesher();
        })
        }} >
        { todo.completed=="false"?"Mark as Done":"Done"}</button>
       
}
function Delete({todo}){
    const setChange=useSetRecoilState(ChangeAtom)
    return  <button className="Deleter" onClick={()=>{
        fetch("http://localhost:3000/user/todos",{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
        
            },
            body: JSON.stringify({
                "_id": todo._id
            })
        
        }).then(async (res)=>{
            res=await res.json();
        
            alert("deleted successfully");
            setChange((c)=>c+1);
            // useReferesher()
        })
        }}>
        </button>
}