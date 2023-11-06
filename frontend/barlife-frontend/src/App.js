import './App.css';
import React from 'react';
import SignInForm from './user/signin.js';
import SignUpForm from './user/signup.js';
import SignOutForm from './user/signout.js';
import HomePage from './home/home.js';
import { CookiesProvider, useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"])

  console.log("cookies.user", cookies.user);

  function handleSignIn(user) {
    setCookie("user", user);
  }

  function handleSignOut() {
    removeCookie("user");
  }

  return (
    <CookiesProvider>
      <div className="App">
        {cookies.user ? (
          <HomePage user={cookies.user} onSignOut={handleSignOut}/>
        ) : (
          <SignInForm onSignIn={handleSignIn}/>
        )}
      </div>
    </CookiesProvider>
  );
}

export default App;