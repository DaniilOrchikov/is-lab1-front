import React from 'react';
import './App.css';
import {RootState} from "./store";
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import AuthorizationPage from "./features/components/pages/AuthorizationPage";
import TablesPage from "./features/components/pages/TablesPage";
import UpdateManagement from "./features/components/UpdateManagement";
import AdminPage from "./features/components/pages/AdminPage";
import PopupManager from "./features/components/PopupManager";
import MapPage from "./features/components/pages/MapPage";
import './formStyle.css';


function App() {
    const user = useSelector((state: RootState) => state.user);

    return (<>
            <PopupManager/>
            {user.authorized ? <><UpdateManagement/> </> : ""}
            <Router>
                <Routes>
                    <Route path="/" element={<AuthorizationPage/>}/>
                    <Route path="/tables" element={user.authorized ? <TablesPage/> : <Navigate to="/"/>}/>
                    <Route path="/map" element={user.authorized ? <MapPage/> : <Navigate to="/"/>}/>
                    <Route path="/admin" element={user.authorized && user.admin ? <AdminPage/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
