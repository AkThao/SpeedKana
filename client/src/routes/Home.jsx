import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { CustomButton, LastTestScore, StartButton, Title } from "../components";

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
            <Link to={`stats`}>
                <CustomButton buttonText="Stats" />
            </Link>
        </Box>
    );
};

export default Home;
