import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Character(props) {
  console.log(props)
  const id = props.match.params.id;
  const [user, setUser] = useState()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err.response)
      });
  }, [id]);

  return (
    <>
      <h2>Name: {user.name}</h2>
    </>
  )
}

export default Character;