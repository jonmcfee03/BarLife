import './App.css';
import React from 'react';
import SignInUpForm from 
import HomePage from './home/home.js';
import { CookiesProvider, useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_jwt"])

  function saveJWTCookie(user) {
    setCookie("user_jwt", user);
  }

  function deleteJWTCookie() {
    removeCookie("user_jwt");
  }

  return (
    <div className="App">
      {(cookies.user_jwt !== undefined && cookies.user_jwt !== null ) ? (
        <HomePage user={cookies.user_jwt} onSignOut={deleteJWTCookie}/>
      ) : (
        <SignInForm onSignIn={saveJWTCookie}/>
      )}
    </div>
  );
}

export default App;