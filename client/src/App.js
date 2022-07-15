import React, { useState } from "react";
import "./App.css";
import { Home, Stats, Test } from "./pages";
// import { APP_VIEWS } from "./constants/AppViews";

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
            return <Home changeAppView={changeAppView} />;
        case APP_VIEWS.TEST:
            return <Test changeAppView={changeAppView} />;
        case APP_VIEWS.STATS:
            return <Stats changeAppView={changeAppView} />;
        default:
            return <Home />;
    }
}

export default App;
