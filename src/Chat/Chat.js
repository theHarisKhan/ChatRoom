import { Avatar, IconButton } from '@material-ui/core'
import { AccessTime, Attachment, InsertEmoticon, MoreVert, Send, Star } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import db from '../firebase'
import firebase from 'firebase'
import { useStateValue } from '../Redux/StateProvider'
import './Chat.css'

function Chat() { 
    const [input, setInput] = useState("")
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()
    const { roomId } = useParams()

    useEffect(() => {
        if (roomId){
            db.collection('rooms')
              .doc(roomId)
              .onSnapshot((snapshot) => setRoomName(
                  snapshot.data().name))
            
            db.collection('rooms')
              .doc(roomId)
              .collection('messages')
              .orderBy('timestamp', 'asc')
              .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("")
    }

    return (
        <div className="chat">

            <div className="chat__header">
                <div className="chat__header_left">
                    <Avatar src='https://avatars.dicebear.com/api/human/108.svg' />
                    <div className="chat__header_left_div">
                        <h4>{roomName}</h4>
                        <p>
                            last seen{" "}
                            {new Date(
                                messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                        </p>
                    </div>
                </div>
                <div className="chat__header_right">
                    <IconButton>
                        <Star/>
                    </IconButton>
                    <IconButton>
                        <AccessTime/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((msg) => (
                        <p className={`chat__Msg ${msg.name === user.displayName && 'chat__Reciever'}`}>
                        <span className="chat__name">{msg.name}</span>
                        {msg.message}
                        <span className="chat__timestamp">
                            {new Date(msg.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>   
                    <Attachment />
                </IconButton>
                <form>
                    <input 
                        type="text" 
                        placeholder="Write your message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="Msg__Submit-Btn"
                        onClick={sendMessage}
                    >
                        <Send />
                    </button>
                </form>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
            </div>
             
        </div>
    )
}

export default Chat 
