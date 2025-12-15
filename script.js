const $ = (selector, scope = document) => scope.querySelector(selector);

const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === "a") {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

const anchorLinks = $$('a[href^="#"]');
anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return; // ignore empty hashes
        const targetEl = $(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => targetEl.setAttribute("tabindex", "-1"), 0);
        }
    });
});

const filterButtons = $$(".filter-btn");
const projectCards = $$(".project-card");
if (filterButtons.length) {
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Update active button UI
            filterButtons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");

            // Get filter criterion
            const filter = btn.getAttribute("data-filter");
            // Show all cards if 'all' is selected, otherwise match by data-category
            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                const show = filter === "all" ? true : category === filter;
                card.style.display = show ? "" : "none";
            });
        });
    });
}

// ===== FOOTER YEAR =====
const yearEl = $("#year");
if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}

// ===== CONTACT FORM (NO BACKEND) =====
const contactForm = $("#contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        if (!name || !email || !subject || !message) {
            alert("Please complete all required fields before sending your message.");
            return;
        }

        // Inform the user that no backend is currently connected
        alert("Thank you for your message. This demo form does not have a backend.\nPlease use the email link provided to reach out directly.");
        contactForm.reset();
    });
}

