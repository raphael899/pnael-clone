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
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


function SidebarChat({ addNewChat, id, name }) {
  const [robot, setRobot] = useState('');
  useEffect(() => {
    setRobot(Math.floor(Math.random() * 5000))

  }, []);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat');
    if (roomName) {

    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${robot}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Hola maradonaaaa....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
      className="sidebarChat"
    >
      <h2>Add new chat</h2>
    </div>
  );
}
export default SidebarChat;