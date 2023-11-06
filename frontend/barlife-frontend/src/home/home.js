import React, { useState } from 'react';

function HomePage(user) {
    return (
        <div className="homepage">
            <h1>Welcome</h1>
            <body>Hi, {user.username} </body>
        </div>
    )
}

export default HomePage;