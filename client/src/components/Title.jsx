import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const Title = () => {
    const theme = useTheme();

    return (
        <div>
            <Typography
                variant="h1"
                sx={{
                    color: theme.palette.general.white,
                    fontSize: "120px",
                    fontWeight: "bold",
                    marginBottom: "40px",
                }}
            >
                SpeedKana
            </Typography>
        </div>
    )
}

export default Title;