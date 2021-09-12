import "./App.css";
import MainView from "./components/MainView/MainView";
import TestView from "./components/TestView/TestView";

function App() {
    return (
        <div className="app">
            {/* Display either MainView or TestView based on appState */}
            {/* <MainView /> */}
            <TestView />
        </div>
    );
}

export default App;
