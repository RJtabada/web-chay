// ---- EDIT YOUR WORKS HERE ----
// Each "id" is the Google Drive file ID taken from the share link.
const works = [
  {
    name: "Poster",
    desc: "A bold visual poster designed to grab attention and tell a story at a glance.",
    id: "1zggBnuCGFHHURqlxueyqkg4xDpBmDjFs",
    link: "https://drive.google.com/file/d/1zggBnuCGFHHURqlxueyqkg4xDpBmDjFs/view?usp=sharing",
  },
  {
    name: "Sunset",
    desc: "A warm, atmospheric piece capturing the colors of golden hour.",
    id: "1hJcgWLmERt1y55aXOpUwvohDVf45owJm",
    link: "https://drive.google.com/file/d/1hJcgWLmERt1y55aXOpUwvohDVf45owJm/view?usp=sharing",
  },
  {
    name: "Resume",
    desc: "A clean, professional resume layout that puts skills and experience first.",
    id: "1qxHV917_uIKzgYiCXN4nY2LKgo5xQ__b",
    link: "https://drive.google.com/file/d/1qxHV917_uIKzgYiCXN4nY2LKgo5xQ__b/view?usp=sharing",
  },
  {
    name: "Letter",
    desc: "A thoughtfully written letter with a polished, personal layout.",
    id: "1HeQnSmQreaJo15GrVWGzANePfNXxfDwS",
    link: "https://drive.google.com/file/d/1HeQnSmQreaJo15GrVWGzANePfNXxfDwS/view?usp=sharing",
  },
  {
    name: "Brochure",
    desc: "An organized, easy-to-read brochure that presents information clearly.",
    id: "1xXEXz9AfpgHeYT3mpL3thKE6UsQKEC8W",
    link: "https://drive.google.com/file/d/1xXEXz9AfpgHeYT3mpL3thKE6UsQKEC8W/view?usp=sharing",
  },
  {
    name: "Logo",
    desc: "A custom logo built to be simple, memorable and easy to recognize.",
    id: "1h-eQYITxn4eadXTR6ieef65NmGl34Vik",
    link: "https://drive.google.com/file/d/1h-eQYITxn4eadXTR6ieef65NmGl34Vik/view?usp=sharing",
  },
  {
    name: "30 Sec Video",
    desc: "A short 30-second video with motion, music and quick storytelling.",
    id: "1pLqj3SXfYrdxfa0BQGkv37w-EyCBUhTW",
    link: "https://drive.google.com/file/d/1pLqj3SXfYrdxfa0BQGkv37w-EyCBUhTW/view?usp=drivesdk",
  },
];

// ---- Render works ----
const grid = document.getElementById("worksGrid");
const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2];

works.forEach((w, i) => {
  const a = document.createElement("a");
  a.className = "work reveal";
  a.href = w.link;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.style.setProperty("--r", tilts[i % tilts.length] + "deg");
  a.setAttribute("aria-label", "Open " + w.name);

  const imgWrap = document.createElement("div");
  imgWrap.className = "work-img";

  const img = document.createElement("img");
  img.src = `https://drive.google.com/thumbnail?id=${w.id}&sz=w800`;
  img.alt = w.name;
  img.loading = "lazy";
  img.referrerPolicy = "no-referrer";
  img.onerror = () => {
    img.remove();
    const f = document.createElement("div");
    f.className = "fallback";
    f.textContent = w.name;
    imgWrap.appendChild(f);
  };
  imgWrap.appendChild(img);

  a.appendChild(imgWrap);
  a.insertAdjacentHTML(
    "beforeend",
    `<h3>${w.name}</h3><p>${w.desc}</p><span class="open">Open &rarr;</span>`
  );
  grid.appendChild(a);
});

// ---- Marquee ----
const marquee = document.getElementById("marquee");
const phrase = "My activities, projects and works";
marquee.innerHTML = Array(16).fill(`<span>${phrase}</span>`).join("");

// ---- Mobile nav ----
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((l) =>
  l.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ---- Scroll reveal ----
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

// ---- Hanging cards (decoration only) ----
const hang = document.getElementById("hang");
const hangColors = ["#d9cfc0", "#c9dffb", "#fbf6b5", "#f1e6dc"];
const hangTilts = [-3, 2, -1.5, 3, -2.5, 1.5, -2];
works.forEach((w, i) => {
  const c = document.createElement("div");
  c.className = "hang-card";
  c.style.setProperty("--bg", hangColors[i % hangColors.length]);
  c.style.setProperty("--r", hangTilts[i % hangTilts.length] + "deg");
  c.style.setProperty("--d", (i * 0.35) + "s");
  c.innerHTML = `<span class="hang-icon">&#10022;</span><p>${w.name}</p>`;
  hang.appendChild(c);
});
