import { Typography } from "@mui/material"
import { useTheme } from "@mui/material";

const CustomParagraph = (props) => {
    const theme = useTheme();
    // Add a prop for dark/light theme

    return (
        <Typography sx={{
            color: props.color || theme.palette.general.white,
            textAlign: "center",
            fontSize: props.fontSize,
        }}>
            {props.childText}
        </Typography>
    )
}

export default CustomParagraph;