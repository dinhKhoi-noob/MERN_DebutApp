import React,{useContext} from 'react'
import Toast from 'react-bootstrap/Toast'
import {PostContext} from '../../contexts/PostContext'

const PostToast = () => {
    const {displayToast,setDisplayToast} = useContext(PostContext)
    const {message,show,type,success} = displayToast;
    let newMessage;
    const onCloseToast = () => {
        setDisplayToast(false);
    }
    if(success)
        newMessage = 'Adding successfully !'
    else
        newMessage = `Adding failed, ${message}`
    return (
        <Toast show={show} 
        style={{
            position:'fixed',
            top:"10%",
            right:"10px"
        }} 
        className={`bg-${type} text-white`} 
        onClose={onCloseToast}
        delay={4000}
        autohide
        >
            <Toast.Body closeButton>
                <strong>
                    {newMessage}
                </strong>
            </Toast.Body>
        </Toast>
    )
}

export default PostToast
