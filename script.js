/* ==================================================
   PORTFOLIO DATA
   Single source of truth for every popup. Each category
   maps to a die-block; each item is one button in that
   category's list view, then its own detail view.

   To add a new piece of content: add an entry to the
   relevant category's `items` array. `github` and
   `attachments` are optional -- leave `github: null` if
   there's no repo for that item, and leave `attachments`
   as an empty array until a real file exists (e.g. a
   certificate PDF) to link to. Nothing renders for an
   empty attachments list, so there are no dead links on
   the live site while content is still being added.

   Example of adding a certificate later:
     attachments: [
         { label: "Certificate (PDF)", href: "certificates/cense.pdf" }
     ]
================================================== */

const portfolioData = {

    experience: {
        chipTag: "U1 // CPU CORE",
        title: "Experience",
        subtitle: "CPU CORE — Experience Engine",
        items: [
            {
                id: "iit-delhi",
                name: "IIT Delhi",
                fullTitle: "IIT Delhi Summer Research Internship",
                description: "Self-balancing robot, Kalman filtering, PID control and embedded communication.",
                github: null,
                attachments: []
            },
            {
                id: "acm-nitk",
                name: "ACM NITK",
                fullTitle: "ACM NITK",
                description: "FPGA projects, workshops and technical leadership.",
                github: null,
                attachments: []
            }
        ]
    },

    education: {
        chipTag: "U2 // MEMORY",
        title: "Education",
        subtitle: "MEMORY SUBSYSTEM — Knowledge Store",
        items: [
            {
                id: "nitk-surathkal",
                name: "NITK Surathkal",
                fullTitle: "NITK Surathkal",
                description: "B.Tech ECE + Minor in Computer Science. CGPA: 9.77.",
                github: null,
                attachments: []
            },
            {
                id: "cense",
                name: "CENSE Winter School",
                fullTitle: "CENSE Winter School",
                description: "Semiconductor fabrication, testing and packaging.",
                github: null,
                attachments: []
            },
            {
                id: "skills",
                name: "Technical Skills",
                fullTitle: "Technical Skills",
                description: "Verilog, C/C++, Python, ROS2, Linux, Cadence, OpenROAD.",
                github: null,
                attachments: []
            }
        ]
    },

    projects: {
        chipTag: "U3 // VLSI CLUSTER",
        title: "Projects",
        subtitle: "VLSI CLUSTER — Project Index",
        items: [
            {
                id: "rtl-gdsii",
                name: "RTL→GDSII",
                fullTitle: "RTL to GDSII Flow for PicoSOC + AES",
                description: "Complete ASIC implementation flow from RTL through final layout using OpenROAD.",
                github: "https://rohitlalu.github.io/",
                attachments: []
            },
            {
                id: "fir",
                name: "FIR",
                fullTitle: "Dual Edge 5-Tap FIR Filter",
                description: "High-performance FIR architecture utilizing dual-edge operation.",
                github: "https://rohitlalu.github.io/",
                attachments: []
            },
            {
                id: "dac",
                name: "DAC",
                fullTitle: "4-bit Segmented Current Steering DAC",
                description: "Mixed-signal DAC designed and simulated using LTSpice.",
                github: "https://rohitlalu.github.io/",
                attachments: []
            },
            {
                id: "cpu8",
                name: "8-bit CPU",
                fullTitle: "8-bit Processor on FPGA",
                description: "Custom ISA, assembler support and FPGA implementation.",
                github: "https://rohitlalu.github.io/",
                attachments: []
            }
        ]
    },

    competitions: {
        chipTag: "U4 // ACCELERATORS",
        title: "Competitions",
        subtitle: "ACCELERATOR CLUSTER — Competitions",
        items: [
            {
                id: "robocon",
                name: "Robocon",
                fullTitle: "Robocon Basketball Playing Robots",
                description: "Autonomous basketball robots for national robotics competition.",
                github: "https://rohitlalu.github.io/",
                attachments: []
            },
            {
                id: "cim-accelerator",
                name: "Samsung Chip Design Studio",
                fullTitle: "Samsung Chip Design Studio — Time Domain Compute-In-Memory Accelerator",
                description: "Research-oriented accelerator architecture exploration.",
                github: "https://rohitlalu.github.io/",
                attachments: []
            }
        ]
    }
};

const validSections = Object.keys(portfolioData);

/* ==================================================
   MODAL ELEMENTS + STATE
================================================== */

const backdrop = document.getElementById("modal-backdrop");
const panel = document.getElementById("modal-panel");
const modalTitle = document.getElementById("modal-title");
const modalSubtitle = document.getElementById("modal-subtitle");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

const dieBlocks = document.querySelectorAll(".die-block");
const traces = document.querySelectorAll(".trace");
const busTags = document.querySelectorAll(".bus-tag");

let currentCategory = null;
let currentItem = null;
let lastFocusedElement = null;

