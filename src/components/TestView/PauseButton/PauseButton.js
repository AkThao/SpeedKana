const PauseButton = (props) => {
    return (
        <div>
            {
                props.paused
                ? <button onClick={props.onResume}>Resume</button>
                : <button onClick={props.onPause} disabled={props.disabled}>Pause</button>
            }
        </div>
    );
};

export default PauseButton;
