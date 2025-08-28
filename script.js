// === LOADING SCREEN ===
window.addEventListener("load", () => {
  const loading = document.querySelector(".loading-screen");
  if (loading) {
    loading.classList.add("hidden"); // sahifa yuklangach loading o‘chadi
  }
});

// === NAVBAR SCROLL EFFEKTI ===
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// === HAMBURGER MENYU ===
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Menyu item bosilganda menyuni yopish (mobil versiyada)
document.querySelectorAll(".nav-links li a").forEach(link =>
  link.addEventListener("click", () => {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
  })
);

// === TYPING EFFEKT (hero sarlavha uchun) ===
const typingText = document.querySelector(".typing-text");
if (typingText) {
  const texts = ["Innovatsiya", "Texnologiya", "Kelajak"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    let currentText = texts[textIndex];
    typingText.textContent = isDeleting
      ? currentText.substring(0, charIndex--)
      : currentText.substring(0, charIndex++);

    if (!isDeleting && charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(type, isDeleting ? 80 : 120);
  }

  type();
}

// === SCROLL REVEAL ANIMATSIYASI (IntersectionObserver bilan) ===
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.2 } // 20% ko‘rinsa active bo‘ladi
);

sections.forEach(section => observer.observe(section));

// === DARK MODE TOGGLE ===
const darkToggle = document.querySelector(".dark-toggle");
darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});

// Dark mode xotirada saqlash
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// === SCROLL PROGRESS BAR ===
const progressBar = document.querySelector(".progress-bar");
window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.scrollHeight - window.innerHeight;
  let scrollPercent = (scrollTop / docHeight) * 100;
  if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
  }
});

// === BACK TO TOP BUTTON ===
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop?.classList.add("show");
  } else {
    backToTop?.classList.remove("show");
  }
});
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === SECTION SCROLLING / NAVIGATION ===
const navLinks = document.querySelectorAll("nav ul li a");

// Bosilganda kerakli sectionga smooth scroll
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll qilganda active nav item yangilansin
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
});

const rows = document.querySelectorAll('.carousel-row');

rows.forEach(row => {
  row.addEventListener('mouseenter', () => row.style.animationPlayState = 'paused');
  row.addEventListener('mouseleave', () => row.style.animationPlayState = 'running');
});

const cube = document.querySelector('.contact-cube');
let autoRotate = true;
let isDragging = false;
let lastX, lastY;
let rotateX = 0, rotateY = 0;

// Auto-rotate
function animateCube() {
  if(autoRotate && !isDragging){
    rotateX += 0.2;
    rotateY += 0.3;
    cube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  requestAnimationFrame(animateCube);
}
animateCube();

// Mouse drag
cube.addEventListener('mousedown', e => {
  isDragging = true;
  autoRotate = false;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener('mousemove', e => {
  if(isDragging){
    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;
    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;
    cube.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

document.addEventListener('mouseup', () => {
  if(isDragging){
    isDragging = false;
    autoRotate = true;
  }
});

const profileCard = document.querySelector('.profile-card');
const glowRing = document.querySelector('.glow-ring');

document.addEventListener('mousemove', e => {
  const rect = profileCard.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const inProximity = mouseX > rect.left - 50 && mouseX < rect.right + 50 &&
                      mouseY > rect.top - 50 && mouseY < rect.bottom + 50;

  if(inProximity){
    profileCard.style.transform = 'scale(1.12)';
    glowRing.style.boxShadow = '0 0 50px rgba(255,140,0,1), 0 0 70px rgba(255,140,0,0.7), 0 0 90px rgba(255,140,0,0.5)';
  } else {
    profileCard.style.transform = 'scale(1)';
    glowRing.style.boxShadow = '0 0 20px rgba(255,140,0,0.6), 0 0 40px rgba(255,140,0,0.4), 0 0 60px rgba(255,140,0,0.2)';
  }
});

const canvas = document.getElementById('dust-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// kursor koordinatalari
let mouse = { x: width/2, y: height/2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// scroll effekti uchun offset
let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});

const colors = ['rgba(255,215,0,0.5)', 'rgba(255,240,150,0.4)', 'rgba(0,0,0,0.3)'];

const particles = [];
const particleCount = 600; // juda ko'p, fonni to'liq qoplaydi
for(let i=0;i<particleCount;i++){
  particles.push({
    x: Math.random()*width,
    y: Math.random()*height,
    r: Math.random()*1.2 + 0.3, // juda mayda
    dx: (Math.random()-0.5)*0.15, // sekin harakat
    dy: (Math.random()-0.5)*0.15,
    color: colors[Math.floor(Math.random()*colors.length)],
    alpha: Math.random()*0.5 + 0.2
  });
}

function animate(){
  ctx.clearRect(0,0,width,height);
  for(let p of particles){
    // kursor effekt
    let dx = p.x - mouse.x;
    let dy = p.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 100){ // kursor yaqinida sekin qochish
      let angle = Math.atan2(dy, dx);
      p.x += Math.cos(angle) * 0.5;
      p.y += Math.sin(angle) * 0.5;
    } else {
      p.x += p.dx;
      p.y += p.dy;
    }

    // scroll effekti
    p.y += scrollY * 0.0005; // scroll bilan birga siljish

    // ekran chekkasida aylanish
    if(p.x<0) p.x = width;
    if(p.x>width) p.x = 0;
    if(p.y<0) p.y = height;
    if(p.y>height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.color.replace('0.5', p.alpha); // random alpha
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

animate();


const halo = document.getElementById('cursorHalo');

window.addEventListener('mousemove', e => {
  halo.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

