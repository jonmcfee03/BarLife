import React  from 'react';
import { useJwt } from 'react-jwt';

function HomePage({user, onSignOut} ) {
    console.log(user);
    const decodedToken = useJwt(user);
    console.log("decodedToken", decodedToken);

    const handleSignOut = async (e) => {
        e.preventDefault();
        console.log("signout")
        try {
            onSignOut();

        } catch (error) {
            console.error('Signout error: ', error);
        }
    };

    return (
        <div className="homepage">
            <h1>Welcome</h1>
            <body>Hi</body>
            
            <form onSubmit={handleSignOut}>
            <button type="submit">Sign Out</button>
        </form>
        </div>
    )
}

export default HomePage;