import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BG from './images/bg.jpg'

function App() {
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
     <MainContainer>
       {users.map(user => {
         return (
           <User className="userContainer" key={user.id}>
             <h2>Name: {user.name}</h2>
          </User>
         )
       })}
     </MainContainer>
  )
}

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url(${BG});
  background-repeat: no-repeat;
  background-position: center;
  object-fit: cover;
`;

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
`

export default App;