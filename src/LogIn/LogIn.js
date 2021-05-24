import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../firebase'
import { useStateValue } from '../Redux/StateProvider'
import './LogIn.css'
import Logo from './ChatRoom.png'
import { useHistory } from 'react-router-dom'

function LogIn() {
    const history = useHistory()
    const [{}, dispatch] = useStateValue()

    const SignIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: 'SET_USER',
                    user: result.user,
                })
                history.push("/welcome")
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
