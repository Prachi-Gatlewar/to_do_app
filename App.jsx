import { useState,useEffect } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        setTodos([]);
      }
    }
  }, []);
  
  

  
  const saveToLS=(newTodos)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit=(e,id) => {
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete=(e,id) => {
    if(confirm("Are you sure you want to delete this todo?")){
    alert("Todo deleted")
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  }

  const handleCheckbox=(e,itemId) => {
    let index=todos.findIndex(item=>{
      return item.id===itemId
    })
    let newTodos=[...todos];
     newTodos[index].isCompleted=!newTodos[index].isCompleted
     setTodos(newTodos)
     saveToLS(newTodos)
  }
  

  const handleAdd=() => {
     setTodos([...todos,{id:uuidv4(),todo, isCompleted: false}])
     setTodo("")
     saveToLS(setTodos)
  }

  return (
    <>
    <Navbar />
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl '>iTask - Manage your todos at one place</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
          <div className="flex items-center gap-2">
          <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label>
         </div> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
          <h2 className="text-lg font-bold">Your Todos</h2>
          <div className='todos'>

            {todos.length===0 && <div className="m-5">No Todos to display</div>}
            {todos.map(item=>{

           
            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex w-full justify-between my-3'>
              <div className="flex gap-5 items-center">
              <input name={item.id} onChange={(e)=>handleCheckbox(e,item.id)} type="checkbox" checked={item.isCompleted}  />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full items-center">
                <button onClick={(e)=>handleEdit(e,item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><FaEdit /></button>
                <button onClick={(e)=>handleDelete(e,item.id)} className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"><MdDelete /></button>
              </div>
            </div>
            })} 
          </div>
        
        </div>
    </div>
    </>
  )
}

export default App
