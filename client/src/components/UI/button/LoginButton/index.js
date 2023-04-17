import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    const domain = 'dev-wn8dda6v.us.auth0.com';
    const audience = 'https://www.blogApp-api.com';
    const scope = 'read:posts';
    const clientId = 'fs6pK4pta1bdawgfMgdybGYMNCniOT5d';
    const responceType = 'code';
    const redirectURI = 'http://localhost:3000/challenges';

    const responce = fetch(
      `https://${domain}/authorize?` +
      `audience=${audience}&` +
      `scope=${scope}&` +
      `responce_type=${responceType}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectURI}&`, {
        redirect: 'manual',
      }
    );

    window.location.replace((await responce).url)
  }

  return <button className="Login-button" onClick={() => login()}>Log In</button>;
};

export default LoginButton;