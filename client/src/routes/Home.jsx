import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { AppSettingsButton, LastTestScore, StartButton, StatsButton, TestSettings, Title } from "../components/HomePage";

const Home = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: theme.palette.primary.background,
        }}>
            <Title />
            <StartButton />
            <TestSettings />
            <LastTestScore />
            <StatsButton />
            <AppSettingsButton />
        </Box>
    );
};

export default Home;
