import React from 'react';
import {Route, Routes} from 'react-router-dom';

import AppContext from "./context";
import Menu from "./components/Menu";
import About from "./components/About";
import Header from "./components/Header";
import ItemsPosts from "./components/ItemsPosts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./redux";
import {AuthMeThunk} from "./redux/actions/auth";
import ActionAlerts from "./components/UiComponents/ActionAlerts";

function App() {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(localStorage.getItem("token")) {
            dispatch(AuthMeThunk());
        }
    }, [auth.user._id, dispatch])

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
                <ActionAlerts severity={"error"} errorDescription={auth.errorDescription}/>
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