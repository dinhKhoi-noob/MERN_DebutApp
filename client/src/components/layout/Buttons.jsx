import React,{useContext} from 'react'
import playIcon from '../../assets/img/play.svg'
import penIcon from '../..//assets/img/pen.svg'
import trashIcon from '../../assets/img/trash.svg'
import {PostContext} from '../../contexts/PostContext'
const Buttons = ({url,id}) => {
    const {deletePost} = useContext(PostContext);
    const onDeletePost= async id =>{
        await deletePost(id);
    }
    return (
        <div class="text-left">
            <button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play icon" style={{width:"32px",height:"32px"}}/>
            </button>
            <button type="button" className="post-button">
                <img src={penIcon} alt="trash icon" style={{width:"23px",height:"23px"}}/>
            </button>
            <button type="button" className="post-button" onClick={()=>onDeletePost(id)}>
                <img src={trashIcon} alt="pen icon" style={{width:"23px",height:"23px"}}/>
            </button>
        </div>
    )
}

export default Buttons
