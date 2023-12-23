import './button.css';

function Button(props) {
    const {
      children,
      onClick
    } = props

    return (
      <div className={`button`} onClick={onClick}>
        {children}
      </div>
    );
}

export default Button;
