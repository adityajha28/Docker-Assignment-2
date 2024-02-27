import  './EditTodo.css';
import axios from 'axios';
import { useParams } from 'react-router';
import { useEffect } from 'react';

const withRouter = WrappedComponent=>props=>{
    const params=useParams();
    // const navigate= useNavigate();
    return <WrappedComponent {...props} params={params} />
 }

function EditTodo({setData,data,params})
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
    function onChangeComplete(e) {
        let status=(e.target.value==="true");
        setData({...data,complete: status});
        // console.log(data.complete,e.target.value,status);
    }

    const submit=(e)=>{
        e.preventDefault();
        // let status=(data.complete=="true");
        let newTodo =
                {
                    title:data.title,
                    description:data.description,
                    responsible:data.responsible,
                    priority:data.priority,
                    complete:data.complete
                }
        axios.put('http://localhost:5000/todo/update/'+params.id, newTodo).then(res => {});

        console.log("Updated Todo");
        console.log(newTodo);
        
        //setData({...data});
        // window.location.reload();

        window.location.replace('/');

        setData({title:'',description: '',responsible: '', priority: ''})


    }

    

    useEffect(()=>{
        axios.get('http://localhost:5000/todo/' + params.id).then(res => {

            // console.log('http://localhost:5000/todo/' + params.id);
            // console.log("id");
            // console.log(params.id);
            // console.log("res data");
            // console.log(res.data);

            setData({title:res.data[0].title, description: res.data[0].description, responsible: res.data[0].responsible, priority: res.data[0].priority, complete: res.data[0].complete})
        })
        .then(()=>{
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return(
        <div className='editTodoContainer'>
            <div className='editBox'>
            <h1>Edit Todo</h1>
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
                <div>
                <label htmlFor="complete">Status </label>
                    <br />
                    <select name="complete" id="complete" onChange={onChangeComplete} value={data.complete?"true":"false"}>
                        <option value="true">Completed</option>
                        <option value="false">Not Completed</option>
                    </select>
                </div>
                <button type='submit'>Update Task</button>


            </form>
            </div>
        </div>
    );

}
export default withRouter(EditTodo);