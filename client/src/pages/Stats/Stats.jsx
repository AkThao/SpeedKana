import { HomeButton } from "../../components/General";

const Stats = (props) => {
    return (
        <div>
            <p>Stats</p>
            <HomeButton onClick={props.changeAppView} />
        </div>
    );
};

export default Stats;
