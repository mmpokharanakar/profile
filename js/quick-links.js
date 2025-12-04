async function loadQuickLinks() {
    const ul = document.getElementById("quick-links-list");
    if (!ul) return;

    try {
        const resp = await fetch("data/quick-links.json");
        const links = await resp.json();

        ul.innerHTML = "";

        links.forEach(item => {
            const li = document.createElement("li");
            li.className = "list-group-item shadow mb-2 rounded";

            li.innerHTML = `
                <a href="${item.link}" target="_blank">
                    <i class="bi bi-link"></i>
                </a>
                ${item.name}
            `;

            ul.appendChild(li);
        });

    } catch (err) {
        console.error("Error loading quick links:", err);
        ul.innerHTML = `<p class="text-danger text-center">Unable to load quick links.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadQuickLinks);
