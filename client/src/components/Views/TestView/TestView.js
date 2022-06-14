import TestLogic from "./TestLogic/TestLogic";

const TestView = (props) => {
    return (
        <div>
            <TestLogic changeAppView={props.changeAppView} />
        </div>
    );
};

export default TestView;
