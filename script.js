document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Custom Cursor & Hover Effects
    const cursor = document.getElementById("custom-cursor");
    const cursorLabel = document.getElementById("cursor-label");

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Hover elements with custom cursor labels
    document.querySelectorAll("[data-cursor-text]").forEach(el => {
        el.addEventListener("mouseenter", () => {
            const text = el.getAttribute("data-cursor-text");
            cursorLabel.innerText = text;
            cursorLabel.style.opacity = "1";
            gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(197, 168, 128, 0.2)" });
        });
        el.addEventListener("mouseleave", () => {
            cursorLabel.style.opacity = "0";
            gsap.to(cursor, { scale: 1, backgroundColor: "transparent" });
        });
    });

    // 2. Navigation Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const menuCurtain = document.getElementById("menu-curtain");

    function toggleMenu() {
        menuCurtain.classList.toggle("open");
        document.body.classList.toggle("overflow-hidden");
    }

    if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
    if (menuClose) menuClose.addEventListener("click", toggleMenu);

    document.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", () => {
            toggleMenu();
        });
    });

    // 3. Frosted Window Canvas Wipe (Hero)
    const canvas = document.getElementById("frost-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initFrost();
        });

        function initFrost() {
            ctx.fillStyle = "#1a1a1a";
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#2c2c2c";
            // Draw frost texture representation
            ctx.font = "20px sans-serif";
            ctx.globalAlpha = 0.15;
            for (let i = 0; i < width; i += 40) {
                for (let j = 0; j < height; j += 40) {
                    ctx.fillText("✦", i, j);
                }
            }
            ctx.globalAlpha = 1.0;
        }
        initFrost();

        let isDrawing = false;

        function wipeFrost(x, y) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 90, 0, Math.PI * 2);
            ctx.fill();
        }

        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            wipeFrost(e.clientX - rect.left, e.clientY - rect.top);
        });

        canvas.addEventListener("touchmove", (e) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            wipeFrost(touch.clientX - rect.left, touch.clientY - rect.top);
        }, { passive: true });
    }

    // 4. GSAP Hero Cinematic Sequence & Animations
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: true
        }
    });

    heroTl.to(".hero-title", { scale: 1.1, letterSpacing: "0.25em", opacity: 0.8, ease: "power1.out" })
          .to(".hero-subtitle", { opacity: 1, y: -20 }, 0)
          .to(".hero-arch-container", { opacity: 1, y: 0, scale: 1.05, ease: "power2.out" }, 0.2);

    // 5. Story Statement Animation
    gsap.from(".word-rip", {
        scrollTrigger: {
            trigger: "#story",
            start: "top 80%",
            end: "top 30%",
            scrub: true
        },
        color: "#c5a880",
        ease: "none"
    });

    // 6. Signatures Horizontal Scroll
    const sigTrack = document.getElementById("signatures-track");
    if (sigTrack) {
        gsap.to(sigTrack, {
            x: () => -(sigTrack.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#signatures",
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });
    }

    // 7. Anatomy of Perfection (Exploded Plate)
    const anatomyTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#anatomy",
            start: "top top",
            end: "+=2500",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    anatomyTl.to("#layer-pasta", { scale: 1.3, y: -40, ease: "power1.out" })
             .to("#layer-tomatoes", { opacity: 1, x: -100, y: -80, ease: "power1.out" }, 0.2)
             .to("#layer-cheese", { opacity: 1, x: 100, y: 80, ease: "power1.out" }, 0.2)
             .to("#layer-oil", { opacity: 1, x: 100, y: -80, ease: "power1.out" }, 0.2);

    // 8. Menu Wine Pairings Toggle
    const pairingBtn = document.getElementById("toggle-pairings");
    if (pairingBtn) {
        pairingBtn.addEventListener("click", () => {
            document.querySelectorAll(".pairing-note").forEach(note => {
                note.classList.toggle("hidden");
            });
            pairingBtn.textContent = pairingBtn.textContent.includes("Show") ? "Hide Wine Pairings" : "Show Wine Pairings";
        });
    }

    // 9. Bar & Drinks Cocktail Fill Animation
    const barTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#bar",
            start: "top top",
            end: "+=2000",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    barTl.to("#cocktail-liquid", { height: "85%", ease: "power1.out" });

    // 10. Experience Timeline Animation
    const expTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#experience",
            start: "top top",
            end: "+=2500",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    expTl.to("#experience-img", { scale: 1.15, filter: "brightness(0.9)", ease: "none" })
         .call(() => {
             document.getElementById("experience-time").innerText = "8:30 PM · Primi & Main Seating";
             document.getElementById("experience-desc").innerText = "Candlelight flickers across dark walnut tables as handmade pasta flows from the kitchen pass.";
         }, null, 0.5);

    // 11. Reservation Party Size Selector
    const partyBtns = document.querySelectorAll(".party-btn");
    partyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            partyBtns.forEach(b => b.classList.remove("bg-[#c5a880]", "text-black", "border-[#c5a880]"));
            btn.classList.add("bg-[#c5a880]", "text-black", "border-[#c5a880]");
        });
    });

    // 12. Contact Phone Copy Interaction
    const phoneEl = document.getElementById("contact-phone");
    if (phoneEl) {
        phoneEl.addEventListener("click", () => {
            navigator.clipboard.writeText("+16045556436");
            const originalText = phoneEl.innerText;
            phoneEl.innerText = "Copiato ✓";
            setTimeout(() => {
                phoneEl.innerText = originalText;
            }, 2000);
        });
    }

    // 13. Back to Top Scroll Rewind
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 14. Golden Strand SVG Scroll Progress Animation
    gsap.to("#strand-path", {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});