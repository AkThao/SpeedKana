import { Box, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    const theme = useTheme();

    return (
        <Box sx={{
            position: "fixed",
            bottom: "10px",
            right: "15px",
            width: "100%",
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end",
            alignItems: "center",
        }}>
            <Typography
                sx={{
                    color: theme.palette.primary.grey,
                    textAlign: "right",
                }}
                textAlign="right"
            >
                v1.0.0
            </Typography>
            <Typography>
                <Link
                    href="https://github.com/AkThao/SpeedKana"
                    color={theme.palette.primary.grey}
                    target="_blank"
                    rel="noopener"
                    aria-label="Source code for this project"
                >
                    <GitHubIcon />
                </Link>
            </Typography>
        </Box>
    )
}

export default Footer;