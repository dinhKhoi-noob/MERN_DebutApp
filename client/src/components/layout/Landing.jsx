import React from 'react'
import {Redirect} from 'react-router-dom'

function Landing() {
    return (
        <Redirect to="/login"></Redirect>
    )
}

export default Landing
