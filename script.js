/* ==================================================
   SOC SECTION SWITCHING
================================================== */

const contentViews =
    document.querySelectorAll(".content-view");

const consoleTitle =
    document.getElementById("console-title");

const dieBlocks =
    document.querySelectorAll(".die-block");

const traces =
    document.querySelectorAll(".trace");

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

    highlightActiveSection(sectionId);

    history.replaceState(
        null,
        null,
        `#${sectionId}`
    );
}

/* ==================================================
   ROUTING FABRIC HIGHLIGHTING
   Marks which die-block is currently selected and
   lights up its matching trace into the NoC, so the
   wire itself shows what's driving the console below.
================================================== */

function highlightActiveSection(sectionId) {

    dieBlocks.forEach(block => {
        block.classList.toggle(
            "selected",
            block.dataset.section === sectionId
        );
    });

    traces.forEach(trace => {
        trace.classList.toggle(
            "active-trace",
            trace.id === `trace-${sectionId}`
        );
    });
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
    } else {
        // No hash on first visit: the console already
        // defaults to "projects" in the static markup,
        // so just sync the die-block / trace highlight
        // to match, without rewriting the URL.
        highlightActiveSection("projects");
    }
});

/* ==================================================
   SCAN CHAIN TRACE ANIMATION
   Repurposes the pad-ring boundary as a literal scan
   chain: a faint traveling test-vector pulse looping
   the package perimeter, the way a real DFT scan chain
   shifts a bit through peripheral flip-flops.
================================================== */

(function setupScanChain() {

    const canvas =
        document.getElementById("network-canvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    const padRing =
        document.querySelector(".pad-ring");

    if (!padRing) {
        return;
    }

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    let dpr = window.devicePixelRatio || 1;
    let box = { width: 0, height: 0 };
    let t = 0;

    function resize() {

        const r = padRing.getBoundingClientRect();
        const margin = 14;

        box = {
            width: r.width + margin * 2,
            height: r.height + margin * 2
        };

        const x = r.left + window.scrollX - margin;
        const y = r.top + window.scrollY - margin;

        dpr = window.devicePixelRatio || 1;

        canvas.style.left = `${x}px`;
        canvas.style.top = `${y}px`;
        canvas.style.width = `${box.width}px`;
        canvas.style.height = `${box.height}px`;

        canvas.width = box.width * dpr;
        canvas.height = box.height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function perimeterPoint(p) {

        const w = box.width;
        const h = box.height;
        const perimeter = 2 * (w + h);

        let d = p * perimeter;

        if (d < w) {
            return { x: d, y: 0 };
        }
        d -= w;

        if (d < h) {
            return { x: w, y: d };
        }
        d -= h;

        if (d < w) {
            return { x: w - d, y: h };
        }
        d -= w;

        return { x: 0, y: h - d };
    }

    function draw() {

        ctx.clearRect(0, 0, box.width, box.height);

        if (!box.width || !box.height) {
            return;
        }

        ctx.save();
        ctx.strokeStyle = "rgba(34,211,238,0.15)";
        ctx.lineWidth = 1;
        ctx.strokeRect(
            0.5, 0.5,
            box.width - 1, box.height - 1
        );
        ctx.restore();

        const trailSteps = 16;
        const trailSpread = 0.045;

        for (let i = 0; i < trailSteps; i++) {

            const p =
                (((t - (i / trailSteps) * trailSpread) % 1) + 1) % 1;

            const point = perimeterPoint(p);
            const alpha = (1 - i / trailSteps) * 0.85;

            ctx.beginPath();
            ctx.fillStyle = `rgba(0,210,255,${alpha})`;
            ctx.shadowColor = "rgba(0,210,255,0.9)";
            ctx.shadowBlur = 8;
            ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function loop() {

        t = (t + 0.0009) % 1;

        draw();

        requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);

    window.addEventListener("load", () => {

        resize();

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(resize);
        }

        if (!reduceMotion) {
            requestAnimationFrame(loop);
        } else {
            draw();
        }
    });
})();
