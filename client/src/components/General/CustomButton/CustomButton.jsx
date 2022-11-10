import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const CustomButton = (props) => {
    const theme = useTheme();

    return (
        <Link to={props.linkTo}>
            <Button sx={{
                color: theme.palette.general.black,
                backgroundColor: theme.palette.primary.main,
                ":hover": {
                    backgroundColor: theme.palette.secondary.main,
                },
                fontSize: "16px",
                fontWeight: "bold",
                padding: "4px 12px",
                textTransform: "none",
            }}>{props.buttonText}</Button>
        </Link>
    )
}

export default CustomButton;
