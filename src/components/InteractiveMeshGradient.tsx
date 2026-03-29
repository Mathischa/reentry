import { useEffect, useRef } from 'react';

export function InteractiveMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;

      // Clear
      ctx.fillStyle = 'rgba(7, 8, 15, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated mesh
      const spacing = 100;
      const amplitude = 35;
      const frequency = 0.02;

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          const distToMouse = Math.sqrt(
            Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2)
          );

          const influence = Math.max(0, 1 - distToMouse / 400);
          const offsetX = Math.sin(time + x * frequency) * amplitude * influence;
          const offsetY = Math.cos(time + y * frequency) * amplitude * influence;

          const drawX = x + offsetX;
          const drawY = y + offsetY;

          // Draw glowing dots
          const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, 8);
          gradient.addColorStop(0, `rgba(14, 165, 233, ${0.6 + influence * 0.4})`);
          gradient.addColorStop(1, `rgba(14, 165, 233, 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(drawX - 8, drawY - 8, 16, 16);

          // Draw lines to adjacent points
          if (x + spacing < canvas.width) {
            const nextX = x + spacing + Math.sin(time + (x + spacing) * frequency) * amplitude * influence;
            const nextY = y + offsetY;

            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 + influence * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }

          if (y + spacing < canvas.height) {
            const nextX = drawX;
            const nextY = y + spacing + Math.cos(time + (y + spacing) * frequency) * amplitude * influence;

            ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 + influence * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(nextX, nextY);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}
