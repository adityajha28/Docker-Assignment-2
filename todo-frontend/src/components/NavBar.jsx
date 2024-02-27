import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import  './NavBar.css';
function Nav()
{
    return(
        <div className="nav">
            <ul className='navList'>
                <li>
                    <a href="/">
                        <img src={logo} alt="logo" className='logo'/>
                    </a>
                </li>
                <li><Link to='/'><a href=' '>Todo List</a></Link></li>
                <li><Link to='/create'><a href=' '>Create Todo</a></Link></li>
                <li><Link to='/' onClick={() => {axios.put(`http://localhost:5000/todo/markAsDone/true`).then(() => window.location.reload())}}>
                        <button className='mkd'>Mark As Done All</button>
                    </Link>
                </li>
                <li><Link to='/' onClick={() => {axios.delete(`http://localhost:5000/todo/delete`).then(() => window.location.reload())}}>
                        <button className='dlt'>Delete All Todos</button>
                    </Link>
                </li>
            </ul>
        </div>
    ); 

}

export default Nav;