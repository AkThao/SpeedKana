import React, { useState } from "react";
import TestCharacter from "../TestCharacter/TestCharacter";
import CorrectCharacter from "../CorrectCharacter/CorrectCharacter";
import Input from "../Input/Input";
import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";
import PauseButton from "../PauseButton/PauseButton";
import EndButton from "../EndButton/EndButton";

const Test = props => {
    const [inputAnswer, setInputAnswer] = useState("");

    const changeAnswer = newAnswer => {
        setInputAnswer(newAnswer);
    };

    return (
        <div>
            <TestCharacter />
            <CorrectCharacter />
            <Input changeAnswer={changeAnswer} />
            <ProgressBar />
            <Timer />
            <PauseButton />
            <EndButton onClick={props.changeAppView} />
        </div>
    );
};

export default Test;
