import './input.css';

function Input(props) {
    const {
      value,
      onChange
    } = props

    return (
      <input className="input" type="text"/>
    );
}

export default Input;
