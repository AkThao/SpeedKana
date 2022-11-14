import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const HomeButton = () => {
    return (
        <Link to={`/`}>
            <CustomButton buttonText="Home" />
        </Link>
    )
}

export default HomeButton;
