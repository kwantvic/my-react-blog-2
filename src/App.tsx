import React from 'react';

import AppContext from "./context";
import Menu from "./components/Menu";
import About from "./components/About";
import Header from "./components/Header";
import ItemsPosts from "./components/ItemsPosts";

function App() {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);

    function toggleMenu() {
        setIsOpenMenu(!isOpenMenu)
    }
    function toggleAuth() {
        setIsAuth(!isAuth)
    }
    function toggleSearch() {
        setIsAuth(!isSearch)
    }

    return (
        <AppContext.Provider
            value={{
                toggleMenu,
                isAuth,
                isSearch
            }}>
            <div className={`appWrapper ${isOpenMenu && 'appWrapperOpen'}`}>
                <About/>
                <div className="itemsMenu">
                    <Header/>
                    <ItemsPosts/>
                </div>
                <Menu isOpenMenu={isOpenMenu}/>
            </div>
        </AppContext.Provider>
    );
}

export default App;