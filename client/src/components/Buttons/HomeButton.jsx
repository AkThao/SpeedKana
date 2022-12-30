import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const HomeButton = () => {
    return (
        <Link to={`/`} style={{ textDecoration: "none" }}>
            <CustomButton buttonText="Home" />
        </Link>
    )
}

export default HomeButton;
