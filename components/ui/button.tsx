import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "outline"; // Deux variantes possibles
    disabled?: boolean; // Si le bouton doit être désactivé
    className?: string; // Classe personnalisée en plus
};

export const Button = ({
                           children,
                           onClick,
                           variant = "default", // "default" est la variante par défaut
                           disabled = false,
                           className = "",
                       }: ButtonProps) => {
    const buttonClass =
        variant === "default"
            ? "bg-blue-500 text-white border border-blue-500 hover:bg-blue-600"
            : "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`rounded-md px-4 py-2 font-semibold ${buttonClass} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
};
