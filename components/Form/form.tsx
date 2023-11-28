"use client";

import { useState } from 'react';
import { Button, Header, Input } from '..';
import { useRouter } from 'next/navigation';
import { useProvider } from '@/app/lib/context/contextProvider';
import { motion } from 'framer-motion';

export default function Form() {
    const [userIdValue, setUserId] = useState('');
    const { saveUserID } = useProvider();


    const router = useRouter();

    const handleButtonClick = async () => {
        saveUserID(userIdValue);
        setTimeout(() => {
            router.push("/");
        }, 500);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ stiffness: 100 }}
            className="drop-shadow-[0_5px_15px_#52525B25] flex flex-col gap-16 bg-white px-5 py-10 rounded-[20px] w-full">
            <Header title="Fichajes" subtitle="Te damos la bienvenida"></Header>
            <Input type="password" placeholder="Introduce tu ID de usuario" showEye id="userID" onChange={(value) => setUserId(value)} />
            <Button bordered onClick={handleButtonClick}>Entrar</Button>
        </motion.section>
    );
} 
