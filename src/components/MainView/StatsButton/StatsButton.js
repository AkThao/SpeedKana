const StatsButton = (props) => {
    const handleClick = () => {
        props.onClick("STATS");
    }

    return (
        <div>
            <button onClick={handleClick}>Stats</button>
        </div>
    )
}

export default StatsButton;