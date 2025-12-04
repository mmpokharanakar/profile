async function loadResearchPapers() {
    const container = document.getElementById("research-list");
    if (!container) return;

    try {
        const response = await fetch("data/research.bib");
        // if file not found, throw error
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const bibText = await response.text();
        
        // Parse BibTeX → JSON
        const entries = BibtexParser.parseToJSON(bibText);

        let html = "";

        entries.forEach(entry => {
            // bibtex-js-parser gives flat fields:
            const authors = entry.author || "";
            const title = entry.title || "";
            const year = entry.year || "";

            // prefer URL, fallback to arXiv eprint
            const url =
                entry.url ||
                (entry.eprint ? `https://arxiv.org/abs/${entry.eprint}` : "");

            html += `
                <div class="bg-light rounded shadow p-2 mb-2">
                    <p class="fs-5">
                        ${authors}, <i>${title}</i>${url ? `, Available at <a href="${url}" target="_blank">${url}</a>` : ""}${year ? `, ${year}` : ""}.
                    </p>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (err) {
        console.error("Error loading BibTeX:", err);
        container.innerHTML = `<p class="text-danger text-center">Unable to load research papers.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("research-list")) {
        loadResearchPapers();
    }
});