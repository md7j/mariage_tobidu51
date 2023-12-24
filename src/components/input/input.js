import './input.css';

function Input(props) {
    const {
      value,
      onChange,
      onKeyPress,
      placeholder = ""
    } = props

    return (
      <input className="input" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} autoFocus onKeyDown={onKeyPress} type="text"/>
    );
}

export default Input;
