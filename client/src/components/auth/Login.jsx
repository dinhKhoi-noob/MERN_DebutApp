import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const Login = () => {
    //use context
    const {loginUser} = useContext(AuthContext); 
    const [alert,setAlert] = useState(null)
    const [loginForm,setLoginForm] = useState({username:"",password:""});
    // const history = useHistory();
    const {username,password} = loginForm;
    const onChangeForm = (event)=>{
        return setLoginForm({...loginForm,[event.target.name]:event.target.value})
    }
    const login = async event=>
    {
        event.preventDefault();
        try
        {
            const loginData = await loginUser(loginForm);
            if(loginData.success)
                // history.push('/dashboard');
                console.log(loginData);
            else
            {
                setAlert({type:"danger",message:loginData.message});
                setLoginForm({username:"",password:""});
                setTimeout(()=>setAlert(null),5000);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
    return (
        <form onSubmit={login} className="form-group">
            <AlertMessage info={alert}/>
            <input type="text"
            className="form-control" id="" placeholder="Username" onChange = {onChangeForm} value={username} name="username"/>
            <input type="password" style={{marginTop:"5px",marginBottom:"5px"}}
            className="form-control" id="" placeholder="Password" name="password" onChange={onChangeForm} value={password}/>
            <button type="submit" className="btn btn-default">Login</button>&nbsp;
            <Link to='/register'>
            <button type="click" className="btn btn-black">Register</button>
            </Link>
        </form>
        
    )
}

export default Login
