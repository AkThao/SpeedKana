import { TextField, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { useEffect, useRef } from "react";

const CustomInput = props => {
    const theme = useTheme();
    const inputField = useRef(null);

    const handleChange = (e) => {
        props.changeAnswer(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitAnswer();
    }

    useEffect(() => {
        if (props.isTestComplete) {
            inputField.current.blur();
        }
    }, [props.isTestComplete]);

    return (
        <Box sx={{
            marginBottom: "40px",
        }}>
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
                }}
                type="text"
                autoFocus
                placeholder="Type Romaji here..."
                variant="filled"
                color="primary"
                value={props.answer}
                onChange={handleChange}
                disabled={props.isTestComplete || props.isTestPaused}
                inputRef={inputField} />
            </form>
        </Box>
    );
};

export default CustomInput;
