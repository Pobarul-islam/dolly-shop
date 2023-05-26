import { createContext, useContext, useState } from "react";


const Authcontext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })
    return (
        <Authcontext.Provider value={[auth, setAuth]}>
            {children}
        </Authcontext.Provider>
    )
}



// custom hook 
const useAuth = () => useContext(Authcontext)

export {useAuth, AuthProvider}