const Button = ({type, clsName, id, text, onClickHandler}) => {
    return (
        <button type={type} id={id} className={clsName} onClick={onClickHandler}>{text}</button>
    )
}

export default Button;