import React from "react"
import MainLayout from "layout/MainLayout";
import { MainRoutes } from 'router/main.routes';
import "styles/app.css";


const App = () => {

    return (
        <MainLayout>
            {MainRoutes}
        </MainLayout>
    );
};
export default App;