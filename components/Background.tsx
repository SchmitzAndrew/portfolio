"use client"

import React, { useEffect, useRef, useMemo } from 'react';
import { createNoise2D } from 'simplex-noise';
import { useColorScheme } from '@/hooks/useColorScheme';

// Constants
const TAU = Math.PI * 2;
const BASE_HUE = 250;

// Utility functions
const rand = (max: number) => Math.random() * max;
const fadeInOut = (life: number, ttl: number) => {
  const progress = life / ttl;
  return Math.min(1, Math.min(progress * 2, (1 - progress) * 2));
};

// Add throttle utility
const throttle = (fn: Function, delay: number) => {
  let lastCall = 0;
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: any[]) {
    const now = Date.now();

    if (now - lastCall < delay) {
      // If we're within the delay period, wait until it's over
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastCall = now;
        fn.apply(this, args);
      }, delay);
      return;
    }

    lastCall = now;
    fn.apply(this, args);
  };
};

// Theme configuration
const THEME = {
  DARK: {
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
    COLOR: {
      HUE_RANGE: 22,
      SATURATION: 80,
      LIGHTNESS: 50,
      ALPHA: 0.3,
      HUE_SPEED: 0.035
    },
    BACKGROUND: 'hsla(250, 15%, 25%, 0.98)'
  }
} as const;

// Animation parameters
const ANIMATION = {
  COUNT: 133,
  SPEED: { BASE: 0.04, RANGE: 0.03 },
  LIFETIME: { BASE: 500, RANGE: 400 },
  RADIUS: { BASE: 77, RANGE: 240 },
  NOISE_OFFSET: 0.01,
  BLUR: 0,
  PIXEL_SIZE: 10
} as const;

