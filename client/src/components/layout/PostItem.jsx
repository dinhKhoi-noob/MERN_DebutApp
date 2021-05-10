import React from 'react'
import Buttons from './Buttons'

const PostItem = ({title,status,description,url,id}) => {
    const color = status==="LEARNED"?"blue":status==="LEARNING"?"orange":"red";
    return (
        <div style={{border: `1px solid ${color}`,paddingRight:'8px',paddingLeft:'8px',borderRadius:'10px'}} class="col-md-4 col-lg-4 col-sm-4 col-xs-4 ml-3 mt-3 card text-left">
          <div class="card-body">
            <div class='row'>
              <h4 class="col col-md-8 col-sm-8 col xs-8 col-lg-8 card-title text-left">{title}</h4>
              <div class="col col-md-4 col-sm-4 col xs-4 col-lg-4" style={{paddingRight:"0px"}}>
                <Buttons id={id} url={url}/>
              </div>
            </div>
            <p class="card-text">{description}</p>
            <p class="card-text">{id}</p>
            <span className={status==="LEARNED"?"badge badge-primary":status==="LEARNING"?"badge badge-warning":"badge badge-danger"}>
              {status}
            </span>
          </div>
        </div>
    )
}

export default PostItem
