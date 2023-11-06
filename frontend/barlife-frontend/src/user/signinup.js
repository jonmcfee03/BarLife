import React from "react";
import SignInForm from "./signin";
import SignUpForm from "./signup";

function SignInUpPage({ setJWTCookie }) {
    return (
    <div>
      <h2>Sign In or Sign Up</h2>
      <div>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
    )
}