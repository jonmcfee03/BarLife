import React, { useState } from 'react';
import axios from 'axios';
import { CookiesProvider, useCookies } from 'react-cookie';
import { setCookie } from '../App.js';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:5000/api/user/signin', { 
                email: email, 
                password: password });

            const user = response.data;
            setCookie("user", user, { path: "/api/user"})
            console.log("Signin response:", response.data);

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