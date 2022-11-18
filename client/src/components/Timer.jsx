import React, { useEffect } from "react";
import { PauseButton } from "./";
import { CustomParagraph } from "../components";

const Timer = props => {
    const isPaused = props.isPaused;

    const updateTime = props.updateTime;

    let time = props.time;
    let minutes = (time - (time % 60)) / 60;
    let seconds = time % 60;

    useEffect(() => {
        let interval = setInterval(() => {
            if (!isPaused) {
                updateTime(time + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPaused, time, updateTime]);

    return (
        <div>
            <CustomParagraph childText={`Timer: ${(minutes).toLocaleString("en-GB", {minimumIntegerDigits: 2, useGrouping: false})}:${(seconds).toLocaleString("en-GB", {minimumIntegerDigits: 2, useGrouping: false})}`} />
            {
                props.isTestComplete
                ? null
                : <PauseButton paused={isPaused} toggle={props.togglePause} />
            }
        </div>
    );
};

export default Timer;
