const HomeButton = (props) => {
    const handleClick = () => {
        props.onClick("MAIN");
    }

    return (
        <button onClick={handleClick}>Home</button>
    )
}

export default HomeButton;
