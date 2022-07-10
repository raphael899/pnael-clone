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

 import React, { useEffect, useState } from 'react'
 import './Sidebar.css';
 import {Avatar, IconButton} from '@material-ui/core';
 import DonutLargeIcon from '@mui/icons-material/DonutLarge';
 import ChatIcon from '@mui/icons-material/Chat';
 import MoreVertIcon from '@mui/icons-material/MoreVert';
 import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 import SidebarChat from './SidebarChat';
 import db from './firebase';
 function Sidebar(){
  const [room, setRooms] = useState([]);
  useEffect(() => {
  const unsubscribe =  db.collection('rooms').onSnapshot((snapshot)=>
      setRooms(
         snapshot.docs.map((doc) => ({
           id: doc.id,
           data: doc.data(),
         }))
      )
    );
    return ()=>{
        unsubscribe();
    }

}, [])

   return (
     <div className="sidebar">
        <div className="sidebar__header">
            <Avatar />
        <div className="sidebar__headerRigth">
             <IconButton>
             <DonutLargeIcon />
             </IconButton>
             <IconButton>
             <ChatIcon />
             </IconButton>
             <IconButton>
             <MoreVertIcon />
             </IconButton>
        </div>
        </div>
        <div className="sidebar__search">
        <div className="sidebar__searchContainer">
            <SearchOutlinedIcon />
            <input placeholder="Search or start new chat" type="text"></input>
        </div>
        </div>
        <div className="sidebar__chat">
            <SidebarChat addNewChat />
            {room.map ((room) => (
               <SidebarChat key={room.id} id={room.id} name={room.data.name} />
             ))}
        </div>
    </div>
   )
 }
 
 export default Sidebar;