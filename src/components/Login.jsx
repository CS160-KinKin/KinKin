import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Navigation } from './index';
import GoogleLogin from 'react-google-login';
import User from '../util/User';

function Login(props) {
  const navigate = useNavigate();
  const handleFailure = (result) => {
    console.log(result);
  };
  const handleLogin = async (googleData) => {
    const user = new User();
    await user.fetchInfo(googleData.tokenId);
    props.setUser(user);
    navigate(-1);
  };
  return (
    <>
      <Navigation {...props} />
      <div className='row content'>
        <div className='center'>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Log in with Google'
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
