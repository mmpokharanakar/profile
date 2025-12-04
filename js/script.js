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

async function initPage() {
    await loadHead();
    await includeHTML();  // navbar inserted here

    setActiveNav();

    const loadingEl = document.getElementById("loading");
    if (loadingEl) loadingEl.style.display = "none";
}


// Wait for DOM content to exist
document.addEventListener("DOMContentLoaded", initPage);
