import React, { useState, useEffect, useRef, useCallback } from "react";
import kana from "../../kana.json";
import { CorrectCharacter, AbortButton, Input, ProgressBar, TestCharacter, Timer } from "../../components/TestPage";

const Test = props => {
    const [inputAnswer, setInputAnswer] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [complete, setComplete] = useState(false);
    const [testChar, setTestChar] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [remainingChars, setRemainingChars] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const testSet = useRef({});

    const updateTime = useCallback((newTime) => {
        setTimeElapsed(newTime);
    }, []);

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
            setCorrectAnswers((prev) => (prev + 1));
        }
        else {
            setIncorrectAnswers((prev) => (prev + 1));
        }
        nextQuestion();
    }

    const nextQuestion = () => {
        setInputAnswer("");
        delete testSet.current[testChar];
        setRemainingChars(Object.keys(testSet.current).length);
        pickTestChar();
    }

    const pickTestChar = () => {
        // Pick random key from testSet object
        let keys = Object.keys(testSet.current); // keys is an array
        if (keys.length === 0) {
            completeTest();
        }
        else {
            setTestChar(() => (
                keys[keys.length * Math.random() << 0] // The << (left-shift) operator fixes the index by coercing the floating-point operand into a 32-bit integer
            ))
        }
    }

    const completeTest = () => {
        setComplete(true);
        setTestChar("");
        setIsPaused(true);
    }

    const saveResults = useCallback(() => {
        const testData = {
            "num_correct": correctAnswers,
            "num_incorrect": incorrectAnswers,
            "total_questions": correctAnswers + incorrectAnswers,
            "total_time": timeElapsed
        }

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
    }, [correctAnswers, incorrectAnswers]);

    useEffect(() => {
        if (complete) {
            saveResults();
        }
        else {
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
            setRemainingChars(keys.length);
        }
    }, [complete, saveResults])

    return (
        <div>
            <TestCharacter />
            <CorrectCharacter />
            <Input answer={inputAnswer} changeAnswer={changeAnswer} submitAnswer={submitAnswer} />
            <ProgressBar />
            <Timer time={timeElapsed} isPaused={isPaused} setIsPaused={setIsPaused} updateTime={updateTime} />
            <AbortButton onClick={props.changeAppView} />
            <div>{testChar}</div>
            <div>{inputAnswer}</div>
            <div>Remaining: {remainingChars}</div>
            <div>Correct: {correctAnswers}</div>
            <div>Incorrect: {incorrectAnswers}</div>
            {
                complete
                ? <div>Test complete!</div>
                : null
            }
        </div>
    );
};

export default Test;
