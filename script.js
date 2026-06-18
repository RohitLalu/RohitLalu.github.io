/* ==================================================
   SOC SECTION SWITCHING
================================================== */

const contentViews =
    document.querySelectorAll(".content-view");

const consoleTitle =
    document.getElementById("console-title");

function openSection(sectionId) {

    contentViews.forEach(view => {
        view.classList.remove("active");
    });

    const target =
        document.getElementById(sectionId);

    if (target) {
        target.classList.add("active");
    }

    updateConsoleTitle(sectionId);

    history.replaceState(
        null,
        null,
        `#${sectionId}`
    );
}

/* ==================================================
   CONSOLE TITLE UPDATE
================================================== */

function updateConsoleTitle(sectionId) {

    const titles = {

        projects:
            "PROJECT CLUSTER",

        experience:
            "CPU CORE",

        education:
            "MEMORY SUBSYSTEM",

        competitions:
            "ACCELERATOR CLUSTER"
    };

    consoleTitle.textContent =
        titles[sectionId] || "SOC_DEBUG";
}

/* ==================================================
   PROJECT TAB SWITCHING
================================================== */

function showPanel(id, button) {

    const parent =
        button.closest(".content-view");

    parent
        .querySelectorAll(".content-panel")
        .forEach(panel =>
            panel.classList.remove("active")
        );

    parent
        .querySelectorAll(".nav-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    const target =
        document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

    button.classList.add("active");
}

/* ==================================================
   HASH ROUTING
================================================== */

window.addEventListener("load", () => {

    const hash =
        window.location.hash.replace("#", "");

    const validSections = [

        "projects",
        "experience",
        "education",
        "competitions"
    ];

    if (
        hash &&
        validSections.includes(hash)
    ) {
        openSection(hash);
    }
});
