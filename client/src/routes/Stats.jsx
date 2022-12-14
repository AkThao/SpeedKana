import { HomeButton, DeleteButton, CustomTableCell, CustomParagraph } from "../components";
import { useState, useEffect } from "react";
import formatTime from "../utils/formatTime";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTheme } from "@mui/material";

const Stats = () => {
    const theme = useTheme();

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
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            minHeight: "100vh",
            backgroundColor: theme.palette.background.paper,
            padding: "40px",
            boxSizing: "border-box",
        }}>
            <HomeButton />
            {testResults === "" ? (
                <CustomParagraph childText="Loading..." />
            ) : (testResults.length === 0) ? (
                <CustomParagraph childText="No previous test results" />
            ) : (
                <TableContainer component={Paper} sx={{
                    alignSelf: "center",
                    marginTop: "40px",
                    boxShadow: `2px 2px 8px 2px ${theme.palette.general.black}`,
                }}>
                       <Table >
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: theme.palette.general.black,
                                "th:first-child": {
                                    borderTopLeftRadius: "10px",
                                },
                                "th:last-child": {
                                    borderTopRightRadius: "10px",
                                }
                            }}>
                                <CustomTableCell isTableHeading childText="Test no." />
                                <CustomTableCell isTableHeading alignRight childText="Date saved" />
                                <CustomTableCell isTableHeading alignRight childText="Correct answers" />
                                <CustomTableCell isTableHeading alignRight childText="Incorrect answers" />
                                <CustomTableCell isTableHeading alignRight childText="Total questions" />
                                <CustomTableCell isTableHeading alignRight childText="Time taken" />
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testResults.map((result, idx) => {
                                return (
                                    <TableRow key={idx} sx={{
                                        backgroundColor: idx % 2 === 0 ? theme.palette.primary.grey : null,
                                    }}>
                                        <CustomTableCell childText={result.id} />
                                        <CustomTableCell alignRight childText={result.date_time} />
                                        <CustomTableCell alignRight childText={result.num_correct} />
                                        <CustomTableCell alignRight childText={result.num_incorrect} />
                                        <CustomTableCell alignRight childText={result.total_questions} />
                                        <CustomTableCell alignRight childText={formatTime(result.total_time)} />
                                        <CustomTableCell alignRight childText={
                                            <DeleteButton onClick={() => deleteResult(result.id)} />
                                        }/>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default Stats;
