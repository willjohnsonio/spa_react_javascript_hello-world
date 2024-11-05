import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from 'react-router-dom';
import { loginUrl } from "../../constants/auth-url";


export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return (
    <Link to={loginUrl}>
    <button className="button__login" onClick={handleLogin}>
      Log In
    </button>
    </Link>
  );
};