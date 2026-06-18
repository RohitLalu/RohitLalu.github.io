// ===============================
// Modal Controls
// ===============================
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove("show");

    const openModals = document.querySelectorAll(".modal.show");

    if (openModals.length === 0) {
        document.body.style.overflow = "";
    }
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
        e.target.classList.remove("show");
        document.body.style.overflow = "";
    }
});

// ESC Key Support
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach((modal) => {
            modal.classList.remove("show");
        });

        document.body.style.overflow = "";
    }
});

// ===============================
// Tab / Panel Navigation
// ===============================
function showPanel(id, button) {

    const container = button.closest(".die-shot");

    if (!container) return;

    container.querySelectorAll(".content-panel")
        .forEach(panel => panel.classList.remove("active"));

    container.querySelectorAll(".nav-btn")
        .forEach(btn => btn.classList.remove("active"));

    const target =
        container.querySelector(`#${id}`) ||
        document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

    button.classList.add("active");

    // Deep-link support
    history.replaceState(null, null, `#${id}`);
}

// Open panel from URL hash
window.addEventListener("load", () => {

    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    const panel = document.getElementById(hash);

    if (panel) {
        panel.classList.add("active");
    }
});

// ===============================
// Animated Hardware Background
// ===============================
const canvas = document.getElementById("network-canvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let nodes = [];

    const mouse = {
        x: null,
        y: null
    };

    function resizeCanvas() {

        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        nodes = [];

        const nodeCount =
            Math.floor((width * height) / 18000);

        for (let i = 0; i < nodeCount; i++) {

            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            });
        }
    }

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    function drawNetwork() {

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {

            const n1 = nodes[i];

            n1.x += n1.vx;
            n1.y += n1.vy;

            if (n1.x < 0 || n1.x > width) n1.vx *= -1;
            if (n1.y < 0 || n1.y > height) n1.vy *= -1;

            for (let j = i + 1; j < nodes.length; j++) {

                const n2 = nodes[j];

                const dx = n1.x - n2.x;
                const dy = n1.y - n2.y;

                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {

                    const alpha = 1 - dist / 130;

                    ctx.beginPath();

                    // Orthogonal PCB-style routing
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n1.x, n2.y);
                    ctx.lineTo(n2.x, n2.y);

                    ctx.strokeStyle =
                        `rgba(0,210,255,${alpha * 0.45})`;

                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            ctx.beginPath();
            ctx.arc(n1.x, n1.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#1e90ff";
            ctx.fill();
        }

        requestAnimationFrame(drawNetwork);
    }

    resizeCanvas();
    drawNetwork();
}
