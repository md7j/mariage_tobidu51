import './input.css';

function Input(props) {
    const {
      value,
      onChange,
      onKeyPress,
    } = props

    return (
      <input className="input" value={value} onChange={(event) => onChange(event.target.value)} autoFocus onKeyDown={onKeyPress} type="text"/>
    );
}

export default Input;
