import React,{useContext} from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import {Route,Redirect} from 'react-router-dom'

const ProtectedRoute = ({component:Component,...rest}) => {
    const {authState:{authLoading,isAuthenticated}} = useContext(AuthContext);
    if(authLoading)
        return(
            <div className="spinner-container">
               <Spinner animation='border' variant="info"/>
            </div>
        )
    return (
        <Route {...rest} render={props=>{
            return isAuthenticated?(
            <>
                <Component {...rest} {...props}></Component>
            </>):(
            <Redirect to="/login"/>
            )
        }}/>
    )
}

export default ProtectedRoute
