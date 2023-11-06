import './App.css';
import React from 'react';
import SignInForm from './user/signin.js';
import SignUpForm from './user/signup.js';
import SignOutForm from './user/signout.js';
import HomePage from './home/home.js';
import { CookiesProvider, useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user_jwt"])

  function handleSignIn(user) {
    setCookie("user_jwt", user);
  }

  function handleSignOut() {
    removeCookie("user_jwt");
  }

  return (
    <div className="App">
      {(cookies.user_jwt !== undefined && cookies.user_jwt !== null ) ? (
        <HomePage user={cookies.user_jwt} onSignOut={handleSignOut}/>
      ) : (
        <SignInForm onSignIn={handleSignIn}/>
      )}
    </div>
  );
}

export default App;