import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { ArrowDropDown, ExitToApp } from '@material-ui/icons'
import React, { useState } from 'react'
import { useStateValue } from '../Redux/StateProvider'
import './TopBar.css'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'

function TopBar() {
    const history = useHistory()
    const [{ user }, dispatch] = useStateValue()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const SignOut = () => {
        firebase.auth().signOut().then((result) => {
            dispatch({
                type: 'SET_USER',
                user: null,
            })
            history.push("/")
        })
        .catch((error) => alert(error.message))
    }

    return (
        <div className="topbar">

            <div className="topbar__box-left">    
                <Avatar src={user.photoURL}/>
                <h4>{user.displayName}</h4>
            </div>

            <div className="drop__down">   
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <ArrowDropDown />
                </IconButton>
                
                <Menu 
                    id="simple-menu" 
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={SignOut}>
                        <ExitToApp />{' '}Exit App
                    </MenuItem>
                </Menu>
            </div>

        </div>
    )
}

export default TopBar
