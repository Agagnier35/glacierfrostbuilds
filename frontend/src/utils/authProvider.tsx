import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import AuthRepository from '../api/repository/authRepository';

export interface Auth {
    user?: string;
}

interface AuthContextType {
    auth?: Auth;
    setAuth: (a: Auth) => void;
    logout: () => void;
}

const defaultAuth: Auth = {};
export const AuthContext = createContext<AuthContextType>({
    auth: defaultAuth,
    setAuth: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<Auth>();

    useEffect(() => {
        AuthRepository.getUserSession().then((u) => setAuth({ user: u }));
    }, []);

    const logout = () => AuthRepository.logout().then(() => setAuth(undefined));

    const authContextValue = useMemo(() => ({ auth, setAuth, logout }), [auth, setAuth]);

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
