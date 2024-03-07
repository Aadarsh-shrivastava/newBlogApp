import React, { useEffect, useState } from 'react';
import axios from "axios"

function Home() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };


  const [input, setInput] = useState('');
  const [todo, setTodo] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);


  useEffect(()=>{
    
    axios.get(`http://localhost:5000/message/`)
    .then((response)=>setTodo(response.data))
    .catch((error)=>{console.log(error,"Error in fetching tha database.");}) 
  },[])



  const handleAdd = (e) => {
    e.preventDefault();
   
    axios.post(`http://localhost:5000/message/`,{description:input})
    .then((response)=>{
      setTodo([...todo,response.data.text])
      setInput('')
      setUpdateIndex(null)
    })
    .catch((error)=>{console.log('"Error in adding the text in the databae',error);})

    if (updateIndex !== null) {
      const updatedTodo = [...todo];
      updatedTodo[updateIndex] = input;
      setTodo(updatedTodo);
      setUpdateIndex(null);
    } else {
      setTodo([...todo, input]);
    }

    setInput('');
  };

  const handleUpdate = (index) => {
    setUpdateIndex(index);
    setInput(todo[index]);
  };

  const handleDelete = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
    setUpdateIndex(null);
  };





// import React, { useState } from 'react'

// function Home() {
//     const handleLogout=()=>{
//         localStorage.removeItem('token')
//         window.location.reload()
//     }

//     const[input,setInput]=useState("")
//     const [todo,setTodo]=useState([])
//     const handleAdd=(e)=>{
//       e.preventDefault()
//       console.log(input);
//       setTodo([...todo,input])
//       console.log(todo);
//       setInput("")
//     }

//     const handleDelete=(id)=>{
//       var updatedTodo=todo;
//       updatedTodo=todo.filter((dets,index)=>{
//         return index!==id;
//       });
//       setTodo(updatedTodo)
//     }

  return (
    <div>
      {/* <h1>Qurinomm Benifits</h1>
      <div><button onClick={handleLogout}>Logout</button></div>

      <div className='Todo Container'>
        <h2>Todo List</h2>
        <input type='text' name="todo" value={input} onChange={e=>setInput(e.target.value)} ></input>
        <button onClick={handleAdd}>Add</button>
        <ul>
          {todo.map((item,index)=>{
            return <li key={index}>{item}<button onClick={() => handleDelete(index)}>Del</button></li>
          })}
        </ul> 
      </div>   */}



      <h1>Qurinomm Benefits</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="Todo Container">
        <h2>Todo List</h2>
        <input
          type="text"
          name="todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={handleAdd}>
          {updateIndex !== null ? 'Update' : 'Add'}
        </button>
        <ul>
          {todo.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => handleUpdate(index)}>Update</button>
              <button onClick={() => handleDelete(index)}>Del</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Home
