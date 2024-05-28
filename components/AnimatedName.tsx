"use client"

import Link from "next/link";

import { motion } from 'framer-motion'

export default function AnimatedName() {
    return (
        <Link href="/">
            <motion.div 
                className="pt-4"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div 
                    className="flex justify-center pr-14"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.h1 
                        className="title-gradient text-6xl md:text-8xl text-center px-4"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        Andrew
                    </motion.h1>
                </motion.div>
                <motion.div 
                    className="flex justify-center pl-14"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.h1 
                        className="title-gradient text-6xl md:text-8xl text-center px-4"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        Schmitz
                    </motion.h1>
                </motion.div>
            </motion.div>
        </Link>
    )
}

