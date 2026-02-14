// ✅ Personalize here
const WIFE_NAME = "Divya Sree (Daalu)";
const YOUR_NAME = "Arun Kumar (Dagalti)";

const LOVE_NOTE =
`Thank you for everything you do for our family.
I notice the small things you do every day, even when nobody says it.
I’m lucky to have you. ❤️`;

const LOVE_LETTER =
`I know life gets busy, especially with work and our kid.
And now we are in different countries — you in India and me in Japan.

You are handling everything there, and I am working here,
but we are still building one life together.

Working in Japan is for our future,
but my real happiness is you and our kid.

Thank you for taking care of our family while I am away.
I may be far physically, but my heart is always with you both.

I truly appreciate you more than I say.
I choose you — again and again. ❤️`;

const TONIGHT_PLAN =
`📞 Video call with you and our kid tonight
🍰 Order your favorite food in India (my treat)
📸 Take one family screenshot together
💌 Read this love letter slowly
🌏 Even if I am in Japan, my heart is with you both`;

// Timeline moments
const MOMENTS = [
  { date: "Our beginning", title: "We started", desc: "The day our story began." },
  { date: "Wedding", title: "We became family", desc: "Best decision of my life." },
  { date: "Baby", title: "Our biggest blessing", desc: "Our kid changed everything in a good way." },
  { date: "Japan", title: "Building life here", desc: "We are stronger together." },
  { date: "Today", title: "Still choosing you", desc: "I’m grateful for you — always." }
];

// Photos expected: photos/1.jpg ... photos/6.jpg
const PHOTO_COUNT = 6;

// --------------------------------------------------------

const heroTitle = document.getElementById("heroTitle");
const heroSub = document.getElementById("heroSub");
const loveNoteEl = document.getElementById("loveNote");
const timelineEl = document.getElementById("timeline");
const galleryEl = document.getElementById("gallery");
const planBox = document.getElementById("planBox");

const modal = document.getElementById("modal");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeModal = document.getElementById("closeModal");
const dearLine = document.getElementById("dearLine");
const letterText = document.getElementById("letterText");
const signLine = document.getElementById("signLine");
const downloadBtn = document.getElementById("downloadBtn");
const confettiBtn = document.getElementById("confettiBtn");

// Render text
heroTitle.textContent = `For ${WIFE_NAME} ❤️`;
heroSub.textContent = `From ${YOUR_NAME} — with love.`;
loveNoteEl.textContent = LOVE_NOTE;
planBox.textContent = TONIGHT_PLAN;

// Render timeline
timelineEl.innerHTML = "";
for(const m of MOMENTS){
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `
    <div class="date">${m.date}</div>
    <div class="title">${m.title}</div>
    <div class="desc">${m.desc}</div>
  `;
  timelineEl.appendChild(div);
}

// Render gallery
galleryEl.innerHTML = "";
for(let i=1; i<=PHOTO_COUNT; i++){
  const img = document.createElement("img");
  img.className = "photo";
  img.src = `photos/${i}.jpg`;
  img.alt = `Photo ${i}`;
  img.onerror = () => { img.style.display = "none"; };
  galleryEl.appendChild(img);
}

// Modal open/close
function openModal(){
  dearLine.textContent = `Dear ${WIFE_NAME},`;
  letterText.textContent = LOVE_LETTER;
  signLine.textContent = `— ${YOUR_NAME}`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
}
function hideModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}
openLetterBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", hideModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) hideModal(); });
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") hideModal(); });

// Download love letter
downloadBtn.addEventListener("click", () => {
  const content = `Dear ${WIFE_NAME},\n\n${LOVE_LETTER}\n\n— ${YOUR_NAME}\n`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "love-letter.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
});

// Floating hearts
const bg = document.querySelector(".bg-hearts");
const heartChars = ["💖","💘","💝","💗","💓","💕","❤️"];
function spawnHeart(){
  const s = document.createElement("span");
  s.className = "heart";
  s.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
  s.style.left = Math.random()*100 + "vw";
  s.style.animationDuration = (6 + Math.random()*6) + "s";
  s.style.fontSize = (14 + Math.random()*22) + "px";
  bg.appendChild(s);
  setTimeout(() => s.remove(), 14000);
}
setInterval(spawnHeart, 350);

// Confetti (simple)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let confetti = [];
let confettiOn = false;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function burst(){
  const n = 180;
  for(let i=0;i<n;i++){
    confetti.push({
      x: canvas.width/2,
      y: canvas.height/3,
      vx: (Math.random()*8 - 4),
      vy: (Math.random()*-8 - 2),
      g: 0.18 + Math.random()*0.12,
      r: 2 + Math.random()*4,
      life: 120 + Math.random()*40
    });
  }
  confettiOn = true;
}
function step(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(confettiOn){
    confetti = confetti.filter(p => p.life > 0);
    for(const p of confetti){
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    if(confetti.length === 0) confettiOn = false;
  }
  requestAnimationFrame(step);
}
step();

confettiBtn.addEventListener("click", burst);
