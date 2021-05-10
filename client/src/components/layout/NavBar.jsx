import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'

const NavBar = () => {
    const {logout,authState} = useContext(AuthContext);
    const onLogout=()=>{
        logout();
        // window.location.reload();
    }
    console.log(authState);
    return (
        <div>
            <nav class="navbar navbar-light navbar-expand bg-light justify-content-between">
                <div class="nav navbar-nav">
                    <Link class="nav-item nav-link active" to="/dashboard">Dashboard <span class="sr-only">(current)</span></Link>
                    <Link class="nav-item nav-link" to="/about">About</Link>
                </div>
                <div>Welcome back, {authState.user.username}</div>
                <div style={{cursor:"pointer"}} onClick={onLogout}>Logout <i class="fas fa-door-open"></i></div>
            </nav>
        </div>
    )
}

export default NavBar
