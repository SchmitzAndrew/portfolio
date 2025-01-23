"use client"

import { useEffect, useRef, useState } from 'react';
import { createNoise2D } from 'simplex-noise';
import { TAU, rand, fadeInOut } from './utils';

// Animation parameters
const PARAMS = {
    COUNT: 85,
    SPEED: { BASE: 0.045, RANGE: 0.06 },
    LIFETIME: { BASE: 250, RANGE: 300 },
    RADIUS: { BASE: 140, RANGE: 220 },
    DARK: {
        BASE_HUE: 220,
        COLOR: {
            HUE_RANGE: 120,
            SATURATION: 55,
            LIGHTNESS: 50,
            ALPHA: 0.4,
            HUE_SPEED: 0.3
        },
        BACKGROUND: 'hsla(225, 35%, 3%, 0.96)'
    },
    LIGHT: {
        BASE_HUE: 210,
        COLOR: {
            HUE_RANGE: 160,
            SATURATION: 85,
            LIGHTNESS: 65,
            ALPHA: 0.3,
            HUE_SPEED: 0.25
        },
        BACKGROUND: 'hsla(0, 0%, 100%, 0.99)'
    },
    NOISE_OFFSET: 0.001,
    BLUR: 85
} as const;

const useColorScheme = () => {
    const [isDark, setIsDark] = useState(() => {
        // Initialize with the current system preference
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Check initial color scheme
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        console.log('Initial color scheme:', mediaQuery.matches ? 'dark' : 'light');
        setIsDark(mediaQuery.matches);

        // Listen for changes
        const handler = (e: MediaQueryListEvent) => {
            console.log('Color scheme changed to:', e.matches ? 'dark' : 'light');
            setIsDark(e.matches);
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return isDark;
};

export default function Background() {
    const canvasARef = useRef<HTMLCanvasElement>(null);
    const canvasBRef = useRef<HTMLCanvasElement>(null);
    const circleProps = useRef<Float32Array>();
    const baseHue = useRef(220);
    const noise = createNoise2D();
    const isDark = useColorScheme();
    const theme = isDark ? PARAMS.DARK : PARAMS.LIGHT;

    const initCircle = (index: number) => {
        if (!canvasARef.current || !circleProps.current) return;

        const x = rand(canvasARef.current.width);
        const y = rand(canvasARef.current.height);
        const n = noise(x * PARAMS.NOISE_OFFSET, y * PARAMS.NOISE_OFFSET);
        const angle = rand(TAU);
        const speed = PARAMS.SPEED.BASE + rand(PARAMS.SPEED.RANGE);
        
        const positionFactor = (x / canvasARef.current.width + y / canvasARef.current.height) * 180;
        
        const props = [
            x,
            y,
            speed * Math.cos(angle),
            speed * Math.sin(angle),
            0,
            PARAMS.LIFETIME.BASE + rand(PARAMS.LIFETIME.RANGE),
            PARAMS.RADIUS.BASE + rand(PARAMS.RADIUS.RANGE),
            (baseHue.current + positionFactor + n * theme.COLOR.HUE_RANGE) % 360
        ];

        circleProps.current.set(props, index);
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, props: number[]) => {
        const [x, y, , , life, ttl, radius, hue] = props;
        
        ctx.save();
        ctx.fillStyle = `hsla(${hue},${theme.COLOR.SATURATION}%,${theme.COLOR.LIGHTNESS}%,${fadeInOut(life, ttl) * theme.COLOR.ALPHA
        })`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, TAU);
        ctx.fill();
        ctx.restore();
    };

    const updateCircle = (index: number) => {
        if (!canvasARef.current || !circleProps.current) return;
        
        const props = Array.from(circleProps.current.slice(index, index + 8));
        const [x, y, vx, vy, life, ttl, radius] = props;

        // Draw current state
        const ctx = canvasARef.current.getContext('2d');
        if (ctx) drawCircle(ctx, props);

        // Update position and life
        circleProps.current[index] = x + vx;     // Update x
        circleProps.current[index + 1] = y + vy; // Update y
        circleProps.current[index + 4] = life + 1; // Update life

        // Reset if out of bounds or exceeded lifetime
        if (isOutOfBounds(x, y, radius) || life > ttl) {
            initCircle(index);
        }
    };

    const isOutOfBounds = (x: number, y: number, radius: number) => {
        if (!canvasARef.current) return true;
        const { width, height } = canvasARef.current;
        return x < -radius || x > width + radius || y < -radius || y > height + radius;
    };

    const draw = () => {
        if (!canvasARef.current || !canvasBRef.current) return;
        const ctxA = canvasARef.current.getContext('2d');
        const ctxB = canvasBRef.current.getContext('2d');
        if (!ctxA || !ctxB) return;

        // Clear and fill background with theme-appropriate color
        ctxA.clearRect(0, 0, canvasARef.current.width, canvasARef.current.height);
        ctxB.fillStyle = theme.BACKGROUND;
        ctxB.fillRect(0, 0, canvasBRef.current.width, canvasBRef.current.height);

        // Update and render circles
        baseHue.current = (baseHue.current + theme.COLOR.HUE_SPEED) % 360;
        for (let i = 0; i < PARAMS.COUNT * 8; i += 8) {
            updateCircle(i);
        }

        // Apply blur effect
        ctxB.save();
        ctxB.filter = `blur(${PARAMS.BLUR}px)`;
        ctxB.drawImage(canvasARef.current, 0, 0);
        ctxB.restore();

        requestAnimationFrame(draw);
    };

    const handleResize = () => {
        if (!canvasARef.current || !canvasBRef.current) return;
        
        const { innerWidth, innerHeight } = window;
        [canvasARef, canvasBRef].forEach(ref => {
            if (ref.current) {
                ref.current.width = innerWidth;
                ref.current.height = innerHeight;
            }
        });
    };

    useEffect(() => {
        circleProps.current = new Float32Array(PARAMS.COUNT * 8);
        for (let i = 0; i < PARAMS.COUNT * 8; i += 8) {
            initCircle(i);
        }

        handleResize();
        draw();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log('Using theme:', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <div className="fixed inset-0 -z-10">
            <canvas ref={canvasARef} className="hidden" />
            <canvas ref={canvasBRef} className="fixed inset-0 w-full h-full" />
        </div>
    );
}