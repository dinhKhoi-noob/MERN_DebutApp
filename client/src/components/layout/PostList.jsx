import React,{useContext,useEffect} from 'react'
import {PostContext} from '../../contexts/PostContext'
import Spinner from 'react-bootstrap/Spinner'
import PostItem from './PostItem';

const PostList = () => {
    const {setDisplayPostModal,postState:{posts},loadPosts} = useContext(PostContext);

    const onDisplayPostModal = ()=>{
        setDisplayPostModal(true);
    }
    useEffect(()=>loadPosts(),[])
    let data = null;
    if(posts.length > 0)
    {
        data = posts.map((post,index)=>
        <PostItem title={post.title} status={post.status} description={post.description} url={post.url} key={index} id={post._id}/>)
    }
    else if(posts && posts.length === 0)
        data=
        <>
            <div class="text-center col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div class="card-body">
                    <h4 class="card-title">You still not have any post</h4>
                    <p class="card-text">Click button below to create new post</p>
                    <button type="button" class="btn btn-outline-success" onClick={onDisplayPostModal}>Create new Post</button>
                </div>
            </div>
        </>
    else
        data = <div className="spinner-container"><Spinner animation="border" variant="info"/></div>
    return (
        <div className="row">
            {data}
        </div>
    )
}

export default PostList
