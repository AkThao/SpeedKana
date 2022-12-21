import { Box } from "@mui/material";
import { CustomParagraph } from "../components";
import { useTheme } from "@mui/material";

const CorrectCharacter = (props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            width: "50%",
            maxWidth: "400px",
            minWidth: "300px",
            aspectRatio: "4/3",
            backgroundColor: theme.palette.primary.grey,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "16px",
            border: "6px solid black",
            boxShadow: "4px 4px",
        }}>
            <div style={{ visibility: `${ props.correctAnsVisible ? "visible" : "hidden" }`}}>
                <CustomParagraph childText={props.correctAnswer} fontSize="10em" color={props.correctAnswer === "✓" ? theme.palette.primary.green : theme.palette.primary.red} />
            </div>
        </Box>
    );
};

export default CorrectCharacter;
