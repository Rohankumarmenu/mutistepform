const FormInputGroup = ({title, type, name, id, value, inputCls, error ,onChangeHandler, children, ...inputAttr}) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>{title}</label>
            <input type={type} name={name} id={id} className={inputCls} value={value} onChange={onChangeHandler} {...inputAttr} />
            {children}
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}

export default FormInputGroup;