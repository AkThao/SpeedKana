import { Button } from "@mui/material";
import { useTheme } from "@mui/material";

const DeleteButton = (props) => {
    const theme = useTheme();

    return (
        <Button
            onClick={props.onClick}
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
            }}>{props.deleteAll ? "Delete All" : "Delete"}</Button>
    )
}

export default DeleteButton;
