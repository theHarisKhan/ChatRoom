import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { ArrowDropDown, ExitToApp, FilterList, Notifications } from '@material-ui/icons'
import React, { useState } from 'react'
import { useStateValue } from '../Redux/StateProvider'
import './TopBar.css'
import Logo from './ChatRoom.png'
import firebase from 'firebase'
import { actionTypes } from '../Redux/reducer'

function TopBar() {
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
                type: actionTypes.SET_USER,
                user: null,
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <div className="topbar">
            <div className="topbar__left">
                <img src={Logo} alt="chatroom logo"/>
                <div className="topbar__left_rt">
                    <IconButton>
                        <FilterList />
                    </IconButton>
                    <p>Newest</p>
                </div>
            </div>
            <div className="topbar__right">
                <IconButton className="Notification">
                    <Notifications />
                </IconButton>

                <Avatar src={user.photoURL}/>
                <h4>{user.displayName}</h4>

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
                            <ExitToApp />
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default TopBar
