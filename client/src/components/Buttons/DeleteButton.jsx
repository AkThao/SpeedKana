import { Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { forwardRef } from "react";

const DeleteButton = forwardRef((props, ref) => {
    const theme = useTheme();
    // This is needed because if we just pass {props} down to <Button>, props includes deleteAll, which is not a valid prop for the underlying <button> DOM element
    const { deleteAll, ...otherProps } = props;

    return (
        <Button
            {...otherProps}
            ref={ref}
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
    );
});

export default DeleteButton;
