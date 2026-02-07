/* =======================
   Afili Portfolio JS
   ======================= */
const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

function setToast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  window.clearTimeout(setToast._tm);
  setToast._tm = window.setTimeout(()=>t.classList.remove("show"), 2300);
}

/* Icons (CSS masks via inline SVG) */
const ICONS = {
  moon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79Z'/%3E%3C/svg%3E")`,
  sun: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M6.76 4.84 5.34 3.42 3.93 4.83l1.41 1.41 1.42-1.4ZM1 13h3v-2H1v2Zm10 10h2v-3h-2v3Zm9-10h3v-2h-3v2Zm-2.76 6.16 1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41ZM20.07 4.83 18.66 3.42l-1.42 1.42 1.42 1.4 1.41-1.41ZM4.93 19.58 3.52 21l1.41 1.41 1.41-1.41-1.41-1.42ZM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z'/%3E%3C/svg%3E")`,
  github: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 .5C5.73.5.75 5.48.75 11.75c0 4.9 3.18 9.05 7.6 10.52.56.1.77-.24.77-.54v-1.9c-3.1.67-3.75-1.32-3.75-1.32-.5-1.3-1.22-1.65-1.22-1.65-1-.69.08-.68.08-.68 1.1.08 1.68 1.12 1.68 1.12.98 1.67 2.58 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.47-.28-5.07-1.24-5.07-5.53 0-1.22.43-2.22 1.12-3-.11-.28-.49-1.41.11-2.94 0 0 .92-.29 3.01 1.14a10.4 10.4 0 0 1 2.74-.37c.93 0 1.86.13 2.74.37 2.09-1.43 3.01-1.14 3.01-1.14.6 1.53.22 2.66.11 2.94.7.78 1.12 1.78 1.12 3 0 4.3-2.6 5.25-5.08 5.52.39.34.73 1 .73 2.02v3c0 .3.2.64.78.53a11.27 11.27 0 0 0 7.6-10.52C23.25 5.48 18.27.5 12 .5Z'/%3E%3C/svg%3E")`,
  link: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M10.59 13.41a1.996 1.996 0 0 0 2.82 0l3.59-3.59a2 2 0 1 0-2.82-2.82l-1.41 1.41-1.41-1.41 1.41-1.41a4 4 0 0 1 5.66 5.66l-3.59 3.59a4 4 0 0 1-5.66 0l1.41-1.41ZM13.41 10.59a1.996 1.996 0 0 0-2.82 0l-3.59 3.59a2 2 0 1 0 2.82 2.82l1.41-1.41 1.41 1.41-1.41 1.41a4 4 0 0 1-5.66-5.66l3.59-3.59a4 4 0 0 1 5.66 0l-1.41 1.41Z'/%3E%3C/svg%3E")`,
  mail: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z'/%3E%3C/svg%3E")`,
  download: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M5 20h14v-2H5v2Zm7-18-5.5 5.5 1.42 1.42L11 6.84V16h2V6.84l3.08 3.08 1.42-1.42L12 2Z'/%3E%3C/svg%3E")`,
  spark: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z'/%3E%3C/svg%3E")`,
  server: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M20 4H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 8H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2ZM6 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm0 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z'/%3E%3C/svg%3E")`,
  rocket: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2c4.42 0 8 3.58 8 8 0 1.19-.26 2.32-.73 3.33l2.02 2.02-3.54 3.54-2.02-2.02A7.96 7.96 0 0 1 12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8Zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 14 3-1-2-2-1 3Zm15-3-2 2 1 3-3-1 2-2 2-2Z'/%3E%3C/svg%3E")`,
};

function applyIcons(){
  $$("[data-icon]").forEach(el=>{
    const key = el.getAttribute("data-icon");
    const url = ICONS[key];
    if(!url) return;
    el.style.webkitMaskImage = url;
    el.style.maskImage = url;
  });
}

function setTheme(theme){
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  const icon = $("#themeToggle .icon");
  icon.setAttribute("data-icon", theme === "dark" ? "moon" : "sun");
  applyIcons();
}

function setupTheme(){
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const stored = localStorage.getItem("theme");
  setTheme(stored || (prefersLight ? "light" : "dark"));
  $("#themeToggle").addEventListener("click", ()=>{
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next);
    setToast(next === "dark" ? "Karanlık tema" : "Aydınlık tema");
  });
}

function setupReveal(){
  const items = $$(".reveal");
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(i=>io.observe(i));
}

function animateCount(el, to){
  const dur = 900;
  const t0 = performance.now();
  const step = (t)=>{
    const p = Math.min(1, (t - t0)/dur);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(to*eased);
    if(p<1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function setupCounters(){
  const stats = $$(".stat-number[data-count]");
  if(!stats.length) return;
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        stats.forEach(el=>animateCount(el, Number(el.dataset.count || "0")));
        io.disconnect();
      }
    });
  }, {threshold: 0.25});
  io.observe(stats[0]);
}

function setupDrawer(){
  const burger = $("#burger");
  const drawer = $("#drawer");
  function close(){
    drawer.classList.remove("open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden","true");
  }
  function open(){
    drawer.classList.add("open");
    burger.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden","false");
  }
  burger.addEventListener("click", ()=> drawer.classList.contains("open") ? close() : open());
  drawer.addEventListener("click", (e)=>{ if(e.target.tagName.toLowerCase()==="a") close(); });
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") close(); });
}

function setupContact(){
  const form = $("#contactForm");
  if(!form) return;
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name")||"").trim();
    const email = String(fd.get("email")||"").trim();
    const message = String(fd.get("message")||"").trim();
    const subject = encodeURIComponent(`Portföy sitesinden mesaj: ${name}`);
    const body = encodeURIComponent(`Ad: ${name}\nEmail: ${email}\n\nMesaj:\n${message}\n\n— Bu mail portföy sitenden geldi.`);
    const to = "batuhan.saylam@icloud.com"; // burayı kendine göre değiştir
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setToast("Mail taslağı açılıyor…");
    form.reset();
  });
}

$("#year").textContent = new Date().getFullYear();

import("./particles.js").then(mod=>{
  mod.startParticles(document.getElementById("bg-canvas"));
}).catch(()=>{});

applyIcons();
setupTheme();
setupReveal();
setupCounters();
setupDrawer();
setupContact();
