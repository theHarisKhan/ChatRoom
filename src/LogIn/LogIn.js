import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import { useStateValue } from '../Redux/StateProvider'
import { actionTypes } from '../Redux/reducer'
import './LogIn.css'
import Logo from './ChatRoom.png'

function LogIn() {
    const [{}, dispatch] = useStateValue()

    const SignIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message))
    }

    return (
        <div className="LogIn__Block">
            <div className="LogIn__Block_div">
            <img src={Logo} alt=""/>
            <h1>Join us Now</h1>
            <Button onClick={SignIn}>
                Sign In
            </Button>
            </div>
        </div>
    )
}

export default LogIn
