import React, { useState, useEffect } from "react";
//import authMethods from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // Keeping the user information
  //const [trainings, setTrainings] = useState([]); // To store user trainings

  const storeUserData = (userData) => {
    localStorage.setItem("user", userData); // generate a "user" key with value "userData"
  };

  const authenticateUser = () => {
    // to see if the user is already login
    const user = localStorage.getItem("user"); // checking in the localStorage the user key

    if (user) {
      //If user exists in the localStorage
      const persedUser = JSON.parse(user);
      // Update state variables
      setIsLoggedIn(true);
      setIsLoading(false);
      setUser(persedUser);
    } else {
      // If user is not avaliable (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeUser = () => {
    localStorage.removeItem("user"); // remove user key from localStorage
  };

  const logOutUser = () => {
    localStorage.removeUser(); // clear localStorage
    authenticateUser(); // update state variables accordingly
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeUserData,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
