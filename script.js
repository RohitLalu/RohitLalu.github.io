/* ==================================================
   DIAGNOSTIC BANNER
   Registered before anything else so it catches any
   uncaught error from the rest of this file, anywhere
   on the page. If something breaks, this turns "the
   site is broken" into a specific, copyable error
   message instead of silence.
================================================== */

(function setupDiagnostics() {

    function showBanner(message) {

        let banner = document.getElementById("diagnostic-banner");

        if (!banner) {
            banner = document.createElement("div");
            banner.id = "diagnostic-banner";
            banner.style.cssText =
                "position:fixed;bottom:0;left:0;right:0;" +
                "background:#7f1d1d;color:#fecaca;" +
                "font-family:monospace;font-size:13px;line-height:1.5;" +
                "padding:10px 16px;z-index:99999;" +
                "white-space:pre-wrap;word-break:break-word;";
            document.body.appendChild(banner);
        }

        banner.textContent = "SOC_DEBUG // script error: " + message;
    }

    window.addEventListener("error", event => {
        const detail = event.error && event.error.stack
            ? event.error.stack.split("\n")[0]
            : event.message;
        showBanner(`${detail} (${event.filename || "script.js"}:${event.lineno})`);
    });

    window.addEventListener("unhandledrejection", event => {
        showBanner(`unhandled promise rejection: ${event.reason}`);
    });
})();

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
        chipTag: "Work I have done so far",
        title: "Experience",
        subtitle: "Experience",
        items: [
           {
                id: "iisc-blr",
                name: "IISc Bangalore",
                fullTitle: "IISc Research Internship",
                description: "FIA Attacks on AES and PQC schemes (MLKEM512) on ARM Cortex M4 (STM32F303)",
                github: "https://github.com/RohitLalu/fia_mlkem_cw",
                attachments: []
            },
            {
                id: "iit-delhi",
                name: "IIT Delhi",
                fullTitle: "IIT Delhi Summer Research Internship",
                description: "Self-balancing robot\nKalman filtering, PID control and embedded communication.",
                github: "https://github.com/RohitLalu/BalancingBot__",
                attachments: []
            },
            {
                id: "acm-nitk",
                name: "ACM NITK",
                fullTitle: "Head of Vidyut (electronics SIG under ACM NITK Chapter)",
                description: "Currently leading the electronics group under ACM NITK. Overseeing FPGA based projects, MCU and analog simulations",
                github: null,
                attachments: []
            },
           {
                id: "crn-nitk",
                name: "CSD Robocon NITK",
                fullTitle: "EC&P Lead of CSD Robocon NITK",
                description: "Leading the Electronics and Programming sub system to compete at the prestigious DD Robocon competition",
                github: "https://github.com/csd-robocon-nitk",
                attachments: []
            }
        ]
    },

    education: {
        chipTag: "Education",
        title: "Education",
        subtitle: "Alma Mater",
        items: [
            {
                id: "nitk-surathkal",
                name: "NITK Surathkal",
                fullTitle: "NITK Surathkal",
                description: "B.Tech ECE + Minor in Computer Science. CGPA (Major): 9.75",
                github: null,
                attachments: []
            },
            {
                id: "cense",
                name: "CENSE Winter School",
                fullTitle: "CENSE Winter School",
                description: "Attended a 2 week long school on Semiconductor fabrication, testing and packaging.",
                github: null,
                attachments: []
            },
            {
                id: "skills",
                name: "Technical Skills",
                fullTitle: "Technical Skills",
                description: "C, C++, Python, Verilog HDL, MATLAB \nCadence Virtuoso, TerosHDL, GTKWave, Yosys, ROS2, MicroROS, FreeRTOS, Simulink, Linux\nSoft Skills: Problem Solving, Teamwork and Collaboration , Communication, Marketing",
                github: null,
                attachments: []
            }
        ]
    },

    projects: {
        chipTag: "Projects",
        title: "Projects",
        subtitle: "Projects done so far",
        items: [
            {
                id: "rtl-gdsii",
                name: "RTL→GDSII",
                fullTitle: "RTL to GDSII Flow for PicoSOC + AES",
                description: "Complete ASIC implementation flow from RTL through final layout using OpenROAD.",
                github: "https://github.com/RohitLalu/CAD-Project-AES128-DMA-",
                attachments: []
            },
            {
                id: "fir",
                name: "FIR",
                fullTitle: "Dual Edge 5-Tap FIR Filter",
                description: "Moving average FIR filter design utilizing dual-edge operation.",
                github: "https://github.com/RohitLalu/dsp_core_compression",
                attachments: []
            },
            {
                id: "dac",
                name: "DAC",
                fullTitle: "4-bit Segmented Current Steering DAC",
                description: "Mixed-signal DAC designed and simulated using LTSpice.",
                github: null,
                attachments: []
            },
            {
                id: "cpu8",
                name: "8-bit CPU",
                fullTitle: "8-bit Processor on FPGA",
                description: "Custom ISA, assembler support and FPGA implementation.",
                github: "https://github.com/EVAditya/finalsnake",
                attachments: []
            }
        ]
    },

    competitions: {
        chipTag: "Competitions",
        title: "Competitions",
        subtitle: "Competitions attended so far",
        items: [
            {
                id: "robocon",
                name: "DD Robocon",
                fullTitle: "Basketball Playing Robots",
                description: "Autonomous basketball robots for national robotics competition.",
                github: "https://github.com/csd-robocon-nitk",
                attachments: []
            },
            {
                id: "cim-accelerator",
                name: "Samsung Chip Design Studio",
                fullTitle: "Samsung Chip Design Studio — Time Domain Compute-In-Memory Accelerator",
                description: "Research-oriented accelerator architecture exploration.",
                github: "https://github.com/RohitLalu/Time-Domain-Compute-In-Memory-Accelerator-using-Memristor-Arrays",
                attachments: []
            }
        ]
    }
};

