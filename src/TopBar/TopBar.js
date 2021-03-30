import { Avatar, IconButton } from '@material-ui/core'
import { ArrowDropDown, FilterList, Notifications } from '@material-ui/icons'
import React from 'react'
import { useStateValue } from '../Redux/StateProvider'
import './TopBar.css'
import Logo from './ChatRoom.png'

function TopBar() {
    const [{ user }, dispatch] = useStateValue()

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

                <IconButton>
                    <ArrowDropDown />
                </IconButton>
            </div>
        </div>
    )
}

export default TopBar
