const AbortButton = (props) => {
    const handleClick = () => {
        props.onClick("MAIN");
    }

    return (
        <div>
            <button onClick={handleClick}>Abort Test</button>
        </div>
    );
};

export default AbortButton;
