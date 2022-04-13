import React, { useState, useEffect, useRef } from "react";
import TestCharacter from "../TestCharacter/TestCharacter";
import CorrectCharacter from "../CorrectCharacter/CorrectCharacter";
import Input from "../Input/Input";
import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";
import PauseButton from "../PauseButton/PauseButton";
import EndButton from "../EndButton/EndButton";
import kana from "../../../../kana.json";

const Test = props => {
    const [inputAnswer, setInputAnswer] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [complete, setComplete] = useState(false);
    const [paused, setPaused] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [testChar, setTestChar] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [remainingChars, setRemainingChars] = useState(null);
    const [pausedTime, setPausedTime] = useState(0);
    const testSet = useRef({});
    const timerIntervalRef = useRef(0);
    const startTimeRef = useRef(Date.now());

    const changeAnswer = (newAnswer) => {
        setInputAnswer(newAnswer);
    };

    const submitAnswer = () => {
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

    const pause = () => {
        setPaused(true);
        setPausedTime(timeElapsed);
        clearInterval(timerIntervalRef.current);
        setDisabledInput(true);
    }

    const resume = () => {
        setPaused(false);
        startTimeRef.current = Date.now();
        timerIntervalRef.current = setInterval(() => {
            let delta = ((Date.now() - startTimeRef.current) / 1000) + pausedTime;
            setTimeElapsed(Math.floor(delta));
        }, 1000);
        setDisabledInput(false);
    }

    const completeTest = () => {
        setComplete(true);
        clearInterval(timerIntervalRef.current);
        setTestChar("");
        setDisabledInput(true);
    }

    useEffect(() => {
        // Create test timer
        timerIntervalRef.current = setInterval(() => {
            let delta = (Date.now() - startTimeRef.current) / 1000;
            setTimeElapsed(Math.floor(delta));
        }, 1000);

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

        return () => {
            clearInterval(timerIntervalRef.current);
        }
    }, [])

    return (
        <div>
            <TestCharacter />
            <CorrectCharacter />
            <Input answer={inputAnswer} changeAnswer={changeAnswer} submitAnswer={submitAnswer} disabled={disabledInput} />
            <ProgressBar />
            <Timer time={timeElapsed} />
            <PauseButton paused={paused} onPause={pause} onResume={resume} disabled={disabledInput} />
            <EndButton onClick={props.changeAppView} />
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