/* ==================================================
   ROUTING FABRIC HIGHLIGHTING
   Marks which die-block's popup is currently open and
   lights up its matching bus, so the wire itself shows
   what's driving the open popup.
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

    busTags.forEach(tag => {
        tag.classList.toggle(
            "active-tag",
            tag.id === `bustag-${sectionId}`
        );
    });
}

/* ==================================================
   RENDERING
================================================== */

function renderItemList(categoryId) {

    const category = portfolioData[categoryId];

    modalTitle.textContent = category.title;
    modalSubtitle.textContent = category.subtitle;

    const list = document.createElement("div");
    list.className = "item-list";

    category.items.forEach(item => {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "item-btn";
        btn.textContent = item.name;

        const meta = document.createElement("span");
        meta.textContent = item.fullTitle;
        btn.appendChild(meta);

        btn.addEventListener("click", () => {
            openItem(categoryId, item.id);
        });

        list.appendChild(btn);
    });

    modalBody.replaceChildren(list);
}

function renderItemDetail(categoryId, itemId) {

    const category = portfolioData[categoryId];
    const item = category.items.find(i => i.id === itemId);

    if (!item) {
        renderItemList(categoryId);
        return;
    }

    modalTitle.textContent = item.name;
    modalSubtitle.textContent = category.subtitle;

    const wrap = document.createElement("div");
    wrap.className = "item-detail";

    const back = document.createElement("button");
    back.type = "button";
    back.className = "modal-back-btn";
    back.textContent = `← Back to ${category.title}`;
    back.addEventListener("click", () => {
        currentItem = null;
        history.replaceState(null, null, `#${categoryId}`);
        renderItemList(categoryId);
        focusFirstInModal();
    });
    wrap.appendChild(back);

    const heading = document.createElement("h3");
    heading.textContent = item.fullTitle;
    wrap.appendChild(heading);

    const desc = document.createElement("p");
    desc.textContent = item.description;
    wrap.appendChild(desc);

    if (item.github || item.attachments.length > 0) {

        const links = document.createElement("div");
        links.className = "item-detail-links";

        if (item.github) {
            const a = document.createElement("a");
            a.className = "action-btn";
            a.href = item.github;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = "GitHub";
            links.appendChild(a);
        }

        item.attachments.forEach(att => {
            const a = document.createElement("a");
            a.className = "action-btn muted";
            a.href = att.href;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = att.label;
            links.appendChild(a);
        });

        wrap.appendChild(links);
    }

    modalBody.replaceChildren(wrap);
}

/* ==================================================
   OPEN / CLOSE / NAVIGATE
================================================== */

function openCategory(categoryId, triggerEl) {

    if (!portfolioData[categoryId]) {
        return;
    }

    lastFocusedElement = triggerEl || document.activeElement;

    currentCategory = categoryId;
    currentItem = null;

    renderItemList(categoryId);
    highlightActiveSection(categoryId);

    history.replaceState(null, null, `#${categoryId}`);

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";

    focusFirstInModal();

    document.addEventListener("keydown", handleModalKeydown);
}

function openItem(categoryId, itemId) {

    currentItem = itemId;

    renderItemDetail(categoryId, itemId);

    history.replaceState(null, null, `#${categoryId}/${itemId}`);

    focusFirstInModal();
}

function closeModal() {

    backdrop.classList.remove("open");
    document.body.style.overflow = "";

    highlightActiveSection(null);

    currentCategory = null;
    currentItem = null;

    history.replaceState(null, null, window.location.pathname + window.location.search);

    document.removeEventListener("keydown", handleModalKeydown);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

/* ==================================================
   ACCESSIBILITY: FOCUS HANDLING
================================================== */

function focusFirstInModal() {
    // Run after the DOM update so the freshly-rendered
    // content is actually focusable.
    requestAnimationFrame(() => {
        modalClose.focus();
    });
}

function getFocusableInModal() {
    return Array.from(
        panel.querySelectorAll(
            'button, a[href], [tabindex]:not([tabindex="-1"])'
        )
    ).filter(el => el.offsetParent !== null);
}

function handleModalKeydown(event) {

    if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
    }

    if (event.key !== "Tab") {
        return;
    }

    const focusable = getFocusableInModal();

    if (focusable.length === 0) {
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

modalClose.addEventListener("click", closeModal);

backdrop.addEventListener("click", event => {
    if (event.target === backdrop) {
        closeModal();
    }
});

/* ==================================================
   HASH ROUTING
   Supports #category and #category/item for direct,
   sharable links into a specific popup or item.
================================================== */

function openFromHash() {

    const hash = window.location.hash.replace("#", "");

    if (!hash) {
        return;
    }

    const [categoryId, itemId] = hash.split("/");

    if (!validSections.includes(categoryId)) {
        return;
    }

    openCategory(categoryId);

    if (itemId) {
        const exists = portfolioData[categoryId].items.some(i => i.id === itemId);
        if (exists) {
            openItem(categoryId, itemId);
        }
    }
}

window.addEventListener("load", openFromHash);

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
