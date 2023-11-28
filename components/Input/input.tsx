"use client";

import { useState } from 'react';
import { Button } from '..';

export default function Input({
    type,
    showEye,
    placeholder,
    id,
    label,
    onChange,
}: {
    type: 'password' | 'text' | 'email';
    showEye?: boolean;
    placeholder?: string;
    id: string;
    label?: string;
    onChange: (value: string) => void;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <section className="w-full flex flex-col gap-2.5">
            {label && <label className="font-medium text-zinc-950" htmlFor={id}>{label}</label>}
            <section className="group focus-within:border-blue-500 transition-all border flex items-center justify-between border-zinc-300 text-xs rounded-[10px] overflow-hidden">
                <input
                    className="h-10 flex-grow px-2.5 outline-none text-zinc-950 placeholder:text-zinc-700"
                    name={id}
                    id={id}
                    type={isPasswordVisible ? 'text' : type}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                />
                {showEye && type === 'password' && (
                    <Button onlyIcon onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${isPasswordVisible ? "opacity-100" : "opacity-0"} w-5 h-5 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${!isPasswordVisible ? "opacity-100" : "opacity-0"} w-5 h-5 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </Button>
                )}
            </section>
        </section>
    );
}
