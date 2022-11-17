import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import formatTime from "../utils/formatTime";

const CustomTypography = ({ innerText }) => {
    const theme = useTheme();
    return (
        <Typography
            sx={{
                color: theme.palette.general.white,
                textAlign: "center",
            }}
        >{innerText}</Typography>

    )
}

const LastTestScore = () => {
    const [numCorrect, setNumCorrect] = useState(null);
    const [numIncorrect, setNumIncorrect] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [testExists, setTestExists] = useState(null);

    const fetchLatestStats = () => {
        fetch("/api/stats/latest", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            if (res.ok) return res.json();
            const json = await res.json();
            return await Promise.reject(json);
        }).then((res) => {
            if (res.length === 0) {
                setTestExists(false);
            } else {
                setTestExists(true);
                setNumCorrect(res[0].num_correct);
                setNumIncorrect(res[0].num_incorrect);
                setTimeTaken(res[0].total_time);
            }
        }).catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        fetchLatestStats();
    }, []);

    return (
        <div style={{ margin: "20px 0px" }}>
            {!testExists ? (
                <CustomTypography innerText="No previous test results" />
            ) : (
                <div>
                    <CustomTypography innerText={`Last test score: ${numCorrect}/${numCorrect + numIncorrect}`} />
                    <CustomTypography innerText={`Time taken: ${formatTime(timeTaken)}`} />
                </div>
            )}
        </div>
    )
}

export default LastTestScore;
