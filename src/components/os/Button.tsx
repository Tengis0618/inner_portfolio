import React, { useState } from 'react';
import { IconName } from '../../assets/icons';
import Colors from '../../constants/colors';
import { Icon } from '../general';

export interface ButtonProps {
    icon?: IconName;
    text?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setIsPressed(false);
    };

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    const isCloseButton = icon === 'close';

    const getBackgroundColor = () => {
        if (isPressed) {
            return isCloseButton ? '#D6706A' : '#1941A5'; // Darker when pressed
        } else if (isHovering) {
            return isCloseButton ? '#E81123' : '#2E5BDA'; // Bright on hover
        } else {
            return isCloseButton ? '#E81123' : '#316AC5'; // Default colors
        }
    };

    const outerBorderStyle = Object.assign(
        {},
        styles.outerBorder,
        icon && { width: 21, height: 21 },
        {
            backgroundColor: getBackgroundColor(),
            borderColor: isPressed ? '#8A8A8A' : '#FFFFFF',
            borderRightColor: isPressed ? '#FFFFFF' : '#8A8A8A',
            borderBottomColor: isPressed ? '#FFFFFF' : '#8A8A8A',
        }
    );

    const innerBorderStyle = Object.assign(
        {},
        styles.innerBorder,
        icon && { width: 17, height: 17 },
        text && { padding: 4 },
        {
            borderColor: isPressed ? '#316AC5' : '#8A8A8A',
            borderRightColor: isPressed ? '#8A8A8A' : '#316AC5',
            borderBottomColor: isPressed ? '#8A8A8A' : '#316AC5',
        }
    );

    const click = (e: any) => {
        e.preventDefault();
        onClick && onClick();
        handleMouseDown();
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            style={outerBorderStyle}
            onMouseDown={click}
        >
            <div
                style={innerBorderStyle}
            >
                {icon && (<Icon icon={icon} style={{...styles.icon, filter: 'brightness(0) invert(1)'}} />)}
                {text && (
                    // <Text noSelect style={styles.text}>
                    //     {text}
                    // </Text>
                    <p style={styles.text}>{text}</p>
                )}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    /*
    outerBorder: {
        border: `1px solid ${Colors.black}`,
        borderTopColor: Colors.white,
        borderLeftColor: Colors.white,
        background: Colors.lightGray,

        cursor: 'pointer',
    },
    innerBorder: {
        border: `1px solid ${Colors.darkGray}`,
        borderTopColor: Colors.lightGray,
        borderLeftColor: Colors.lightGray,
        flex: 1,
    },
    */
    outerBorder: {
        border: '1px solid',
        cursor: 'pointer',
        borderRadius: '3px',
        margin: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.1s ease',
    },
    innerBorder: {
        border: '1px solid',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '2px',
    },
    icon: {
        width: 12,
        height: 12,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
        margin: 0,
        textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
    },
};

export default Button;
