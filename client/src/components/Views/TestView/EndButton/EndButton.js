const EndButton = (props) => {
    const handleClick = () => {
        props.onClick("MAIN");
    }

    return (
        <div>
            <button onClick={handleClick}>End Test</button>
        </div>
    );
};

export default EndButton;
