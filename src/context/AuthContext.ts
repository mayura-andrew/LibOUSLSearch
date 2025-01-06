import React from 'react';

export type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});
