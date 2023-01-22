import { Alert, Box, Checkbox, FormControlLabel, FormGroup, Snackbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { CustomButton, CustomParagraph, LastTestScore, StartButton, Title } from "../components";
import { AppContext } from "../Context";
import { useContext, useEffect } from "react";

const Home = () => {
    const app = useContext(AppContext);
    const setErrMsgOpen = app.setIsCharsetErrMsgOpen;
    const theme = useTheme();

    const characterSetNames = {
        "hiragana": "Hiragana",
        "hiraganaDiacritics": "Hiragana Diacritics",
        "hiraganaDigraphs": "Hiragana Digraphs",
        "katakana": "Katakana",
        "katakanaDiacritics": "Katakana Diacritics",
        "katakanaDigraphs": "Katakana Digraphs",
    }

    const handleCloseErrMsg = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        app.setIsCharsetErrMsgOpen(false);
    }

    useEffect(() => {
        setErrMsgOpen(false);
    }, [setErrMsgOpen]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.paper,
            padding: "20px 0px",
            boxSizing: "border-box",
        }}>
            <Title />
            <Typography sx={{
                color: theme.palette.general.white,
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: "light",
                marginBottom: "30px",
            }}>Test and hone your knowledge of the Japanese kana system.</Typography>
            <StartButton />
            <LastTestScore />
            <Link to={`stats`} style={{ textDecoration: "none" }}>
                <CustomButton buttonText="Stats" />
            </Link>
            <Box sx={{ marginTop: "40px" }}>
                <CustomParagraph childText="Choose which characters you would like to be tested on" />
            </Box>
            <FormGroup sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {Object.entries(app.characterSet).slice(0, 3).map((entry, key) => {
                        return (
                            <FormControlLabel
                                key={key}
                                sx={{ color: theme.palette.general.white }}
                                label={characterSetNames[entry[0]]}
                                control={
                                    <Checkbox
                                        sx={{ color: theme.palette.general.white }}
                                        checked={entry[1]}
                                        onChange={() => app.updateCharacterSet(entry[0])}
                                    />
                                }
                            />
                        )
                    })}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {Object.entries(app.characterSet).slice(3, 6).map((entry, key) => {
                        return (
                            <FormControlLabel
                                key={key}
                                sx={{ color: theme.palette.general.white }}
                                label={characterSetNames[entry[0]]}
                                control={
                                    <Checkbox
                                        sx={{ color: theme.palette.general.white }}
                                        checked={entry[1]}
                                        onChange={() => app.updateCharacterSet(entry[0])}
                                    />
                                }
                            />
                        )
                    })}
                </Box>
            </FormGroup>
            <Snackbar open={app.isCharsetErrMsgOpen} autoHideDuration={2000} onClose={handleCloseErrMsg}>
                <Alert severity="error" >At least one character set must be chosen</Alert>
            </Snackbar>
        </Box>
    );
};

export default Home;
