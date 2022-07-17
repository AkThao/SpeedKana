const PauseButton = (props) => {
    return (
        <div>
            <button onClick={props.toggle}>{props.paused ? "Resume" : "Pause"}</button>
        </div>
    );
};

export default PauseButton;
