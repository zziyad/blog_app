import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  // const { logout } = useAuth0();

  const logout = async () => {
    
  }

  return <button className="Login-button" onClick={() => logout()}>Log In</button>;
};


export default LogoutButton;