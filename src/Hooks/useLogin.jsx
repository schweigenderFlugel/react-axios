import React from "react";
import LoginContext from "../Context/LoginProvider";

const useLogin = () => {
    return React.useContext(LoginContext);
}

export default useLogin;