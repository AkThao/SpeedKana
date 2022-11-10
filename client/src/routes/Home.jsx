import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { LastTestScore, StartButton, Title } from "../components/HomePage";
import CustomButton from "../components/General/CustomButton/CustomButton";

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
            backgroundColor: theme.palette.background.paper,
        }}>
            <Title />
            <Typography sx={{
                color: theme.palette.general.white,
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: "light",
                marginBottom: "30px",
            }}>Hone your knowledge of the Japanese kana system with timed tests</Typography>
            <StartButton />
            <LastTestScore />
            <CustomButton linkTo="stats" buttonText="Stats" />
        </Box>
    );
};

export default Home;
