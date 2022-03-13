import React from 'react';
import {Route, Routes} from 'react-router-dom';

import AppContext from "./context";
import Menu from "./components/Menu";
import About from "./components/About";
import Header from "./components/Header";
import ItemsPosts from "./components/ItemsPosts";

function App() {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);

    function toggleMenu() {
        setIsOpenMenu(!isOpenMenu)
    }
    function toggleSearch() {
        setIsSearch(!isSearch)
    }

    return (
        <AppContext.Provider
            value={{
                toggleMenu,
                isSearch
            }}>
            <div className={`appWrapper ${isOpenMenu && 'appWrapperOpen'}`}>
                <Routes>
                    <Route path="/" element={<About />}/>
                </Routes>
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