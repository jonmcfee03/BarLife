import React, { useState } from 'react';
import axios from 'axios';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        console.log(email);
        console.log(password);
        try {

        const response = await axios.post('http://localhost:5000/api/user/signin', { 
            email: email, 
            password: password });

            console.log("bruh");
            
            console.log("Signin response:", response.data);
        } catch (error) {
            console.error('Signin error: ', error);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit">Sign In</button>
        </form>
    );
}

export default SignInForm;