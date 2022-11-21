import { Box } from "@mui/material";
import CustomParagraph from "./Text/CustomParagraph";
import { useTheme } from "@mui/material";

const TestCharacter = (props) => {
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
        }}>
            <CustomParagraph childText={props.testChar} fontSize="10em" />
        </Box>
    );
};

export default TestCharacter;
