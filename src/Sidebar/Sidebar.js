import { Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import db from '../firebase'
import './Sidebar.css'
import SidebarChats from './SidebarChats'

function Sidebar() {
    const [rooms, setRooms] = useState([])

    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))
    },[])

    return (
        <div className="sidebar">
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
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
