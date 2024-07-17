import { atom, atomFamily, selector } from "recoil";
export const ChangeAtom=atom({
    key:"ChangeAtom",
    default:0
})
export const TodosAtom=atom({
    key:"TodosAtom",
    default:[]
    // default:selector({
    //     key:"Todos/get",
    //     get:async({get})=>{
    //         let res=await fetch("http://localhost:3000/user/todos")
    //         res=await res.json();
    //         return res.todos;
    //     }
    // })
})
export const FilterAtom=atom({
    key:"FilterAtom",
    default:""
})

export const FilteredTodos=selector({
    key:"Filtered Todos",
    get:({get})=>{
        const todos=get(TodosAtom);
        const filter=get(FilterAtom);
        console.log(todos);
        return todos.filter((x)=>{ return (x.title.includes(filter) || x.description.includes(filter)) })

    }
})

export const TodosFamily=atomFamily({
    key:"TodosFamily",
    default:id=>({get})=>{
        const todos=get(FilteredTodos);
        return todos.find((x)=>x._id==id);
        
    }
})

export const colorAtom=atom({
    key:"colorAtom",
    default:"white"
})