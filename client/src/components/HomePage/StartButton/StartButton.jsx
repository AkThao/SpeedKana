import { Link } from "react-router-dom";

const StartButton = () => {
    return (
        <div>
            <Link to={`test`}>
                <button>Start</button>
            </Link>
        </div>
    )
}

export default StartButton;