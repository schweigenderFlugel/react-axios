import React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [ login, setLogin ] = React.useState(null);
    const [ loading, setLoading ] = React.useState(true);

    return (
        <AuthContext.Provider value={{
            login,
            setLogin,
            loading,
            setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
} 

