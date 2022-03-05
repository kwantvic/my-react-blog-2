import React from 'react';

import AppContext from "./context";
import Menu from "./components/Menu";
import About from "./components/About";

function App() {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(true);

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
            <div className={`appWrapper ${isOpenMenu && 'appWrapperOpen'}`}>
                <About/>
                <div>test</div>
                <Menu isOpenMenu={isOpenMenu}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;