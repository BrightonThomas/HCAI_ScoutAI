import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200",
        secondary: "bg-stone-100 text-stone-700 hover:bg-stone-200",
        outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
        ghost: "text-stone-500 hover:text-stone-800 hover:bg-stone-100",
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
