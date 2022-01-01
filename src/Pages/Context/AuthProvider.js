import React, { createContext } from 'react';
import useFirebase from '../Firebase/useFirebase';
export const AuthContext=createContext()
const AuthProvider = ({children}) => {
    const Firebase=useFirebase()
    return (
        <AuthContext.Provider value={Firebase}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;