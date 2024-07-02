import React, { lazy } from 'react';
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import('pages/HomePage'));

export const MainRoutes = (
    <Routes>
        <Route key="homeroute" path='/' element={<HomePage />} />
    </Routes>
);