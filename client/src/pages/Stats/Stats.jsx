import { HomeButton } from "../../components/General";
import { useState, useEffect } from "react";

const Stats = (props) => {
    const [stats, setStats] = useState("");

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = () => {
        fetch("/api/stats/all")
        .then((res) => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then((res) => {
            setStats(res);
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <div>
            <p>Stats</p>
            <HomeButton onClick={props.changeAppView} />
            {stats === "" ? (
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
                        {stats.map((stat, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{stat.id}</td>
                                    <td>{stat.date_time}</td>
                                    <td>{stat.num_correct}</td>
                                    <td>{stat.num_incorrect}</td>
                                    <td>{stat.total_questions}</td>
                                    <td>{stat.total_time}</td>
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
