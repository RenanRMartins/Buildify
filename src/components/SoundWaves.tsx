import React, { useEffect, useRef } from 'react';

export const SoundWaves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (x: number, y: number, amplitude: number, frequency: number, color: string) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;

      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 2) {
        const waveY = y + Math.sin((i * frequency + timeRef.current) * 0.01) * amplitude;
        if (i === 0) {
          ctx.moveTo(i, waveY);
        } else {
          ctx.lineTo(i, waveY);
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 2;

      // Multiple wave layers
      drawWave(0, canvas.height * 0.3, 30, 0.02, '#00f5ff');
      drawWave(0, canvas.height * 0.5, 20, 0.03, '#bf00ff');
      drawWave(0, canvas.height * 0.7, 25, 0.025, '#00ff41');
      drawWave(0, canvas.height * 0.9, 15, 0.04, '#ff0080');

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"
      style={{ background: 'transparent' }}
    />
  );
};
