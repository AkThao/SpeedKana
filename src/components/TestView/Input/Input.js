const Input = props => {
    const handleChange = (e) => {
        props.changeAnswer(e.target.value);
    }

    return (
        <div>
            <input type="text" onChange={handleChange} />
        </div>
    );
};

export default Input;
