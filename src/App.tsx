import React from 'react';
import {Route, Routes, Navigate, Outlet} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {AppContext} from "./context";
import Menu from "./components/Menu";
import About from "./components/About";
import Header from "./components/Header";
import {ItemsPosts} from "./components/ItemsPosts";
import {AuthMeThunk} from "./redux/actions/auth";
import ActionAlerts from "./components/UiComponents/ActionAlerts";
import {CreatePost} from "./components/CreatePost";
import {useAuthSelector} from "./redux/selectors";
import {useContainerDimensions} from "./utils/hooks";
import {FullPost} from "./components/FullPost";

interface PrivateWrapperProps {
    isAuth: any;
}

export const App: React.FC = React.memo(() => {
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const auth = useAuthSelector();
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(AuthMeThunk());
        }
    }, [auth.isAuth, dispatch]);

    function toggleMenu() {
        setIsOpenMenu(!isOpenMenu);
    }

    function toggleSearch() {
        setIsSearch(!isSearch);
    }

    const PrivateWrapper: React.FC<PrivateWrapperProps> = ({isAuth: {isAuthenticated}}) => {
        return isAuthenticated ? <Outlet/> : <Navigate to=""/>;
    };

    return (
        <AppContext.Provider
            value={{
                toggleMenu,
                isSearch
            }}>
            {/*todo: reload page when changing manually url*/}
            <div className={`appWrapper ${isOpenMenu && 'appWrapperOpen'}`}>
                <ActionAlerts severity={"error"} errorDescription={auth.errorDescription}/>
                <div className="leftHalf"><Routes>
                        <Route path="" element={<About/>}/>
                        <Route path="/post/:id" element={<FullPost/>}/>
                        <Route element={<PrivateWrapper isAuth={{isAuthenticated: auth.isAuth}}/>}>
                            <Route path="createPost" element={<CreatePost/>}/>
                        </Route>
                    </Routes></div>
                <div className="itemsMenu">
                    <Header/>
                    <ItemsPosts/>
                </div>
                <Menu isOpenMenu={isOpenMenu}/>
            </div>
        </AppContext.Provider>
    );
})