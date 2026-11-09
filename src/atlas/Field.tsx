import { useEffect, useRef } from "react";

/** A generative research landscape, explicitly not observed financial data. */
export default function Field({
  paused,
  mode = 0,
}: {
  paused: boolean;
  mode?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      visible = true,
      time = 0,
      last = 0;
    const pointer = { x: 0, y: 0 };
    const draw = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight,
        dpr = Math.min(devicePixelRatio || 1, 2);
      if (
        canvas.width !== Math.round(w * dpr) ||
        canvas.height !== Math.round(h * dpr)
      ) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const project = (u: number, v: number) => {
        const wave =
          Math.sin(u * 7 + time + mode * 0.6) *
            Math.cos(v * 4 + time * 0.4) *
            0.65 +
          Math.cos(u * 3 - v * 5 + mode) * 0.3;
        return [
          w * (0.08 + u * 0.68 + v * 0.18) + pointer.x * v * 12,
          h * (0.22 + v * 0.46 + wave * 0.18) + pointer.y * u * 15,
        ];
      };
      for (let row = 0; row < 33; row++) {
        ctx.beginPath();
        for (let col = 0; col <= 52; col++) {
          const [x, y] = project(col / 52, row / 32);
          if (!col) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${row > 21 ? "64,105,174" : "37,77,164"},${0.12 + row / 68})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }
      for (let col = 0; col < 27; col++) {
        ctx.beginPath();
        for (let row = 0; row <= 32; row++) {
          const [x, y] = project(col / 26, row / 32);
          if (!row) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(75,115,178,.13)";
        ctx.stroke();
      }
      for (let i = 0; i < 16; i++) {
        const u = (i * 0.067 + time * 0.035) % 1;
        const [x, y] = project(u, (i % 5) / 5);
        ctx.beginPath();
        ctx.arc(x, y, i % 3 === 0 ? 2.5 : 1.3, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? "#254da4" : "#527fbd";
        ctx.fill();
      }
    };
    const shouldAnimate = () =>
      !paused && !media.matches && visible && !document.hidden;
    const tick = (stamp: number) => {
      frame = 0;
      if (!shouldAnimate()) return;
      time += Math.min(stamp - last || 16, 40) * 0.00035;
      last = stamp;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      draw();
      if (shouldAnimate()) frame = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      if (paused || media.matches) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width - 0.5;
      pointer.y = (e.clientY - r.top) / r.height - 0.5;
    };
    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    const resize = new ResizeObserver(sync);
    resize.observe(canvas);
    canvas.addEventListener("pointermove", move);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      canvas.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, [paused, mode]);
  return <canvas ref={ref} className="a-field" aria-hidden="true" />;
}
