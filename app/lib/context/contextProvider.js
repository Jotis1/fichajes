"use client";

import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {

    const currentDate = new Date(),
        savedSignKey = `sign_${currentDate.toISOString().split('T')[0]}`;

    const [userID, setUserID] = useState("");
    const [sign, setSign] = useState([]);

    const saveUserID = (id) => {
        setUserID(id);
        localStorage.setItem("userID", id);
    }

    const addSign = (type) => {
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");
        const newSign = {
            type,
            timestamp: `${hours}:${minutes}:${seconds}`
        };

        const updatedSign = [...sign, newSign];
        setSign(updatedSign);
        localStorage.setItem(savedSignKey, JSON.stringify(updatedSign));
    }

    useEffect(() => {
        const savedUserID = localStorage.getItem("userID");
        const savedSign = JSON.parse(localStorage.getItem(savedSignKey)) || [];

        setUserID(savedUserID);
        setSign(savedSign);
    }, []);

    return (
        <Context.Provider value={{ sign, userID, addSign, saveUserID }}>
            {children}
        </Context.Provider>
    )
};

export const useProvider = () => {
    return useContext(Context);
}