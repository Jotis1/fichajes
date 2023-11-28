"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.5, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ stiffness: 100 }} className='text-3xl font-black text-zinc-950 flex items-center'>
            <p className='w-16 text-center'>{hours}</p>
            <p>:</p>
            <p className='w-16 text-center'>{minutes}</p>
            <p>:</p>
            <p className='w-16 text-center'>{seconds}</p>
        </motion.section>
    );
};

export default Clock;
