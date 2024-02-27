import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Route,Routes} from "react-router-dom";
import Nav from './components/NavBar';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';


function App() {

  let [todoData,setTodoData] = useState([]);
  let [editData,setEditData] = useState({});
  let [newData,setNewData] = useState({priority:"High"});
  useEffect(()=>
    {
        axios.get("http://localhost:5000/todo/").then(
        res => 
        {
          setTodoData(res.data);
          //console.log(todoData);
        }).catch(
            function (error) 
            {
                console.log(error);
            })        
    },[newData])

    

  return (
    <div className="App">
      <Nav/>
      {/* <EditTodo setData={setEditData} data={editData}/> */}
      {/* <TodoList data={todoData}/> */}
      {/* <CreateTodo setData={setNewData} data={newData}/> */}

      <Routes>
        <Route exact path="/" element={<TodoList data={todoData}/>}/>
        <Route exact path="/edit/:id" element={<EditTodo setData={setEditData} data={editData}/>}/>
        <Route exact path="/create" element={<CreateTodo setData={setNewData} data={newData}/>}/>
      </Routes>

    </div>
  );
}

export default App;
