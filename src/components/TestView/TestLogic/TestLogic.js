import TestCharacter from "../TestCharacter/TestCharacter";
import CorrectCharacter from "../CorrectCharacter/CorrectCharacter";
import Input from "../Input/Input";
import ProgressBar from "../ProgressBar/ProgressBar";
import Timer from "../Timer/Timer";
import PauseButton from "../PauseButton/PauseButton";
import EndButton from "../EndButton/EndButton";

const Test = (props) => {
    return (
        <div>
            <TestCharacter />
            <CorrectCharacter />
            <Input />
            <ProgressBar />
            <Timer />
            <PauseButton />
            <EndButton onClick={props.changeAppView} />
        </div>
    );
};

export default Test;
