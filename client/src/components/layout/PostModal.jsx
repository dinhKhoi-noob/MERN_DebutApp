import React,{useContext,useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {PostContext} from '../../contexts/PostContext'

const PostModal = () =>{
    const {displayPostModal,setDisplayPostModal,addPost,setDisplayToast,displayToast} = useContext(PostContext)
    const [newPost,setNewPost] = useState({
        title:"",
        description:"",
        url:"",
        status:"TO LEARN"
    })
    const {title,description,url} = newPost;

    const resetFields = () => {
        setNewPost({title:"",description:"",url:""});
        setDisplayPostModal(false);
    }
    const onAddPost = async event => {
        event.preventDefault();
        const {message,success} = await addPost(newPost);
        setDisplayToast(
            {...displayToast
                ,success
                ,type:success?"success":"danger"
                ,message,show:true
            });
        resetFields();
    }

    const onTyppingForm = (event) => {
        setNewPost({...newPost,[event.target.name]:event.target.value});
    }

    const closeDialog = ()=>{
        resetFields();
    }
    return(
    <Modal show={displayPostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
            <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onAddPost}>
            <Modal.Body>
                <Form.Group>
                    <Form.Control 
                    autofocus={true}
                    type="text" 
                    placeholder="Title" 
                    name="title"
                    value={title} 
                    id="post-title" 
                    required aria-describedby="help-title" 
                    muted 
                    onChange={onTyppingForm}/>
                    <Form.Text id="help-title">
                        Required
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                    as="textarea" 
                    placeholder="Description" 
                    name="description" 
                    id="post-description" 
                    rows={3}
                    value={description}
                    onChange={onTyppingForm}/>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Type your link to learn" 
                    name="url" 
                    value={url}
                    onChange={onTyppingForm}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" 
                class="btn btn-outline-secondary" 
                onClick={closeDialog}>
                    Cancel
                </button>&nbsp;
                <button type="submit"
                 class="btn btn-outline-primary">
                     Create
                </button>
            </Modal.Footer>
        </Form>
    </Modal>
    )
}

export default PostModal;