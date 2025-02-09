"use client"

import { useEffect, useRef, useState } from "react";
import Background from "@/components/Background";
import { Press_Start_2P } from "next/font/google";
import CenterUnderline from "@/components/CenterUnderline";
import ComesInGoesOutUnderline from "@/components/ComesInGoesOutUnderline";
import { useColorScheme } from "@/hooks/useColorScheme";

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ["latin"],
    display: 'swap',
});

export default function Page() {
    const [textWidth, setTextWidth] = useState<number | null>(null);
    const [textHeight, setTextHeight] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const isDark = useColorScheme();

    useEffect(() => {
        if (containerRef.current && h1Ref.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const h1Rect = h1Ref.current.getBoundingClientRect();
            setTextWidth(rect.width);
            setTextHeight(h1Rect.height);
        }
    }, []);

    const cutoutTop = textHeight ? textHeight + 33 : 0;
    const cutoutBottom = textHeight ? cutoutTop + 27 : 0;

    const textStyle = {
        color: isDark ? 'white' : 'black',
        textShadow: isDark ? '2px 2px 0 #000' : '2px 2px 0 #fff',
        imageRendering: 'pixelated',
        letterSpacing: '0.1em',
        transform: 'scale(1, 1.2)',
        fontSmooth: 'never',
        WebkitFontSmoothing: 'none'
    } as const;

    const measurementContainer = (
        <div className="absolute opacity-0 pointer-events-none">
            <div ref={containerRef}>
                <h1 ref={h1Ref} className={`${pressStart2P.className} text-3xl`} style={textStyle}>
                    andrew schmitz
                </h1>
            </div>
        </div>
    );

    if (!textWidth || !textHeight) {
        return (
            <Background>
                <div className="w-full h-screen flex items-center justify-center">
                    {measurementContainer}
                </div>
            </Background>
        );
    }

    return (
        <Background>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="h-[45vh] aspect-[1.618] relative">
                    <div className={`absolute inset-0 ${isDark ? 'bg-black' : 'bg-white'}`} style={{
                        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 30px 0%, 30px ${cutoutBottom}px, calc(30px + ${textWidth}px) ${cutoutBottom}px, calc(30px + ${textWidth}px) ${cutoutTop}px, 30px ${cutoutTop}px, 30px 0%, 0% 0%)`
                    }} />
                    <div ref={containerRef} className="absolute top-8 left-8">
                        <h1 ref={h1Ref} className={`${pressStart2P.className} text-3xl`} style={textStyle}>
                            andrew schmitz
                        </h1>
                        <p className={`${pressStart2P.className} text-sm mt-12 max-w-md ${isDark ? 'text-white' : 'text-black'}`}>
                            building <span className={`${isDark ? 'text-white' : 'text-black'} underline cursor-pointer`} onClick={() => window.open('https://myminutes.ai', '_blank')}>minutes</span> @ <span className={`${isDark ? 'text-white' : 'text-black'} underline cursor-pointer`} onClick={() => window.open('https://slam.ventures', '_blank')}>SLAM</span>
                        </p>

                        <p className={`${pressStart2P.className} text-sm mt-8 mb-4 max-w-md ${isDark ? 'text-white' : 'text-black'}`}>
                            more:
                        </p>
                        <ul className={`${pressStart2P.className} text-sm ${isDark ? 'text-white' : 'text-black'} space-y-3`}>
                            <li><ComesInGoesOutUnderline label="twitter" className={isDark ? 'text-white' : 'text-black'} onClick={() => window.open('https://twitter.com/big_schmitz', '_blank')} /></li>
                            <li><ComesInGoesOutUnderline label="github" className={isDark ? 'text-white' : 'text-black'} onClick={() => window.open('https://github.com/SchmitzAndrew', '_blank')} /></li>
                            <li><ComesInGoesOutUnderline label="email" className={isDark ? 'text-white' : 'text-black'} onClick={() => window.open('mailto:schmitzandrew03@gmail.com', '_blank')} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Background>
    );
}
