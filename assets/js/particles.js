/* Lightweight particles (no deps). */
export function startParticles(canvas){
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  const state = { w:0, h:0, dpr:1, parts:[], raf:0, last:0 };
  const rand = (a,b)=>Math.random()*(b-a)+a;

  function resize(){
    state.dpr = Math.min(2, window.devicePixelRatio || 1);
    state.w = canvas.clientWidth || window.innerWidth;
    state.h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    ctx.setTransform(state.dpr,0,0,state.dpr,0,0);
    const count = Math.round(Math.min(130, Math.max(70, state.w/12)));
    state.parts = new Array(count).fill(0).map(()=>({
      x: rand(0,state.w), y: rand(0,state.h),
      r: rand(0.6, 2.2),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.12, 0.12),
      a: rand(0.08, 0.22)
    }));
  }

  function palette(){
    const theme = document.documentElement.dataset.theme || "dark";
    if(theme === "light"){
      return { p1:"rgba(15,23,42,0.20)", p2:"rgba(96,165,250,0.16)", p3:"rgba(167,139,250,0.14)" };
    }
    return { p1:"rgba(255,255,255,0.16)", p2:"rgba(96,165,250,0.18)", p3:"rgba(167,139,250,0.14)" };
  }

  function step(t){
    const dt = Math.min(40, (t - state.last) || 16);
    state.last = t;
    const {p1,p2,p3} = palette();
    ctx.clearRect(0,0,state.w,state.h);

    const g = ctx.createRadialGradient(state.w*0.6, state.h*0.25, 0, state.w*0.6, state.h*0.25, Math.max(state.w,state.h)*0.8);
    g.addColorStop(0, p3);
    g.addColorStop(0.5, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0,0,state.w,state.h);

    for(const p of state.parts){
      p.x += p.vx * dt; p.y += p.vy * dt;
      if(p.x < -20) p.x = state.w + 20;
      if(p.x > state.w + 20) p.x = -20;
      if(p.y < -20) p.y = state.h + 20;
      if(p.y > state.h + 20) p.y = -20;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p1;
      ctx.globalAlpha = p.a;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for(let i=0; i<state.parts.length; i+=2){
      const a = state.parts[i];
      const b = state.parts[(i+Math.floor(rand(1,8))) % state.parts.length];
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if(d < 180){
        ctx.strokeStyle = d < 90 ? p2 : p3;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.25 * (1 - d/180);
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    state.raf = requestAnimationFrame(step);
  }

  resize();
  state.raf = requestAnimationFrame(step);
  window.addEventListener("resize", resize);
  return ()=>{ cancelAnimationFrame(state.raf); window.removeEventListener("resize", resize); };
}
