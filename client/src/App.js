import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
     <div className='mainContainer'>
       {users.map(user => {
         return (
           <div className="userContainer" key={user.id}>
             <h2>Name: {user.name}</h2>
          </div>
         )
       })}
     </div>
  )
}

export default App;