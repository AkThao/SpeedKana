import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import kana from "../kana.json";
import { CorrectCharacter, AbortButton, Input, ProgressBar, TestCharacter, Timer, HomeButton } from "../components";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { CustomParagraph } from "../components";

const Test = () => {
    const theme = useTheme();
    const [inputAnswer, setInputAnswer] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isStartOfTest, setIsStartOfTest] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [testChar, setTestChar] = useState("");
    const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
    const [numIncorrectAnswers, setNumIncorrectAnswers] = useState(0);
    const [numRemainingChars, setNumRemainingChars] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [correctAnsVisible, setCorrectAnsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState(0);
    const testSet = useRef({});

    const testData = useMemo(() => {
        return {
            "num_correct": numCorrectAnswers,
            "num_incorrect": numIncorrectAnswers,
            "total_questions": numCorrectAnswers + numIncorrectAnswers,
            "total_time": timeElapsed,
        }
    }, [numCorrectAnswers, numIncorrectAnswers, timeElapsed]);

    const updateTime = useCallback((newTime) => {
        setTimeElapsed(newTime);
    }, []);

    const togglePause = () => {
        setIsPaused((prev) => (!prev));
    }

    const changeAnswer = (newAnswer) => {
        setInputAnswer(newAnswer);
    };

    const submitAnswer = () => {
        if (isPaused) {
            alert("Test is paused. Resume test to submit answer.");
            return;
        }
        checkAnswer();
    }

    const checkAnswer = () => {
        if (inputAnswer === testSet.current[testChar]) {
            setCorrectAnswer("✓");
            setNumCorrectAnswers((prev) => (prev + 1));
        }
        else {
            setCorrectAnswer(testSet.current[testChar]);
            setNumIncorrectAnswers((prev) => (prev + 1));
        }
        showCorrectAnswer();
        nextQuestion();
    }

    const showCorrectAnswer = () => {
        setCorrectAnsVisible(true);
        window.clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => {
            setCorrectAnsVisible(false);
        }, 1000));
    }

    const nextQuestion = () => {
        setInputAnswer("");
        delete testSet.current[testChar];
        setNumRemainingChars(Object.keys(testSet.current).length);
        pickTestChar();
    }

    const pickTestChar = () => {
        // Pick random key from testSet object
        let keys = Object.keys(testSet.current); // keys is an array
        if (keys.length === 0) { // no more characters left, end of test
            completeTest();
        }
        else {
            setTestChar(() => (
                keys[keys.length * Math.random() << 0] // The << (left-shift) operator fixes the index by coercing the floating-point operand into a 32-bit integer
            ))
        }
    }

    const completeTest = () => {
        setIsComplete(true);
        setTestChar("");
        setIsPaused(true);
    }

    const saveResults = useCallback(() => {
        // Save test results to database
        fetch("/api/stats/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(testData),
        }).then((res) => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }).then(({ message }) => {
            console.log(message);
        }).catch((err) => {
            console.error(err);
        })
    }, [testData]);

    useEffect(() => {
        if (isComplete) {
            saveResults();
        }
        else if (isStartOfTest) {
            // Create test set - will eventually use props to set the test mode and customise the test set
            // But for now the default set is all Kana
            testSet.current = {
                ...kana["hiragana"],
                // ...kana["hiragana-diacritics"],
                // ...kana["hiragana-digraphs"],
                // ...kana["katakana"],
                // ...kana["katakana-diacritics"],
                // ...kana["katakana-digraphs"]
            }

            let keys = Object.keys(testSet.current); // keys is an array
            setTestChar(() => (
                keys[keys.length * Math.random() << 0] // The << (left-shift) operator fixes the index by coercing the floating-point input into a 32-bit integer
            ))
            setNumRemainingChars(keys.length);
            setIsStartOfTest(false);
        }
    }, [isComplete, saveResults, isStartOfTest])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
        }}>
            <Box sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                gap: "4em",
            }}>
                <TestCharacter testChar={testChar} />
                <CorrectCharacter correctAnsVisible={correctAnsVisible} correctAnswer={correctAnswer} />
            </Box>
            <Input answer={inputAnswer} changeAnswer={changeAnswer} submitAnswer={submitAnswer} isTestComplete={isComplete} />
            {/* <ProgressBar /> */}
            <Timer time={timeElapsed} isPaused={isPaused} togglePause={togglePause} updateTime={updateTime} isTestComplete={isComplete} />
            {isComplete ? <HomeButton /> : <AbortButton />}
            <CustomParagraph childText={`Remaining: ${numRemainingChars}`} />
            <CustomParagraph childText={`Correct: ${numCorrectAnswers}`} />
            <CustomParagraph childText={`Incorrect: ${numIncorrectAnswers}`} />
            {
                isComplete
                ? <CustomParagraph childText={`Test complete!`} />
                : null
            }
        </Box>
    );
};

export default Test;
