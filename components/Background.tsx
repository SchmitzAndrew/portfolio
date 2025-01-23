"use client"

import { useEffect, useRef, useState } from 'react';
import { createNoise2D } from 'simplex-noise';

// Utility constants and functions
const TAU = Math.PI * 2;

const rand = (max: number) => Math.random() * max;

const fadeInOut = (life: number, ttl: number) => {
  const progress = life / ttl;
  return Math.min(1, Math.min(progress * 2, (1 - progress) * 2));
};

// Types
type ThemeConfig = {
  BASE_HUE: number;
  COLOR: {
    HUE_RANGE: number;
    SATURATION: number;
    LIGHTNESS: number;
    ALPHA: number;
    HUE_SPEED: number;
  };
  BACKGROUND: string;
};

type BackgroundConfig = {
  COUNT?: number;
  SPEED?: { BASE: number; RANGE: number };
  LIFETIME?: { BASE: number; RANGE: number };
  RADIUS?: { BASE: number; RANGE: number };
  DARK?: ThemeConfig;
  LIGHT?: ThemeConfig;
  NOISE_OFFSET?: number;
  BLUR?: number;
};

// Default animation parameters
const DEFAULT_PARAMS = {
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
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

interface BackgroundProps {
  className?: string;
  config?: BackgroundConfig;
  forceDark?: boolean;
  forceLight?: boolean;
}

export default function Background({
  className = "fixed inset-0 -z-10",
  config = {},
  forceDark,
  forceLight
}: BackgroundProps) {
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const circleProps = useRef<Float32Array>();
  const baseHue = useRef(220);
  const noise = createNoise2D();

  const systemIsDark = useColorScheme();
  const isDark = forceDark ?? (forceLight ? false : systemIsDark);

  // Merge default params with custom config
  const PARAMS = {
    ...DEFAULT_PARAMS,
    ...config,
    DARK: { ...DEFAULT_PARAMS.DARK, ...config.DARK },
    LIGHT: { ...DEFAULT_PARAMS.LIGHT, ...config.LIGHT }
  };

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

    const ctx = canvasARef.current.getContext('2d');
    if (ctx) drawCircle(ctx, props);

    circleProps.current[index] = x + vx;
    circleProps.current[index + 1] = y + vy;
    circleProps.current[index + 4] = life + 1;

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

    ctxA.clearRect(0, 0, canvasARef.current.width, canvasARef.current.height);
    ctxB.fillStyle = theme.BACKGROUND;
    ctxB.fillRect(0, 0, canvasBRef.current.width, canvasBRef.current.height);

    baseHue.current = (baseHue.current + theme.COLOR.HUE_SPEED) % 360;
    for (let i = 0; i < PARAMS.COUNT * 8; i += 8) {
      updateCircle(i);
    }

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

  return (
    <div className={className}>
      <canvas ref={canvasARef} className="hidden" />
      <canvas ref={canvasBRef} className="fixed inset-0 w-full h-full" />
    </div>
  );
} 