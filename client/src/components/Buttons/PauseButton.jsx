import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const PauseButton = (props) => {
    const theme = useTheme();

    return (
        <Button
            onClick={props.toggle}
            sx={{
                color: theme.palette.general.white,
                backgroundColor: theme.palette.primary.grey,
                ":hover": {
                    backgroundColor: `${props.paused ? theme.palette.primary.green : theme.palette.primary.red}`,
                },
                fontSize: "16px",
                fontWeight: "bold",
                padding: "8px 16px",
                textTransform: "none",
                display: "block",
            }}>{props.paused ? "Resume" : "Pause"}</Button>
    );
};

export default PauseButton;