// Add debounce utility at the top with other utility functions
const debounce = (fn: Function, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

interface BackgroundProps {
  className?: string;
  config?: Partial<typeof ANIMATION & { DARK: typeof THEME.DARK; LIGHT: typeof THEME.LIGHT }>;
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
  // Refs
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const circleProps = useRef<Float32Array>();
  const baseHue = useRef(Math.random() * 360);
  const timeOffset = useRef(Math.random() * 10000);
  const isInitialSetup = useRef(true);
  const animationFrame = useRef<number>();

  // Theme handling
  const systemIsDark = useColorScheme();
  const isDark = forceDark ?? (forceLight ? false : systemIsDark);

  // Memoize theme and params to prevent unnecessary recalculations
  const theme = useMemo(() => isDark ? THEME.DARK : THEME.LIGHT, [isDark]);
  const params = useMemo(() => ({
    ...ANIMATION,
    ...config,
    DARK: { ...THEME.DARK, ...config.DARK },
    LIGHT: { ...THEME.LIGHT, ...config.LIGHT }
  }), [config]);

  // Canvas operations
  const initCircle = (index: number) => {
    if (!canvasARef.current || !circleProps.current) return;

    const x = rand(canvasARef.current.width);
    const y = rand(canvasARef.current.height);
    const noise = createNoise2D();

    const timeNoise = isInitialSetup.current
      ? noise((x + timeOffset.current) * params.NOISE_OFFSET, (y + timeOffset.current) * params.NOISE_OFFSET)
      : noise(x * params.NOISE_OFFSET, y * params.NOISE_OFFSET);

    const angle = rand(TAU) + (isInitialSetup.current ? timeNoise * TAU : 0);
    const speed = params.SPEED.BASE + rand(params.SPEED.RANGE) + (isInitialSetup.current ? Math.abs(timeNoise) * 0.02 : 0);
    const hueOffset = timeNoise * theme.COLOR.HUE_RANGE * (isInitialSetup.current ? 2 : 1);
    const positionFactor = (x / canvasARef.current.width + y / canvasARef.current.height) * 135;

    const props = [
      x,
      y,
      speed * Math.cos(angle),
      speed * Math.sin(angle),
      0,
      params.LIFETIME.BASE + rand(params.LIFETIME.RANGE),
      params.RADIUS.BASE + rand(params.RADIUS.RANGE) + (isInitialSetup.current ? Math.abs(timeNoise) * 20 : 0),
      (baseHue.current + positionFactor + hueOffset) % 360
    ];

    circleProps.current.set(props, index);
  };

  const drawCircle = (ctx: CanvasRenderingContext2D, props: number[]) => {
    const [x, y, , , life, ttl, radius, hue] = props;
    const fade = fadeInOut(life, ttl);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const baseAlpha = fade * theme.COLOR.ALPHA;

    gradient.addColorStop(0, `hsla(${(hue + 12) % 360}, ${theme.COLOR.SATURATION + 8}%, ${theme.COLOR.LIGHTNESS + 12}%, ${baseAlpha * 1.1})`);
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

    const isOutOfBounds = x < -radius || x > canvasARef.current.width + radius ||
      y < -radius || y > canvasARef.current.height + radius;

    if (isOutOfBounds || life > ttl) {
      initCircle(index);
    }
  };

  const draw = () => {
    if (!canvasARef.current || !canvasBRef.current) return;
    const ctxA = canvasARef.current.getContext('2d');
    const ctxB = canvasBRef.current.getContext('2d');
    if (!ctxA || !ctxB) return;

    // Clear canvases
    ctxA.clearRect(0, 0, canvasARef.current.width, canvasARef.current.height);
    ctxB.fillStyle = theme.BACKGROUND;
    ctxB.fillRect(0, 0, canvasBRef.current.width, canvasBRef.current.height);

    // Update state
    baseHue.current = (baseHue.current + theme.COLOR.HUE_SPEED) % 360;
    timeOffset.current += 0.001;

    // Update and draw circles
    for (let i = 0; i < params.COUNT * 8; i += 8) {
      updateCircle(i);
    }

    // Apply pixelation
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCanvas.width = Math.ceil(canvasARef.current.width / params.PIXEL_SIZE);
      tempCanvas.height = Math.ceil(canvasARef.current.height / params.PIXEL_SIZE);
      tempCtx.imageSmoothingEnabled = false;
      tempCtx.drawImage(canvasARef.current, 0, 0, tempCanvas.width, tempCanvas.height);
      ctxB.imageSmoothingEnabled = false;
      ctxB.drawImage(
        tempCanvas,
        0, 0, tempCanvas.width, tempCanvas.height,
        0, 0, canvasBRef.current.width, canvasBRef.current.height
      );
    }

    requestAnimationFrame(draw);
  };

  const updateCanvasDimensions = () => {
    if (!canvasARef.current || !canvasBRef.current) return;
    const { innerWidth, innerHeight } = window;
    [canvasARef, canvasBRef].forEach(ref => {
      if (ref.current) {
        ref.current.width = innerWidth;
        ref.current.height = innerHeight;
        const ctx = ref.current.getContext('2d');
        if (ctx) ctx.imageSmoothingEnabled = false;
      }
    });
  };

  const reinitializeCircles = () => {
    if (!circleProps.current) return;
    isInitialSetup.current = true;
    for (let i = 0; i < params.COUNT * 8; i += 8) {
      initCircle(i);
    }
    isInitialSetup.current = false;
  };

  // Throttled resize handler for dimension updates
  const handleResize = throttle(() => {
    updateCanvasDimensions();
  }, 16); // ~60fps

  // Debounced complete handler for circle reinitialization
  const handleResizeComplete = debounce(() => {
    updateCanvasDimensions();
    reinitializeCircles();
  }, 250);

  // Setup effect - now with proper cleanup and theme dependency
  useEffect(() => {
    updateCanvasDimensions();

    requestAnimationFrame(() => {
      circleProps.current = new Float32Array(params.COUNT * 8);
      reinitializeCircles();
      animationFrame.current = requestAnimationFrame(draw);
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResizeComplete);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResizeComplete);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [theme]);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <canvas ref={canvasARef} className="hidden" />
        <canvas ref={canvasBRef} className="fixed inset-0 w-full h-full" />
        <div className={`fixed inset-0 ${isDark ? 'bg-white/[0.07]' : 'bg-black/[0.02]'}`} />
      </div>
      <main className="relative min-h-screen">
        {children}
      </main>
    </>
  );
} 