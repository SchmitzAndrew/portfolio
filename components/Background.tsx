"use client"

import React, { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';
import { useColorScheme } from '@/hooks/useColorScheme';

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
  PIXEL_SIZE?: number;
};

// Default animation parameters
const DEFAULT_PARAMS = {
  COUNT: 133,
  SPEED: { BASE: 0.04, RANGE: 0.03 },
  LIFETIME: { BASE: 500, RANGE: 400 },
  RADIUS: { BASE: 77, RANGE: 240 },
  DARK: {
    BASE_HUE: 250,
    COLOR: {
      HUE_RANGE: 22,
      SATURATION: 85,
      LIGHTNESS: 40,
      ALPHA: 0.35,
      HUE_SPEED: 0.035
    },
    BACKGROUND: 'hsla(250, 95%, 4%, 0.99)'
  },
  LIGHT: {
    BASE_HUE: 250,
    COLOR: {
      HUE_RANGE: 22,
      SATURATION: 80,
      LIGHTNESS: 45,
      ALPHA: 0.3,
      HUE_SPEED: 0.035
    },
    BACKGROUND: 'hsla(250, 15%, 10%, 0.98)'
  },
  NOISE_OFFSET: 0.01,
  BLUR: 0,
  PIXEL_SIZE: 10
} as const;

interface BackgroundProps {
  className?: string;
  config?: BackgroundConfig;
  forceDark?: boolean;
  forceLight?: boolean;
  children?: React.ReactNode;
}

export default function Background({
  className = "fixed inset-0 -z-10",
  config = {},
  forceDark,
  forceLight,
  children
}: BackgroundProps) {
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const circleProps = useRef<Float32Array>();
  const baseHue = useRef(Math.random() * 360);
  const noise = createNoise2D();
  const timeOffset = useRef(Math.random() * 10000);
  const isInitialSetup = useRef(true);

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

    let timeNoise, angle, speed, hueOffset;

    if (isInitialSetup.current) {
      // Apply time-based noise only during initial setup
      timeNoise = noise((x + timeOffset.current) * PARAMS.NOISE_OFFSET, (y + timeOffset.current) * PARAMS.NOISE_OFFSET);
      angle = rand(TAU) + timeNoise * TAU;
      speed = PARAMS.SPEED.BASE + rand(PARAMS.SPEED.RANGE) + Math.abs(timeNoise) * 0.02;
      hueOffset = timeNoise * theme.COLOR.HUE_RANGE * 2;
    } else {
      // Use simpler randomization for regeneration
      timeNoise = noise(x * PARAMS.NOISE_OFFSET, y * PARAMS.NOISE_OFFSET);
      angle = rand(TAU);
      speed = PARAMS.SPEED.BASE + rand(PARAMS.SPEED.RANGE);
      hueOffset = timeNoise * theme.COLOR.HUE_RANGE;
    }

    const positionFactor = (x / canvasARef.current.width + y / canvasARef.current.height) * 135;

    const props = [
      x,
      y,
      speed * Math.cos(angle),
      speed * Math.sin(angle),
      0, // Reset life to 0 for regenerated circles
      PARAMS.LIFETIME.BASE + rand(PARAMS.LIFETIME.RANGE),
      PARAMS.RADIUS.BASE + rand(PARAMS.RADIUS.RANGE) + (isInitialSetup.current ? Math.abs(timeNoise) * 20 : 0),
      (baseHue.current + positionFactor + hueOffset) % 360
    ];

    circleProps.current.set(props, index);
  };

  const drawCircle = (ctx: CanvasRenderingContext2D, props: number[]) => {
    const [x, y, , , life, ttl, radius, hue] = props;
    const fade = fadeInOut(life, ttl);

    // Create gradient for each circle to enhance thermal effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const baseAlpha = fade * theme.COLOR.ALPHA;

    // Inner color (slightly warmer)
    gradient.addColorStop(0, `hsla(${(hue + 12) % 360}, ${theme.COLOR.SATURATION + 8}%, ${theme.COLOR.LIGHTNESS + 12}%, ${baseAlpha * 1.1})`);
    // Outer color (base)
    gradient.addColorStop(1, `hsla(${hue}, ${theme.COLOR.SATURATION}%, ${theme.COLOR.LIGHTNESS}%, ${baseAlpha})`);

    ctx.save();
    ctx.fillStyle = gradient;
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

    // Clear both canvases
    ctxA.clearRect(0, 0, canvasARef.current.width, canvasARef.current.height);
    ctxB.fillStyle = theme.BACKGROUND;
    ctxB.fillRect(0, 0, canvasBRef.current.width, canvasBRef.current.height);

    baseHue.current = (baseHue.current + theme.COLOR.HUE_SPEED) % 360;
    timeOffset.current += 0.001;

    for (let i = 0; i < PARAMS.COUNT * 8; i += 8) {
      updateCircle(i);
    }

    // Create pixelation effect
    const pixelSize = PARAMS.PIXEL_SIZE;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      // Set temporary canvas to a smaller size
      tempCanvas.width = Math.ceil(canvasARef.current.width / pixelSize);
      tempCanvas.height = Math.ceil(canvasARef.current.height / pixelSize);

      // Configure temp context
      tempCtx.imageSmoothingEnabled = false;

      // Draw scaled down version
      tempCtx.drawImage(canvasARef.current, 0, 0, tempCanvas.width, tempCanvas.height);

      // Clear the final canvas and draw pixelated version
      ctxB.imageSmoothingEnabled = false;
      ctxB.drawImage(
        tempCanvas,
        0, 0, tempCanvas.width, tempCanvas.height,
        0, 0, canvasBRef.current.width, canvasBRef.current.height
      );
    }

    requestAnimationFrame(draw);
  };

  const handleResize = () => {
    if (!canvasARef.current || !canvasBRef.current) return;

    const { innerWidth, innerHeight } = window;
    [canvasARef, canvasBRef].forEach(ref => {
      if (ref.current) {
        ref.current.width = innerWidth;
        ref.current.height = innerHeight;
        const ctx = ref.current.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = false;
        }
      }
    });
  };

  useEffect(() => {
    circleProps.current = new Float32Array(PARAMS.COUNT * 8);
    isInitialSetup.current = true;
    for (let i = 0; i < PARAMS.COUNT * 8; i += 8) {
      initCircle(i);
    }
    isInitialSetup.current = false;

    handleResize();
    draw();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <canvas ref={canvasARef} className="hidden" />
        <canvas ref={canvasBRef} className="fixed inset-0 w-full h-full" />
        <div className="fixed inset-0 bg-white/[0.07]" />
      </div>
      <main className="relative min-h-screen">
        {children}
      </main>
    </>
  );
} 