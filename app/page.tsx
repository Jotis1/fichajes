"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Geolocation } from '@capacitor/geolocation';

import { Clock, SignButton, TimeStamp } from '@/components';
import fetchData from './lib/script/actions';
import { useProvider } from '@/app/lib/context/contextProvider';

import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function Page() {

  const { sign, userID, addSign } = useProvider()
  const [signType, setSignType] = useState<"Entrada" | "Salida">("Entrada");
  const lastSign = sign.length ? (sign[sign.length - 1].type === "Entrada" ? "Salida" : "Entrada") : "Entrada";
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  useEffect(() => {
    if (!userID && !localStorage.getItem("userID")) {
      router.push('/login');
    }
  }, [userID, router]);

  useEffect(() => {
    setSignType(lastSign);
  }, [sign]);

  const handleSignClick = async () => {
    const date = new Date();
    const dia = ('0' + date.getDay()).slice(-2);
    const mes = ('0' + (date.getMonth() + 1)).slice(-2);
    const anio = date.getFullYear();
    const hora = ('0' + date.getHours()).slice(-2);
    const minutos = ('0' + date.getMinutes()).slice(-2);
    const segundos = ('0' + date.getSeconds()).slice(-2)
    const dayDate = `${dia}-${mes}-${anio}`;
    const hourDate = `${hora}:${minutos}:${segundos}`;
    const fullDate = {
      day: dayDate,
      hour: hourDate
    }

    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const coords = coordinates.coords;
      const serverResponse = await fetchData({ id: parseInt(userID), type: signType, date: fullDate, latitude: String(coords.latitude.toFixed(2)), longitude: String(coords.longitude.toFixed(2)) });
      addSign(signType);
      setSignType(signType === "Entrada" ? "Salida" : "Entrada");
    } catch (error: {} | any) {
      if (error.code && error.code == 1) {
        setError("Debes habilitar el uso de tu ubicación exacta")
      } else {
        setError("Usuario no existente")
      }
    }

  };

  return (
    <main
      className="relative landscape:py-5 pt-20 pb-10 px-5 h-screen w-full flex flex-col justify-between">
      {userID && typeof window !== 'undefined' && (
        <section className='z-99 h-full flex landscape:flex-row flex-col justify-between'>
          <section className='w-full landscape:w-1/2 flex flex-col landscape:justify-center items-center gap-10 p-5'>
            <Clock />
            <motion.section
              variants={container}
              initial="hidden"
              animate="visible" className='w-full flex flex-col gap-5 max-h-[300px] overflow-auto'>
              {sign.map(({ timestamp, type }: { timestamp: string; type: "Entrada" | "Salida" }, index: number) => (
                <motion.section key={index} variants={item}>
                  <TimeStamp date={timestamp} type={type} />
                </motion.section>
              ))}
            </motion.section>
          </section>
          <section className='flex landscape:w-1/2 justify-center items-center'>
            <SignButton onClick={handleSignClick} type={signType} />
          </section>
        </section>
      )}
      {error && (
        <section className='absolute left-0 top-0 backdrop-blur-sm w-full h-full bg-white/60 p-5 flex items-center'>
          <section className='w-full p-5 bg-red-300 rounded-[10px] border border-red-400 text-red-950 flex flex-col items-center justify-center text-xs gap-5 font-medium'>
            <section className='flex items-center gap-2.5'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </section>
            <Link className='border border-red-400 bg-white py-2.5 px-5 rounded-[10px]' href={`/login`}>Volver</Link>
          </section>
        </section>
      )}
    </main>
  )
}