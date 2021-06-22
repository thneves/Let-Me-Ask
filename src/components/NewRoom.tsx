import React from 'react';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import logoImg from '../assets/images/logo.svg';

export function NewRoom() {
  return (
    <div id="page-auth">
      <aside>
        <img src="" alt="" />
        <strong></strong>
        <p></p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask logo" />
          <h2>Create new Room</h2>
          <div></div>
          <form action="">
            <input
             type="text"
             placeholder="Room's name"
            />
            <Button type="submit">
              Create new room
            </Button>
          </form>
          <p>Wanna join an existing room? <a href="#">click here</a></p>
        </div>
      </main>
    </div>
  )
}
