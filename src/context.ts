import React from 'react';

export type AppContextValue = {
    toggleMenu: () => void;
    isAuth: boolean;
    isSearch: boolean;
}

const AppContext = React.createContext<AppContextValue | null>(null);

export default AppContext;