async function loadHead() {
    const resp = await fetch("partials/head.html");
    const txt = await resp.text();
    document.head.insertAdjacentHTML("beforeend", txt);
}

async function includeHTML() {
    const includeEls = document.querySelectorAll("[data-include]");

    for (const el of includeEls) {
        const file = el.getAttribute("data-include");
        try {
            const resp = await fetch(file);
            if (!resp.ok) throw new Error("404");
            el.innerHTML = await resp.text();
        } catch (err) {
            el.innerHTML = "<p>Include not found: " + file + "</p>";
        }
    }
}

function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll("nav .nav-link");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

function handleNameVisibility() {
    const nameElement = document.querySelector('#about-section h1');
    const navbarName = document.getElementById('navbar-name');
    
    // If elements don't exist (not on homepage), exit
    if (!nameElement || !navbarName) return;
    
    function checkNameVisibility() {
        const nameRect = nameElement.getBoundingClientRect();
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        // Check if the name is completely out of view (above the viewport)
        // or partially hidden behind navbar (top is less than navbar height)
        const isNameVisible = nameRect.bottom > navbarHeight && nameRect.top < window.innerHeight;
        
        if (isNameVisible) {
            // Name is visible in viewport - hide navbar name
            navbarName.classList.add('d-none');
        } else {
            // Name is not visible - show navbar name
            navbarName.classList.remove('d-none');
        }
    }
    
    // Check on initial load
    checkNameVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkNameVisibility);
    
    // Check on window resize (navbar height might change)
    window.addEventListener('resize', checkNameVisibility);
}

function setupEducationScroll() {
    const btn = document.getElementById("scroll-to-education");
    const target = document.getElementById("education-section");

    if (!btn || !target) return;

    btn.addEventListener("click", () => {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

async function initPage() {
    await loadHead();
    await includeHTML();  // navbar inserted here

    setActiveNav();
    handleNameVisibility();
    setupEducationScroll();
    
    const loadingEl = document.getElementById("loading");
    if (loadingEl) loadingEl.style.display = "none";
}


// Wait for DOM content to exist
document.addEventListener("DOMContentLoaded", initPage);
