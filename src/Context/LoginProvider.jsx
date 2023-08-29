import React from "react";

export const LoginContext = React.createContext({});

export const LoginProvider = ({ children }) => {
  const [ login, setLogin ] = React.useState({});

  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;