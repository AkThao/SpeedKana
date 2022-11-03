import { Link } from "react-router-dom";

const StatsButton = () => {
    return (
        <div>
            <Link to={`stats`}>
                <button>Stats</button>
            </Link>
        </div>
    )
}

export default StatsButton;