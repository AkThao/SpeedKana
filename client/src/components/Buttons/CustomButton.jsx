import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const CustomButton = (props) => {
    const theme = useTheme();

    return (
        <Button sx={{
            color: theme.palette.general.white,
            backgroundColor: theme.palette.primary.grey,
            ":hover": {
                backgroundColor: theme.palette.secondary.grey,
            },
            fontSize: "16px",
            fontWeight: "bold",
            padding: "4px 12px",
            textTransform: "none",
        }}>{props.buttonText}</Button>
    )
}

export default CustomButton;
