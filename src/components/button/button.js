import './button.css';

function Button(props) {
    const {
      children,
      active,
      onClick
    } = props

    return (
      <div className={`button ${active ? "active" : ""}`} onClick={onClick}>
        {children}
      </div>
    );
}

export default Button;
