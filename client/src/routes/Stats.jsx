import { HomeButton } from "../components/General";
import { useState, useEffect } from "react";

const Stats = (props) => {
    const [testResults, setTestResults] = useState("");

    const deleteResult = (resultId) => {
        fetch("/api/stats/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "id": resultId }),
        }).then((res) => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }).then((res) => {
            setTestResults(res);
        }).catch((err) => {
            console.error(err);
        })
    }

    const fetchStats = () => {
        fetch("/api/stats/all")
        .then((res) => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then((res) => {
            setTestResults(res);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div>
            <p>Stats</p>
            <HomeButton />
            {testResults === "" ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Test no.</th>
                            <th>Date saved</th>
                            <th>Correct answers</th>
                            <th>Incorrect answers</th>
                            <th>Total questions</th>
                            <th>Time taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map((result, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{result.id}</td>
                                    <td>{result.date_time}</td>
                                    <td>{result.num_correct}</td>
                                    <td>{result.num_incorrect}</td>
                                    <td>{result.total_questions}</td>
                                    <td>{result.total_time}</td>
                                    <td>
                                        <button onClick={() => deleteResult(result.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Stats;