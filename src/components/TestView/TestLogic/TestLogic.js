import React, { useState, useEffect, useRef } from "react";
import TestCharacter from "../TestCharacter/TestCharacter";
import CorrectCharacter from "../CorrectCharacter/CorrectCharacter";
import Input from "../Input/Input";
import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";
import PauseButton from "../PauseButton/PauseButton";
import EndButton from "../EndButton/EndButton";

const Test = props => {
    const [inputAnswer, setInputAnswer] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0);

    const timerIntervalRef = useRef(0);
    const startTimeRef = useRef(Date.now());

    const changeAnswer = newAnswer => {
        setInputAnswer(newAnswer);
    };

    useEffect(() => {
        timerIntervalRef.current = setInterval(() => {
            let delta = (Date.now() - startTimeRef.current) / 1000;
            setTimeElapsed(Math.floor(delta));
        }, 1000);

        return () => {
            clearInterval(timerIntervalRef.current);
        }
    }, [])

    return (
        <div>
            <TestCharacter />
            <CorrectCharacter />
            <Input changeAnswer={changeAnswer} />
            <ProgressBar />
            <Timer time={timeElapsed} />
            <PauseButton />
            <EndButton onClick={props.changeAppView} />
        </div>
    );
};

export default Test;
