import React, { useState } from 'react';
import axios from 'axios';

function SignInForm({ onSignIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log("signin")
        try {

            const res = await axios.post('http://localhost:5000/api/user/signin', { 
                email: email, 
                password: password });


            if (res.data.success == false) {
                //ADD LOGIN ERROR MESSAGE TO SCREEN
                console.log('Sign-in failed. Please check your email and password.');
            }
            else {
                const userJWT = res.data.accessToken;
                onSignIn(userJWT);
            }

        } catch (error) {
            console.error('Signin error: ', error);
        }
    };



    return (
        <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInForm;