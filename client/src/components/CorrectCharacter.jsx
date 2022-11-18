import { CustomParagraph } from "../components";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

const CorrectCharacter = (props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            width: "50%",
            maxWidth: "400px",
            aspectRatio: "4/3",
            backgroundColor: theme.palette.primary.grey,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "16px",
        }}>
            <div style={{ visibility: `${ props.correctAnsVisible ? "visible" : "hidden" }`}}>
                <CustomParagraph childText={props.correctAns} fontSize="10em" color={theme.palette.primary.red} />
            </div>
        </Box>
    );
};

export default CorrectCharacter;
