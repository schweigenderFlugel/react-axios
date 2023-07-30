import React from 'react';

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [ login, setLogin ] = React.useState(null);
    const [ loading, setLoading ] = React.useState(true)

    /*
    React.useEffect(() => {
        setLoading(true)
        fetch('https://schweigender.onrender.com/login')
        .then((response) => response.json())
        .then((data) => setLogin(data))
        .finally(() => setLoading(false))
    }, [])
    */

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

