import React,{createContext,useReducer,useState} from 'react'
import axios from 'axios'
import * as Type from '../constant/type'
import {apiUrl} from '../constant/url'
import {postReducer} from '../reducers/post'


export const PostContext = createContext();

const PostContextProvider = ({children}) => {
    const [postState,dispatch] = useReducer(postReducer,{post:null,posts:[],postLoading:true});
    const [displayPostModal,setDisplayPostModal] = useState(false);
    const [displayToast,setDisplayToast] = useState({
        show: false,
        success:false,
        type:"danger",
        message:""
    })
    //get all posts
    const loadPosts = async () => {
        try
        {
            const response = await axios.get(`${apiUrl}/api/posts`);
            if(response.data.success) {
                dispatch({
                    type: Type.GET_POSTS_SUCCESS,
                    payload: response.data.posts
                })
            }
            return response.data; 
        }
        catch (error) {
            dispatch({type:Type.GET_POSTS_FAILED})
            if(error.response.data)
                return error.response.data;
            else
                return {success:false,error:error.message}
        }
    }
    const findPost = (postId) =>{
        const post = postState.posts.find((p)=>p._id===postId);
        dispatch({
            type:Type.FIND_POST,
            payload:post   
        })
    }
    const addPost = async (newPost) =>
    {
        try
        {
            const response = await axios.post(`${apiUrl}/api/posts`,newPost);
            if(response.data.success) {
                dispatch({
                    type:Type.CREATE_POST,
                    payload: response.data.post
                })
                console.log(response.data.post);
                return response.data;
            } 
        }
        catch (error) {
            return error.response.data?error.response.data:{success:false,message:error.message}
        }
    }
    const updatePost = async (newPost) =>
    {
        try 
        {
            const response = await axios.put(`${apiUrl}/api/posts${newPost._id}`);
            if(response.data.success) {
                dispatch({
                    type:Type.UPDATE_POST,
                    payload: response.data.updatedPost
                })
            }         
            return response.data
        } 
        catch (error) 
        {
            return error.response.data?error.response.data:{success:false,message:error.message}
        }
    }
    const deletePost = async(postId) => {
        try 
        {
            const response = await axios.delete(`${apiUrl}/api/posts/${postId}`);    
            if(response.data.success)
                dispatch({
                    type:Type.DELETE_POST,
                    payload: response.data.deletedPost._id
                })
            window.location.reload();
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    const PostContextData = {
        postState,
        loadPosts,
        displayPostModal,
        setDisplayPostModal,
        addPost,
        displayToast,
        setDisplayToast,
        deletePost,
        updatePost,
        findPost
    }
    return (
        <PostContext.Provider value = {PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;
