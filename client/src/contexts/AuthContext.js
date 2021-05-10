import React,{createContext,useReducer,useEffect} from 'react';
import axios from 'axios';
import {authReducer} from '../reducers/auth'
import * as Type from '../constant/type'
import * as url from '../constant/url'
import {LOCAL_STORAGE_TOKEN_NAME} from '../constant/type'
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();


const AuthContextProvider = ({children}) =>
{
    const [authState,dispatch] = useReducer(authReducer,{
        authLoading:true,
        isAuthenticated:false,
        user:null
    });
    //Authenticate user
    const loadUser = async () =>
    {
        if(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME))
        {
            setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
        }
        try {
            const response = await axios.get(`${url.apiUrl}/api/auth`);
            console.log(response.data);
            if(response.data.success)
            {
                dispatch({
                    type:Type.SET_AUTH,
                    payload:{isAuthenticated:true,user:response.data.user}
                })                
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type:Type.SET_AUTH,
                payload:{isAuthenticated:false,user:null}
            })
        }
    }

    useEffect(()=>loadUser(),[]);

    //login
    const loginUser = async (userForm) =>{
        try {
            const response = await axios.post(`${url.apiUrl}/api/auth/login`,userForm);
            if(response){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken);
            }
            
            await loadUser();
            return response.data;
        } 
        catch (error) 
        {
            if(error.response.data)
                return error.response.data;
            else
                return {success:false,message:error.message}
        }
    }
    //register user

    const registerUser = async(userForm) =>{
        try
        {
            const response = await axios.post(`${url.apiUrl}/api/auth/register`,userForm);
            if(response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken);
            await loadUser();
            return response.data;
        }
        catch (error)
        {
            if(error.response.data)
                return error.response.data;
            else
                return {success:false,message:error.message}
        }
    }
    
    //logout

    const logout = () =>{
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type:Type.SET_AUTH,
            payload:{isAuthenticated:false,user:null}
        })
    }

    const authContextData = {
        dispatch,authState,loginUser,registerUser,logout
    }
    return(
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;