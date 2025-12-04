async function loadOutreach() {
    const container = document.getElementById("outreach-list");
    if (!container) return;

    try {
        const resp = await fetch("data/outreach.json");
        const items = await resp.json();

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "card mb-4 shadow border-0";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text" style="margin-bottom: 4px;">
                        ${item.description}
                        <a href="${item.link}" target="_blank">${item.link}</a>.
                    </p>
                    <p class="text-muted" style="margin-bottom: 4px;">${item.year}</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading outreach:", err);
        container.innerHTML = `<p class="text-danger text-center">Unable to load outreach.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadOutreach();  // auto-load if outreach page
});
