import { CustomParagraph } from "../components";

const CorrectCharacter = (props) => {
    return (
        <div>
            <div style={{ visibility: `${ props.correctAnsVisible ? "visible" : "hidden" }`}}>
                <CustomParagraph childText={props.correctAns} />
            </div>
        </div>
    );
};

export default CorrectCharacter;
