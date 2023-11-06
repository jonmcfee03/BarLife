import logo from './logo.svg';
import './App.css';
import SignInForm from './user/signin.js';
import SignUpForm from './user/signup.js';
import HomePage from './home/home.js';
import { CookiesProvider, useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <div className="App">
      {cookies.user ? (
        <HomePage user={cookies.user} />
      ) : (
        <SignInForm />
      )}
    </div>

  );
}

export default App;