const validSections = Object.keys(portfolioData);

/* ==================================================
   MODAL ELEMENTS + STATE
   Acquired defensively: if any expected element is
   missing from the HTML, this logs exactly which one
   instead of failing silently or throwing somewhere
   unrelated later on.
================================================== */

function getRequiredElement(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.error(`SOC_DEBUG: expected element #${id} was not found in the page.`);
    }
    return el;
}

const backdrop = getRequiredElement("modal-backdrop");
const panel = getRequiredElement("modal-panel");
const modalTitle = getRequiredElement("modal-title");
const modalSubtitle = getRequiredElement("modal-subtitle");
const modalBody = getRequiredElement("modal-body");
const modalClose = getRequiredElement("modal-close");

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

    if (modalBody) {
        modalBody.classList.remove("depth-2");
    }

    const list = document.createElement("div");
    list.className = `item-list cat-${categoryId}`;

    category.items.forEach(item => {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "item-btn";
        btn.textContent = item.name;

        const meta = document.createElement("span");
        meta.textContent = item.fullTitle;
        btn.appendChild(meta);

        btn.addEventListener("click", () => {
            openItem(categoryId, item.id, btn);
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

    if (modalBody) {
        modalBody.classList.add("depth-2");
    }

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
   Each entry point is wrapped so that a problem opening
   ONE popup can't take down the click-handling for every
   other block on the page -- the failure stays local and
   visible (via the diagnostic banner) instead of making
   the whole site look inert.
================================================== */

function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* ==================================================
   FLIP ZOOM TRANSITIONS
   Makes a popup appear to grow out of the exact block
   or button that was clicked, instead of just fading in
   centered on the screen -- "zoom into that region of
   the chip." Both directions are defensive by design:
   if there's no source rect, motion is reduced, or
   anything here throws, the modal still opens/closes
   normally via the plain CSS fade already in style.css.
   This is a non-essential layer on top of an already-
   working modal, never a requirement for it to function.
================================================== */

function flipEntrance(el, sourceRect) {

    try {

        if (!el || !sourceRect || prefersReducedMotion()) {
            return;
        }

        const finalRect = el.getBoundingClientRect();

        if (!finalRect.width || !finalRect.height) {
            return;
        }

        const scaleX = sourceRect.width / finalRect.width;
        const scaleY = sourceRect.height / finalRect.height;

        const dx = (sourceRect.left + sourceRect.width / 2) - (finalRect.left + finalRect.width / 2);
        const dy = (sourceRect.top + sourceRect.height / 2) - (finalRect.top + finalRect.height / 2);

        el.style.transition = "none";
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
        el.style.opacity = "0.5";

        // Force the browser to commit that instant jump before we
        // animate away from it, or the two style changes can get
        // coalesced into a single paint and the zoom never shows.
        el.getBoundingClientRect();

        requestAnimationFrame(() => {
            el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
            el.style.transform = "translate(0, 0) scale(1, 1)";
            el.style.opacity = "1";
        });

        setTimeout(() => {
            el.style.transition = "";
            el.style.transform = "";
            el.style.opacity = "";
        }, 480);

    } catch (err) {
        console.error("SOC_DEBUG: flipEntrance failed:", err);
    }
}

function flipExit(el, sourceRect, onComplete) {

    try {

        if (!el || !sourceRect || prefersReducedMotion()) {
            onComplete();
            return;
        }

        const currentRect = el.getBoundingClientRect();

        if (!currentRect.width || !currentRect.height) {
            onComplete();
            return;
        }

        const scaleX = sourceRect.width / currentRect.width;
        const scaleY = sourceRect.height / currentRect.height;

        const dx = (sourceRect.left + sourceRect.width / 2) - (currentRect.left + currentRect.width / 2);
        const dy = (sourceRect.top + sourceRect.height / 2) - (currentRect.top + currentRect.height / 2);

        el.style.transition = "transform 0.35s cubic-bezier(0.4, 0, 0.7, 0.4), opacity 0.3s ease";
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
        el.style.opacity = "0";

        setTimeout(() => {
            el.style.transition = "";
            el.style.transform = "";
            el.style.opacity = "";
            onComplete();
        }, 360);

    } catch (err) {
        console.error("SOC_DEBUG: flipExit failed:", err);
        onComplete();
    }
}

function openCategory(categoryId, triggerEl) {

    try {

        if (!portfolioData[categoryId]) {
            return;
        }

        if (!backdrop || !panel || !modalBody) {
            console.error("SOC_DEBUG: modal elements missing, cannot open popup.");
            return;
        }

        lastFocusedElement = triggerEl || document.activeElement;

        const sourceRect = triggerEl ? triggerEl.getBoundingClientRect() : null;

        currentCategory = categoryId;
        currentItem = null;

        renderItemList(categoryId);
        highlightActiveSection(categoryId);

        history.replaceState(null, null, `#${categoryId}`);

        backdrop.classList.add("open");
        document.body.style.overflow = "hidden";

        flipEntrance(panel, sourceRect);

        focusFirstInModal();

        document.addEventListener("keydown", handleModalKeydown);

    } catch (err) {
        console.error("SOC_DEBUG: openCategory failed:", err);
    }
}

function openItem(categoryId, itemId, triggerEl) {

    try {

        currentItem = itemId;

        const sourceRect = triggerEl ? triggerEl.getBoundingClientRect() : null;

        renderItemDetail(categoryId, itemId);

        history.replaceState(null, null, `#${categoryId}/${itemId}`);

        // Zoom the body content (not the whole panel) from the
        // clicked item-button -- the header stays put since it
        // didn't change, only the content beneath it did.
        flipEntrance(modalBody, sourceRect);

        focusFirstInModal();

    } catch (err) {
        console.error("SOC_DEBUG: openItem failed:", err);
    }
}

function closeModal() {

    try {

        if (!backdrop) {
            return;
        }

        const sourceRect = (lastFocusedElement && typeof lastFocusedElement.getBoundingClientRect === "function")
            ? lastFocusedElement.getBoundingClientRect()
            : null;

        document.removeEventListener("keydown", handleModalKeydown);

        // Backdrop dim fades on its own existing CSS transition while
        // the panel runs its shrink-into-origin animation at the same
        // time, not after -- otherwise the dim outlasts the popup and
        // the close looks like two separate things instead of one.
        backdrop.classList.remove("open");
        document.body.style.overflow = "";

        highlightActiveSection(null);

        currentCategory = null;
        currentItem = null;

        history.replaceState(null, null, window.location.pathname + window.location.search);

        const restoreFocus = () => {
            if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
                lastFocusedElement.focus();
            }
        };

        flipExit(panel, sourceRect, restoreFocus);

    } catch (err) {
        console.error("SOC_DEBUG: closeModal failed:", err);
    }
}

/* ==================================================
   ACCESSIBILITY: FOCUS HANDLING
================================================== */

function focusFirstInModal() {
    requestAnimationFrame(() => {
        if (modalClose) {
            modalClose.focus();
        }
    });
}

function getFocusableInModal() {
    if (!panel) {
        return [];
    }
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

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

if (backdrop) {
    backdrop.addEventListener("click", event => {
        if (event.target === backdrop) {
            closeModal();
        }
    });
}

/* ==================================================
   HASH ROUTING
   Supports #category and #category/item for direct,
   sharable links into a specific popup or item.
================================================== */

function openFromHash() {

    try {

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

    } catch (err) {
        console.error("SOC_DEBUG: openFromHash failed:", err);
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

  try {

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

  } catch (err) {
    console.error("SOC_DEBUG: scan chain setup failed:", err);
  }
})();
