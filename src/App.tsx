import React, {useEffect} from 'react';
import './App.css';
import {RootState, useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import AuthorizationPage from "./features/components/AuthorizationPage";
import {configureApiWithAuth} from "./features/api/api";
import MainPage from "./features/components/MainPage";
import QueriesPage from "./features/components/QueriesPage";




function App() {
    const dispatch = useAppDispatch();

    const user = useSelector((state:RootState) => state.user);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthorizationPage />} />
                <Route path="/tables" element={user.authorized ? <MainPage /> : <Navigate to="/" />} />
                <Route path="/queries" element={user.authorized ? <QueriesPage /> : <Navigate to="/" />} />

                {/*<Route path="/admin" element={authState.role === 'admin' ? <Admin /> : <Navigate to="/register" />} />*/}
                {/*<Route*/}
                {/*    path="/logout"*/}
                {/*    element={*/}
                {/*        <button onClick={() => dispatch(logout())}>Logout</button>*/}
                {/*    }*/}
                {/*/>*/}
            </Routes>
        </Router>
    );
}

export default App;
