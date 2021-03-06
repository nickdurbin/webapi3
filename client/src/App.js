import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import CharacterPage from './components/Characters/CharacterPage';
import Character from './components/Characters/Character';
import styled from 'styled-components';
import BG from './images/bg.jpg'

function App() {

  return (
    <>
    <Switch>
      <Route path='/characters' render={props => <CharacterPage {...props} /> } />
      <Route path='/characters/:id' render={props => <Character {...props} /> } />
    </Switch>

     <MainContainer>
       <CharacterPage />
     </MainContainer>
    </>
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

export default withRouter(App);