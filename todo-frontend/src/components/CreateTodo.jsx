import  './CreateTodo.css';
import axios from 'axios';

function CreateTodo({setData,data})
{
    function onChangeTitle(e) {
        setData({...data,title: e.target.value});
    }
    function onChangeDescription(e) {
        setData({...data,description: e.target.value});
    }

    function onChangeResponsible(e) {
        setData({...data,responsible: e.target.value});
    }

    function onChangePriority(e) {
        setData({...data,priority: e.target.value});
    }

    const submit=(e)=>{
        e.preventDefault();
        let newTodo =
                {
                    title:data.title,
                    description:data.description,
                    responsible:data.responsible,
                    priority:data.priority,
                    complete:false
                }
        axios.post('http://localhost:5000/todo/add', newTodo).then(res => {});
        console.log(newTodo);
        
        //setData({...data});
        // window.location.reload();

        window.location.replace('/');

        setData({title:'',description: '',responsible: '', priority: ''})


    }
    
    return(
        <div className='createTodoContainer'>
            <div className='createBox'>
            <h1>Create New Todo</h1>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="title">Title </label>
                    <br />
                    <input type="text" name="title" id="title" required onChange={onChangeTitle} value={data.title}/>
                </div>
                <div>
                    <label htmlFor="desc">Description </label>
                    <br />
                    <textarea type='' name="desc" id="desc" required onChange={onChangeDescription} value={data.description}/>
                </div>
                <div>
                    <label htmlFor="priority">Priority </label>
                    <br />
                    <select name="priority" id="priority" onChange={onChangePriority} value={data.priority}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="responsible">Responsible </label>
                    <br />
                    <input type="text" name="responsible" id="responsible" onChange={onChangeResponsible} value={data.responsible}/>
                </div>
                <button type='submit'>Add Task</button>


            </form>
            </div>
        </div>
    );

}

export default CreateTodo;