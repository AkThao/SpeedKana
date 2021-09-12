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

    switch(appView) {
        case APP_VIEWS.MAIN:
            return <MainView />
        case APP_VIEWS.TEST:
            return <TestView />
        default:
            return <MainView />
    }
}

export default App;
