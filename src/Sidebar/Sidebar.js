import { Menu, MenuOpen, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import db from '../firebase'
import './Sidebar.css'
import SidebarChats from './SidebarChats'

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [click, setClick] = useState(false)

    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
    },[])

    const handleClick = () => setClick(!click)
    const CloseMenu = () => setClick(false)

    return (
        <>
        <div className="toggle__btn" onClick={handleClick}>
            { click ? <MenuOpen /> : <Menu /> }
        </div>
        <div className={click ? `sidebar active__toggle` : `sidebar`}>
            <div className="sidebar__Search">
                <Search />
                <input type="text" placeholder="Search"/>
            </div>
            <div className="sidebar__ChatRooms">
                <SidebarChats addNewChat />
                {rooms.map(room => (
                    <SidebarChats 
                        key={room.id}
                        id={room.id}
                        title={room.data.name}
                        ClickAct={CloseMenu}
                    />
                ))}
            </div>
        </div>
        </>
    )
}

export default Sidebar
