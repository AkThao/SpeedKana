const Timer = props => {
    let time = props.time;
    let minutes = (time - (time % 60)) / 60;
    let seconds = time % 60;

    return (
        <div>
            Timer: {(minutes).toLocaleString("en-GB", {minimumIntegerDigits: 2, useGrouping: false})}:{(seconds).toLocaleString("en-GB", {minimumIntegerDigits: 2, useGrouping: false})}
        </div>
    );
};

export default Timer;
