import React,{useContext,useState} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const Register = () => {
    const {registerUser} = useContext(AuthContext);
    const [registerForm,setRegisterForm] = useState({
        username:"",
        password:"",
        confirmPassword:""
    })
    const {username,password,confirmPassword} = registerForm;
    const [alert,setAlert] = useState(null);
    const onChangeForm = (event) =>{
        return setRegisterForm({...registerForm,[event.target.name]:event.target.value});
    }
    const onSubmitForm = async event =>{
        event.preventDefault();
        if(password !== confirmPassword)
        {
            setAlert(
                {type:"error",message:"Password must be matched"}
            )
            setTimeout(()=>setAlert(null),5000);
            return
        }
        try {
            const registerData = await registerUser(registerForm);
            if(registerData.success)
                console.log("Success");
            else{
                setAlert({type:"danger",message:registerData.message});
                setTimeout(()=>setAlert(null),5000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className="form-group" onSubmit={onSubmitForm}>
            <AlertMessage info={alert}/>
            <input type="text"
            className="form-control" id="" placeholder="Username" value={username} name="username" onChange={onChangeForm}/>
            <input type="password" style={{marginTop:"5px",marginBottom:"5px"}}
            className="form-control" id="" placeholder="Password" name="password" value={password} onChange={onChangeForm}/>
            <input type="password" style={{marginTop:"5px",marginBottom:"5px"}}
            className="form-control" id="" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChangeForm}/>
            <button type="submit" className="btn btn-black">Create</button>&nbsp;
            <p> Already have an account, go back
                <Link to="/login">
                        <i style={{marginLeft:"5px",fontSize:"25px"}} class="fas fa-arrow-circle-left"></i>
                </Link>
            </p>
        </form>  
    )
}

export default Register;
