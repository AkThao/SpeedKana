import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const HomeButton = () => {
    const theme = useTheme();

    return (
        <Link to={`/`}>
            <Button sx={{
                color: theme.palette.general.black,
                backgroundColor: theme.palette.primary.main,
                ":hover": {
                    backgroundColor: theme.palette.secondary.main,
                },
                fontSize: "14px",
                fontWeight: "bold",
                padding: "4px 12px",
                textTransform: "none",
            }}>Home</Button>
        </Link>
    )
}

export default HomeButton;
