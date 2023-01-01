import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const AbortButton = () => {
    const theme = useTheme();

    return (
        <Link to={`/`} style={{ textDecoration: "none" }}>
            <Button
                sx={{
                    color: theme.palette.general.white,
                    backgroundColor: theme.palette.primary.red,
                    ":hover": {
                        backgroundColor: theme.palette.secondary.red,
                    },
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "6px 14px",
                    textTransform: "none",
                }}>Abort Test</Button>
        </Link>
    );
};

export default AbortButton;
