import classes from "./Input.module.css";

interface InputProps {
    element?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    label?: string;
}

const Input: React.FC<InputProps> = ({
    element,
    id,
    type,
    placeholder,
    rows,
    label,
}) => {
    const renderElement =
        element === "input" ? (
            <input id={id} type={type} placeholder={placeholder} />
        ) : (
            <textarea id={id} rows={rows || 3} />
        );

    return (
        <div className={`${classes["form-control"]}`}>
            <label htmlFor={id}>{label}</label>
            {renderElement}
        </div>
    );
};

export default Input;
