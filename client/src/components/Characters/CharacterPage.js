import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Character from './Character';

function CharacterPage(props) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err, 'Users could not be found.')
      })
  })

  return (
    <>
      {users.map(user => {
         return (
           <Link to={`/characters/${user.id}`}>
            <User key={user.id}>
              <Character id={user.id} user={user} />
            </User>
          </Link>
         )
       })}
    </>
  )
}

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  max-height: 200px;
  height: 100%;
  margin: 1%;
  padding: 1%;
  background: white;
  border: none;
  border-radius: 1em;
  box-shadow: 1px 3px 5px;
  cursor: pointer;
  text-decoration: none;
`

export default CharacterPage;