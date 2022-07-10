// Copyright 2022 desar
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Avatar ,IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from './firebase';

function Chat() {
    const [robot , setRobot] = useState('');
    const [input , setinput] = useState('');
    const {roomId} = useParams();
    const [roomName , setRoomName] = useState('');
    const [messages , setMessages] = useState([]);

    useEffect(() =>{
        setRobot(Math.floor(Math.random()*5000))

    }, []);

    const sendMessage = (e) => {
          e.preventDefault();
          console.log("You typed >>>>" , input);
          setinput("");
    }

    useEffect(() => {
        if(roomId){
           db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
              setRoomName(snapshot.data().name)
           ))
            db.collection('rooms').doc(roomId).collection('messages')
            .orderBy('timestamp' , 'asc').onSnapshot(snapshot =>
              (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))

        }
    }, [roomId]);

  return (
    <div className="chat">
     <div className="chat__header">
       <Avatar src={`https://avatars.dicebear.com/api/bottts/${robot}.svg`}/>   
       <div className="chat__headerInfo">
         <h3>{roomName}</h3>
         <p>Last seen......</p>
       </div>
       <div className="chat__headerRight">
             <IconButton>
             <SearchOutlinedIcon />
             </IconButton>
             <IconButton>
             <AttachFileIcon />
             </IconButton>
             <IconButton>
             <MoreVertIcon />
             </IconButton>
       </div>
    </div>  
     <div className="chat__body">
      {messages.map((message) =>(
            <p className={`chat__message ${true && "chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>{message.message}
            <span className="chat__timestamp">
              {new Date (message.timestamp?.toDate()).toUTCString()}
            </span>
           </p>
       ))}
     </div>
     <div className="chat__footer">
      <InsertEmoticonIcon/>
      <form>
        <input value={input} onChange={e => setinput(e.target.value)} placeholder='Type a message' type="text" />
        <button type="submit" onClick={sendMessage}>Send a message</button>
      </form>
     </div>
    </div>
  )
}

export default Chat;