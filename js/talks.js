async function loadTalks() {
    const ul = document.getElementById("talks-list");
    if (!ul) return;

    try {
        const resp = await fetch("data/talks.json");
        if (!resp.ok) throw new Error("Failed to load talks.json");

        const talks = await resp.json();
        ul.innerHTML = ""; // clear placeholder

        talks.forEach(talk => {
            const li = document.createElement("li");
            li.className = "list-group-item shadow mb-2 rounded";

            // Parse event field:
            // supports [Text](URL) OR plain text
            let eventHTML = "";
            const mdLinkMatch = talk.event?.match(/^\[(.+?)\]\((.+?)\)$/);

            if (mdLinkMatch) {
                const text = mdLinkMatch[1];
                const url = mdLinkMatch[2];
                eventHTML = `<a href="${url}" target="_blank">${text}</a>`;
            } else {
                eventHTML = talk.event || "";
            }

            li.innerHTML = `
                ${talk.title},
                ${eventHTML},
                ${talk.date}
                <span>&nbsp;&nbsp;</span>
                ${
                    talk.slides_link
                        ? `<a href="${talk.slides_link}" target="_blank" class="btn btn-link p-0">
                                <i class="bi bi-filetype-pdf"></i>
                                Slides
                           </a>`
                        : ""
                }
            `;

            ul.appendChild(li);
        });

    } catch (err) {
        console.error("Error loading talks:", err);
        ul.innerHTML =
            `<p class="text-danger text-center">Unable to load talks.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadTalks);
