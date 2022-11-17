const formatTime = (timeInSecs) => {
    let minutes = (timeInSecs - (timeInSecs % 60)) / 60;
    let seconds = timeInSecs % 60;
    let formattedTimeString = `${minutes}m ${seconds}s`;
    if (minutes === 0) {
        formattedTimeString = `${seconds}s`;
    }

    return formattedTimeString;
}

export default formatTime;