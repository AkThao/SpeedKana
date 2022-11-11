const Input = props => {
    const handleChange = (e) => {
        props.changeAnswer(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitAnswer();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={props.answer} onChange={handleChange} disabled={props.isTestComplete} />
            </form>
        </div>
    );
};

export default Input;
