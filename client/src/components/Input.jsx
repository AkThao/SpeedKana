import { TextField } from "@mui/material";
import { useTheme } from "@mui/material";

const Input = props => {
    const theme = useTheme();

    const handleChange = (e) => {
        props.changeAnswer(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitAnswer();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField sx={{
                    backgroundColor: theme.palette.primary.grey,
                    borderRadius: "6px",
                    border: "2px solid black",
                    input: {
                        color: theme.palette.general.white,
                        fontSize: "20px",
                        padding: "10px 16px",
                    }
                }} type="text" placeholder="Type answer here..." variant="filled" color="primary" value={props.answer} onChange={handleChange} disabled={props.isTestComplete} />
            </form>
        </div>
    );
};

export default Input;
