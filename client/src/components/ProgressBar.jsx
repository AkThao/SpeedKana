import { LinearProgress } from "@mui/material";

const ProgressBar = (props) => {
    return (
        <LinearProgress sx={{
            height: "20px",
            width: "80%",
            maxWidth: "900px",
            marginBottom: "40px",
            borderRadius: "6px",
        }} variant="determinate" color="secondary" value={props.progress} />
    );
};

export default ProgressBar;
