import React from "react";
import {NavLink} from "react-router-dom";
import {Footer, Navigation} from "./index";
import GoogleLogin from "react-google-login";

function Login() {
    return (

        <div>
            <Navigation />
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText={"Log in with Google"}
                    onSuccess={handleLogin}
                >
                </GoogleLogin>
            <Footer />

        </div>
    );
}

export default Login;
