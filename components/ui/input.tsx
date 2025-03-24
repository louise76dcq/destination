import React from "react";

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "email" | "number"; // Pour spécifier le type d'input
    className?: string; // Classe personnalisée en plus
    min?: number; // Minimum value pour les entrées numériques
};

export const Input = ({
                          value,
                          onChange,
                          type = "text", // Le type par défaut est "text"
                          className = "",
                          min,
                      }: InputProps) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            min={min}
            className={`border border-gray-300 rounded-md p-2 text-center ${className}`}
        />
    );
};
