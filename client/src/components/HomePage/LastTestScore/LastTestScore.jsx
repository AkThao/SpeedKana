import { useState, useEffect } from "react";

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
        }).then((res) => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
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
        <div>
            {!testExists ? (
                <p>No previous test results</p>
            ) : (
                <div>
                    <p>Last test score: {numCorrect}/{numCorrect + numIncorrect}</p>
                    <p>Time taken: {timeTaken}</p>
                </div>
            )}
        </div>
    )
}

export default LastTestScore;