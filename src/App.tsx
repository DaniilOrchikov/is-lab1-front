import React from 'react';
import './App.css';
import {RootState} from "./store";
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import AuthorizationPage from "./features/components/pages/AuthorizationPage";
import TablesPage from "./features/components/pages/TablesPage";
import UpdateManagement from "./features/components/UpdateManagement";
import AdminPage from "./features/components/pages/AdminPage";


function App() {
    const user = useSelector((state: RootState) => state.user);

    return (<>
            {user.authorized ? <UpdateManagement></UpdateManagement> : ""}
            <Router>
                <Routes>
                    <Route path="/" element={<AuthorizationPage/>}/>
                    <Route path="/tables" element={user.authorized ? <TablesPage/> : <Navigate to="/"/>}/>
                    <Route path="/admin" element={user.authorized && user.admin ? <AdminPage/> : <Navigate to="/"/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
