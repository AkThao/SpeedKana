import "./App.css";
import Title from "./components/Title/Title";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";

function App() {
  return (
    <div className="app">
      <Title />
      <LeftPanel />
      <RightPanel />
    </div>
  );
}

export default App;
