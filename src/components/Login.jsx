import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import {Footer, Navigation} from "./index";
import GoogleLogin from "react-google-login";
import User from "../util/User"
import image from "../assets/pt.jpg";

function Login(props) {

    const handleFailure = (result) => {
        console.log(result);
    }
    const handleLogin = async (googleData) => {
        const user = new User();
        await user.fetchInfo(googleData.tokenId);
        props.setUser(user);
    }
    const handleLogout = () => {
        props.setUser(new User());
    }
    return (
        <>
            <Navigation />
            <div className="home-container">
                <div className = "center">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    / >
                </div>
            </div>
            <Footer />

        </>
    );
}

export default Login;
