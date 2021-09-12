const EndButton = (props) => {
    const handleClick = () => {
        props.onClick("MAIN");
    }

    return (
        <div>
            <button onClick={handleClick}>End Button</button>
        </div>
    );
};

export default EndButton;
