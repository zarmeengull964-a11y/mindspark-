import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const nav = useNavigate();

  const handleSuccess = (res) => {
    console.log(res);
    nav('/'); 
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <h1>Login Page</h1>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />

    </div>
  );
}