import React,{useContext} from 'react'
import NavBar from '../components/layout/NavBar'
import PostList from '../components/layout/PostList'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import PostModal from '../components/layout/PostModal'
import {PostContext} from '../contexts/PostContext'
import PostToast from '../components/layout/PostToast'

const Dashboard = () => {
    const {displayToast,setDisplayPostModal} = useContext(PostContext)
    const onDisplayPostModal = ()=>{
        setDisplayPostModal(true);
    }
    return(
        <div>
            <NavBar></NavBar>

            {displayToast.show?<PostToast/>:""}
            <PostList/>
            <OverlayTrigger 
            placement="bottom" 
            overlay={
                <Tooltip>
                    Create new post
                </Tooltip>
            }>
                <i 
                class="fas fa-plus-circle btn-floating" 
                onClick={onDisplayPostModal} 
                style={{
                    cursor: 'pointer',
                    fontSize:'50px',
                    color:"greenyellow"
                    }}
                />
            </OverlayTrigger>
            <PostModal/>
        </div>
    )
}

export default Dashboard;