import { AppSettingsButton, LastTestScore, StartButton, StatsButton, TestSettings, Title } from "../components/HomePage";

const Home = (props) => {
    return (
        <div>
            <Title />
            <StartButton onClick={props.changeAppView} />
            <TestSettings />
            <LastTestScore />
            <StatsButton onClick={props.changeAppView} />
            <AppSettingsButton />
        </div>
    );
};

export default Home;
