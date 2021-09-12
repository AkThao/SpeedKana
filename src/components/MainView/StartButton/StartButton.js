const StartButton = (props) => {
    const handleClick = () => {
        props.onClick("TEST");
    }

    return (
        <div>
            <button onClick={handleClick}>Start</button>
        </div>
    )
}

export default StartButton;