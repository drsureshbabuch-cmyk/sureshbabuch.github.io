/* ================= PUBLICATIONS ================= */

const papers = document.getElementById("papers");
const search = document.getElementById("search");

function renderPublications(query = "") {

    const q = query.toLowerCase();

    const results = publications.filter(p =>
        p.join(" ").toLowerCase().includes(q)
    );

    papers.innerHTML = results.map((p, i) => `
        <article class="paper">
            <h3>
                ${i + 1}. ${p[0]}
                ${p[2] ? `<span class="index">${p[2]}</span>` : ""}
            </h3>
            <div class="paper-meta">
                ${p[1]} • ${p[3]}
            </div>
        </article>
    `).join("");

    if (!results.length) {
        papers.innerHTML = "<p>No publications found.</p>";
    }
}

renderPublications();

search.addEventListener("input", e => {
    renderPublications(e.target.value);
});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


/* ================= PHOTO ZOOM ================= */

const zoomPhoto = document.getElementById("zoomPhoto");
const photoModal = document.getElementById("photoModal");
const closePhoto = document.getElementById("closePhoto");

zoomPhoto.addEventListener("click", () => {
    photoModal.classList.add("show");
});

closePhoto.addEventListener("click", () => {
    photoModal.classList.remove("show");
});

photoModal.addEventListener("click", e => {
    if (e.target === photoModal) {
        photoModal.classList.remove("show");
    }
});


/* ================= EVENT BANNER ================= */

const track = document.getElementById("bannerTrack");
const slides = document.querySelectorAll(".banner-slide");
const dotsBox = document.getElementById("bannerDots");
const nextBtn = document.getElementById("nextBanner");
const prevBtn = document.getElementById("prevBanner");

let currentSlide = 0;
let autoRoll;

slides.forEach((_, i) => {

    const dot = document.createElement("button");

    dot.className = "banner-dot";

    dot.addEventListener("click", () => {
        currentSlide = i;
        moveBanner();
        restartAutoRoll();
    });

    dotsBox.appendChild(dot);
});


const dots = document.querySelectorAll(".banner-dot");


function moveBanner() {

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle(
            "active",
            i === currentSlide
        );
    });
}


function nextSlide() {

    currentSlide =
        (currentSlide + 1) % slides.length;

    moveBanner();
}


function previousSlide() {

    currentSlide =
        (currentSlide - 1 + slides.length)
        % slides.length;

    moveBanner();
}


nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoRoll();
});

prevBtn.addEventListener("click", () => {
    previousSlide();
    restartAutoRoll();
});


function startAutoRoll() {

    autoRoll = setInterval(
        nextSlide,
        4500
    );

}


function restartAutoRoll() {

    clearInterval(autoRoll);

    startAutoRoll();

}


moveBanner();
startAutoRoll();


/* Pause automatic rollout when mouse is over banner */

const eventBanner =
    document.getElementById("eventBanner");

eventBanner.addEventListener(
    "mouseenter",
    () => clearInterval(autoRoll)
);

eventBanner.addEventListener(
    "mouseleave",
    startAutoRoll
);


/* ================= EVENT PHOTO UPLOAD/PREVIEW ================= */

const eventUpload =
    document.getElementById("eventUpload");

const eventGallery =
    document.getElementById("eventGallery");


eventUpload.addEventListener(
    "change",
    function () {

        const files =
            Array.from(this.files);

        eventGallery.innerHTML = "";

        files.forEach(file => {

            if (!file.type.startsWith("image/")) {
                return;
            }

            const reader =
                new FileReader();

            reader.onload = e => {

                const item =
                    document.createElement("div");

                item.className =
                    "event-gallery-item";

                item.innerHTML = `
                    <img
                        src="${e.target.result}"
                        alt="${file.name}">

                    <span>
                        ${file.name}
                    </span>
                `;

                eventGallery.appendChild(item);
            };

            reader.readAsDataURL(file);

        });

    }
);


/* ================= YEAR ================= */

document.getElementById("year")
    .textContent = new Date().getFullYear();
