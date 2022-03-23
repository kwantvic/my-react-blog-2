import React from 'react';

export type AppContextValue = {
    toggleMenu: () => void;
    isSearch: boolean;
}

export const AppContext = React.createContext<AppContextValue | null>(null);