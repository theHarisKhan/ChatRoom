import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../firebase'
import './Sidebar.css'

function SidebarChats({
    title,
    timestamp,
    id,
    activeChat, 
    addNewChat
}) {

    const [seed, setSeed] = useState()
    const [messages, setMessages] = useState("")

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str
    }

    useEffect(() => {
        if(id){
            db.collection("rooms")
              .doc(id)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) =>
                doc.data())))
        }
    },[id])

    useEffect(() => {
       setSeed(Math.floor(Math.random()*5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Enter Chat Room Name")

        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }

    return (
        <>
        {!addNewChat ? (
            <Link to={`/rooms/${id}`}>
                <div className="sidebar__Chats">
                    {activeChat && <div className="active__bar"></div>}
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebar__Chats_info">
                        <h4>{title}</h4>
                        <p className="timeStamp">{truncate(messages[0]?.message , 20)}</p>
                    </div>
                </div>
            </Link>
        ) : (
            <div className="sidebar__AddRoom" onClick={createChat}>
                <h3>Add New Room</h3>
            </div>
        )}  
        </>
    )
}

export default SidebarChats
