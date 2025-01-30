"use client"

import { useEffect, useRef, useState } from "react";
import Background from "@/components/Background";

export default function Page() {
    const [textWidth, setTextWidth] = useState(300);
    const [textHeight, setTextHeight] = useState(0);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const rect = textRef.current.getBoundingClientRect();
            setTextWidth(rect.width);
            setTextHeight(rect.height);
        }
    }, []);

    const cutoutTop = 37 + textHeight; // top-8 (32px) + text height + 10px gap
    const cutoutBottom = cutoutTop + 33; // 33px height for cutout

    return (
        <Background>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="h-[44vh] aspect-[1.618] relative">
                    {/* Main black box with cutout */}
                    <div className="absolute inset-0 bg-black" style={{
                        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 32px 0%, 32px ${cutoutBottom}px, calc(32px + ${textWidth}px) ${cutoutBottom}px, calc(32px + ${textWidth}px) ${cutoutTop}px, 32px ${cutoutTop}px, 32px 0%, 0% 0%)`
                    }} />
                    <h1 ref={textRef} className="absolute top-8 left-8 text-5xl font-bold italic" style={{
                        WebkitTextStroke: '2px white',
                        color: 'transparent'
                    }}>
                        Andrew Schmitz
                    </h1>
                </div>
            </div>
        </Background>
    );
}
