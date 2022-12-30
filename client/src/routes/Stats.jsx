import { HomeButton, DeleteButton, CustomTableCell, CustomParagraph } from "../components";
import { useState, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../Context";
import formatTime from "../utils/formatTime";
import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material";
import { deleteAllTests, deleteTest, getAllTests } from "../DB/dbHandler";

const Stats = () => {
    const app = useContext(AppContext);
    const theme = useTheme();

    const [testResults, setTestResults] = useState("");

    const deleteResult = (resultId) => {
        if (app.isInServerMode) {
            // Delete test result from server database
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
        } else {
            // Delete test result from IndexedDB
            deleteTest(resultId);
            fetchStats();
        }
    }

    const deleteAllResults = () => {
        if (app.isInServerMode) {
            // Delete all test results from server database
            fetch("/api/stats/delete-all", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                if (res.ok) return res.json();
                return res.json().then(json => Promise.reject(json));
            }).then((res) => {
                setTestResults(res);
            }).catch((err) => {
                console.error(err);
            })
        } else {
            // Delete all test results from IndexedDB
            deleteAllTests();
            fetchStats();
        }
    }

    const fetchStats = useCallback(() => {
        if (app.isInServerMode) {
            // Retrieve all test stats from server database
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
        } else {
            // Retrieve all test stats from IndexedDB
            getAllTests()
            .then((res) => {
                setTestResults(res);
            })
        }
    }, [app.isInServerMode]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

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
                <>
                    <CustomParagraph childText="No previous test results" />
                    <CustomParagraph childText="Come back once you've taken a test in order to see a table of your results" />
                </>
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
                            }}>
                                <CustomTableCell isTableHeading childText="Test no." />
                                <CustomTableCell isTableHeading alignRight childText="Date saved" />
                                <CustomTableCell isTableHeading alignRight childText="Correct answers" />
                                <CustomTableCell isTableHeading alignRight childText="Incorrect answers" />
                                <CustomTableCell isTableHeading alignRight childText="Total questions" />
                                <CustomTableCell isTableHeading alignRight childText="Time taken" />
                                <CustomTableCell alignRight childText={
                                    <Tooltip
                                        title={"This action will delete all your progress and cannot be undone."}
                                        arrow
                                        placement="top"
                                        enterDelay={0}
                                    >
                                        <DeleteButton deleteAll onClick={() => deleteAllResults()} />
                                    </Tooltip>
                                }/>
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
