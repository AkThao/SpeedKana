const PauseButton = (props) => {
    return (
        <div>
            <button onClick={props.toggle} disabled={props.disabled}>{props.paused ? "Resume" : "Pause"}</button>
        </div>
    );
};

export default PauseButton;
