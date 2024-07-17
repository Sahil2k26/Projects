import { useSetRecoilState } from "recoil"
import { FilterAtom } from "../store/TodosAtom"

export function SearchComp(){
        const setFilter=useSetRecoilState(FilterAtom)
        return <input  style={{width:"300px"}} type="text" placeholder="search " onInput={(e)=>{setFilter(e.target.value)}} />
}