import Title from "./Title/Title";
import StartButton from "./StartButton/StartButton";
import TestSettings from "./TestSettings/TestSettings";
import StatsButton from "./StatsButton/StatsButton";
import AppSettingsButton from "./AppSettingsButton/AppSettingsButton";

const MainView = (props) => {
    return (
        <div>
            <Title />
            <StartButton onClick={props.changeAppView} />
            <TestSettings />
            <StatsButton />
            <AppSettingsButton />
        </div>
    );
};

export default MainView;
