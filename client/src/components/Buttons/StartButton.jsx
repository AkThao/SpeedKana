import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const StartButton = () => {
    const theme = useTheme();

    return (
        <Link to={`test`} style={{ textDecoration: "none" }}>
            <Button sx={{
                color: theme.palette.general.black,
                backgroundColor: theme.palette.primary.main,
                ":hover": {
                    backgroundColor: theme.palette.secondary.main,
                },
                fontSize: "24px",
                fontWeight: "bold",
                padding: "10px 20px",
            }}>Start<span style={{ display: "none" }}>Test</span></Button>
        </Link>
    )
}

export default StartButton;
