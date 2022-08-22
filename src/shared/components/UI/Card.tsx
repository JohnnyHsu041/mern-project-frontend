import classes from "./Card.module.css";

interface CardProps {
    className?: string;
    style?: {};
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, style, children }) => {
    return (
        <div className={`${classes.card} ${className}`} style={style}>
            {children}
        </div>
    );
};

export default Card;
