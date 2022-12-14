import { TableCell } from "@mui/material";
import { useTheme } from "@mui/material";

const CustomTableCell = (props) => {
    const theme = useTheme();

    return (
        <TableCell sx={{
            color: theme.palette.general.white,
            fontSize: props.isTableHeading ? "18px" : "16px",
            fontWeight: props.isTableHeading ? "bold" : "normal",
            textAlign: props.alignRight ? "right" : "left",
        }}>{props.childText}</TableCell>
    )
}

export default CustomTableCell;