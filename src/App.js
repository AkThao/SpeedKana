import React, { useState } from "react";
import "./App.css";
import MainView from "./components/MainView/MainView";
import TestView from "./components/TestView/TestView";

const APP_VIEWS = {
    MAIN: "main",
    TEST: "test",
    STATS: "stats",
    SETTINGS: "settings"
};

function App() {
    const [appView, setAppView] = useState(APP_VIEWS.MAIN);

    const changeAppView = newView => {
        setAppView(APP_VIEWS[newView]);
    };

    switch (appView) {
        case APP_VIEWS.MAIN:
            return <MainView changeAppView={changeAppView} />;
        case APP_VIEWS.TEST:
            return <TestView changeAppView={changeAppView} />;
        default:
            return <MainView />;
    }
}

export default App;
