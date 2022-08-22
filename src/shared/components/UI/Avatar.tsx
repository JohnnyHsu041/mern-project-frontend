import React from "react";

import classes from "./Avatar.module.css";

interface AvatarProps {
    className?: string;
    style?: any;
    width?: any;
    image: string;
    alt: string;
}

const Avatar: React.FC<AvatarProps> = ({
    className,
    image,
    alt,
    style,
    width,
}) => {
    return (
        <div className={`${classes.avatar} ${className}`} style={style}>
            <img
                src={image}
                alt={alt}
                style={{ width: width, height: width }}
            />
        </div>
    );
};

export default Avatar;
