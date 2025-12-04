async function loadConferences() {
    const ul = document.getElementById("conference-list");
    if (!ul) return;

    try {
        const resp = await fetch("data/conferences.json");
        const conferences = await resp.json();

        ul.innerHTML = ""; // clear any placeholder

        conferences.forEach(conf => {
            const li = document.createElement("li");
            li.className = "list-group-item shadow mb-2 rounded";

            li.innerHTML = `
                <a href="${conf.link}" target="_blank">${conf.title}</a>,
                ${conf.location}, ${conf.date}
            `;

            ul.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading conferences:", err);
        ul.innerHTML = `<p class="text-danger text-center">Unable to load conferences or workshops.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadConferences();
});
