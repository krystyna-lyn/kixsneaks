import styles from "./Input.module.scss";

function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    required = false,
    className = "",
    ...props
}) {
    return (
        <input
            className={`${styles.input} ${className}`}
            {...props}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}

export default Input;