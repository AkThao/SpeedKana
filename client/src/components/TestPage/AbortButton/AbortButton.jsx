import { Link } from "react-router-dom";

const AbortButton = () => {
    return (
        <Link to={`/`}>
            <button>Abort Test</button>
        </Link>
    );
};

export default AbortButton;
