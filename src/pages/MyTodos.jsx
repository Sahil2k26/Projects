import { SearchComp } from "../components/Search";
import { Todos } from "../components/Todos";

export function MyTodos(){
    return <div className="tododiv">
        <h2>My Todos</h2>
        <SearchComp></SearchComp>
        <Todos></Todos>
    </div>
}