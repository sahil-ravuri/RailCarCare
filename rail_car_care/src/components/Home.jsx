import React from "react";

function Home(){

    const login=JSON.parse(localStorage.getItem('signupData'));

    const handleLogout = (e) => {
        window.location.href="/login";
      };

    return (
        <div>
        <div>
            <h1>Welcome to the website {login.name.toUpperCase()}</h1>
        </div>
        <input type="button" value="Logout" onClick={handleLogout} />
        </div>
    );
}

export default Home;