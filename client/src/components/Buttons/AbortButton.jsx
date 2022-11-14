import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const AbortButton = () => {
    const theme = useTheme();

    return (
        <Link to={`/`}>
            <Button
                sx={{
                    color: theme.palette.general.white,
                    backgroundColor: theme.palette.primary.red,
                    ":hover": {
                        backgroundColor: theme.palette.secondary.red,
                    },
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "4px 10px",
                    textTransform: "none",
                }}>Abort Test</Button>
        </Link>
    );
};

export default AbortButton;
