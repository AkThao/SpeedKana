import HomeButton from "./HomeButton.js/HomeButton";

const StatsView = (props) => {
    return (
        <div>
            <p>Stats</p>
            <HomeButton onClick={props.changeAppView} />
        </div>
    );
};

export default StatsView;
