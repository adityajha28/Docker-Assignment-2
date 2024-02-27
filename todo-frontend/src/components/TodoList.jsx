import  './TodoList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
              
function TodoList({data})
{    
    console.log("Todolist data ");
    console.log(data);
    return(
        
            <div className='tableDiv'>
                <div>
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Responsible</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            data.map((todo)=>{
                                    return (
                                    <tr>
                                        <td className={todo.complete ? "complete" : ""}>{todo.title}</td>
                                        <td className={todo.complete ? "complete" : ""}>{todo.description}</td>
                                        <td className={todo.complete ? "complete" : ""}>{todo.priority}</td>
                                        <td className={todo.complete ? "complete" : ""}>{todo.responsible}</td>
                                        <td className='actions'>
                                                <Link to={
                                                    "/edit/" + todo._id
                                                }> 
                                                    <button className='editBtn'> Edit </button></Link>
                                                <Link to='/' onClick={() => {
                                                        axios.delete(`http://localhost:5000/todo/delete/${todo._id}`)
                                                        .then(() => window.location.reload())
                                                    }}>
                                                    <button className='dltBtn'> Delete </button>
                                                </Link>
                                                <Link to='/' onClick={() => {
                                                        axios.put(`http://localhost:5000/todo/markAsDone/${todo._id}/${!(todo.complete)}`)
                                                        .then(() => window.location.reload())
                                                    }}>
                                                    <button className= {todo.complete ? "notDoneBtn" : "doneBtn"}> {todo.complete ? "Not Done" : "Done"} </button>
                                                </Link>
                                        </td>
                                    </tr>)
                                })}
                        
                    </tbody>
                </table>
                </div>
            </div>
        
        );
        
    }
    
    export default TodoList;