const CorrectCharacter = (props) => {
    return (
        <div>
            <p style={{ visibility: `${props.correctAnsVisible ? "visible" : "hidden"}`}}>{props.correctAns}</p>
        </div>
    );
};

export default CorrectCharacter;
