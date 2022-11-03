import { AppSettingsButton, LastTestScore, StartButton, StatsButton, TestSettings, Title } from "../components/HomePage";

const Home = () => {
    return (
        <div>
            <Title />
            <StartButton />
            <TestSettings />
            <LastTestScore />
            <StatsButton />
            <AppSettingsButton />
        </div>
    );
};

export default Home;
