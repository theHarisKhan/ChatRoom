import { ArrowBack } from '@material-ui/icons'
import React from 'react'
import './App.css'
import ChatRoomLogo from './TopBar/ChatRoom.png'

function Welcome() {
    return (
        <div className="Welcome">
            <div className="welcome__div">
                <img src={ChatRoomLogo} alt="ChatRoom Logo"/>
                <h1>Join the Discussion by Clicking on Left Side Room</h1>
                <ArrowBack />

                <div className="creator">
                    <h4>Created by <a href="https://thehariskhan.netlify.app/">Haris Khan</a></h4>
                </div>
            </div>
        </div>
    )
}

export default Welcome
