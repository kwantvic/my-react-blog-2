import React from 'react';

import AppContext from "./context";
import Menu from "./components/Menu";

function App() {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);

    function toggleMenu() {
        setIsOpenMenu(!isOpenMenu)
    }
    function toggleAuth() {
        setIsAuth(!isAuth)
    }
    return (
        <AppContext.Provider
        value={{
            toggleMenu,
            isAuth
        }}>
        <div className="d-flex justify-around">
            <div>test</div>
            <div>test</div>
            <Menu isOpenMenu={isOpenMenu}/>
        </div>
        </AppContext.Provider>
    );
}

export default App;