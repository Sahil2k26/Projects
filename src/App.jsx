

import { RecoilRoot } from 'recoil'
import './App.css'
import { BrowserRouter, Route, useNavigate ,Routes } from 'react-router-dom'
import { CreateTodo } from './components/CreateTodo'
import {Home} from "./pages/Home"
import {MyTodos} from "./pages/MyTodos"

function App() {



  return (
    <BrowserRouter>
      <RecoilRoot>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/Create' element={<CreateTodo></CreateTodo>}></Route>
        <Route path='/MyTodos' element={<MyTodos></MyTodos>}></Route>
      
      </Routes>
      </RecoilRoot>
    </BrowserRouter>
    


  )
}


function Navbar(){
  const navigate=useNavigate();
  return <div className='navBar'>
    <button className='btn' onClick={()=>{navigate("/")}}>Home</button>
    <button className='btn' onClick={()=>{navigate("/Create")}}>Create</button>
    <button className='btn' onClick={()=>{navigate("/MyTodos")}} >My Todos</button>
    

  </div>
}

export default App
