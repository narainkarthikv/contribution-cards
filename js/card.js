// Card.js - Enhanced Card component for Contribution Cards
// Optimized with platform-based icon detection, smoother UX, and accessibility
class Card {
  constructor(data) {
    this.title = data.title || "";
    this.subtitle = data.subtitle || "";
    this.text = data.text || "";
    this.links = Array.isArray(data.links) ? data.links : [];
    this.studyLinks = Array.isArray(data.studyLinks) ? data.studyLinks : [];
    this.updatedAt = data.updatedAt || "";
  }

  #sanitizeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ✅ Optimized universal social media icon logic
  #getIconClass(label = "", url = "") {
    const text = `${label} ${url}`.toLowerCase().trim();

    const platformIcons = [
      { key: "github", icon: "fab fa-github" },
      { key: "linkedin", icon: "fab fa-linkedin" },
      { key: "twitter", icon: "fab fa-twitter" },
      { key: "x.com", icon: "fab fa-twitter" },
      { key: "facebook", icon: "fab fa-facebook" },
      { key: "youtube", icon: "fab fa-youtube" },
      { key: "instagram", icon: "fab fa-instagram" },
      { key: "reddit", icon: "fab fa-reddit" },
      { key: "medium", icon: "fab fa-medium" },
      { key: "dev.to", icon: "fab fa-dev" },
      { key: "codepen", icon: "fab fa-codepen" },
      { key: "codesandbox", icon: "fas fa-cube" },
      { key: "stack overflow", icon: "fab fa-stack-overflow" },
      { key: "stackoverflow", icon: "fab fa-stack-overflow" },
      { key: "discord", icon: "fab fa-discord" },
      { key: "telegram", icon: "fab fa-telegram" },
      { key: "whatsapp", icon: "fab fa-whatsapp" },
      { key: "tiktok", icon: "fab fa-tiktok" },
      { key: "behance", icon: "fab fa-behance" },
      { key: "dribbble", icon: "fab fa-dribbble" },
      { key: "figma", icon: "fab fa-figma" },
      { key: "notion", icon: "fas fa-book" },
      { key: "hashnode", icon: "fas fa-pen-nib" },
      { key: "gitlab", icon: "fab fa-gitlab" },
      { key: "bitbucket", icon: "fab fa-bitbucket" },
      { key: "kaggle", icon: "fab fa-kaggle" },
      { key: "freecodecamp", icon: "fab fa-free-code-camp" },
      { key: "w3schools", icon: "fas fa-graduation-cap" },
      { key: "leetcode", icon: "fas fa-code" },
      { key: "geeksforgeeks", icon: "fas fa-terminal" },
      { key: "substack", icon: "fas fa-newspaper" },
      { key: "website", icon: "fas fa-globe" },
      { key: "portfolio", icon: "fas fa-globe" },
      { key: "blog", icon: "fas fa-blog" },
    ];

    for (const { key, icon } of platformIcons) {
      if (text.includes(key)) return icon;
    }

    return "fas fa-link";
  }

  #isAlwaysBlackLink(label) {
    const alwaysBlackLinks = ["freecodecamp", "w3schools"];
    return alwaysBlackLinks.includes(label.toLowerCase().replace(/\s/g, ""));
  }

  render() {
    const cardElement = document.createElement("div");
    cardElement.setAttribute("role", "article");
    cardElement.setAttribute("tabindex", "0");

    cardElement.className = [
      "cards",
      "w-full", "h-[500px]",
      "flex", "flex-col", "justify-between", "m-5", "p-6",
      "shadow-md", "transition-all", "duration-500", "ease-in-out",
      "cursor-pointer", "border", "rounded-2xl",
      "hover:shadow-2xl", "hover:scale-[1.04]",
      "bg-white", "dark:bg-[#1a2f3f]",
      "border-[#e5e7eb]", "dark:border-[#1e3a47]"
    ].join(" ");

    cardElement.innerHTML = `
      <div class="flex flex-col h-full justify-between align-center">
        <div>
          <div class="flex justify-between items-center mb-3">
            <h5 class="card-title text-[1.5em] font-bold tracking-tight" style="color: var(--text-color)">
              ${this.#sanitizeHTML(this.title)}
            </h5>
            <div class="card-date text-xs rounded-full px-3 py-1 flex items-center font-medium shadow-sm"
                 style="background: var(--accent-bg); color: var(--accent-color)">
              <i class="fas fa-calendar-alt mr-2 opacity-80"></i>
              <span>${this.#sanitizeHTML(this.updatedAt)}</span>
            </div>
          </div>

          ${this.subtitle
            ? `<h6 class="card-subtitle text-[1.05rem] font-semibold mb-2 opacity-85 leading-snug" 
                  style="color: var(--text-color)">
                  ${this.#sanitizeHTML(this.subtitle)}
               </h6>`
            : ""}

          ${this.text
            ? `<p class="card-text text-[1rem] mb-4 leading-[1.7] opacity-90" 
                  style="color: var(--text-color)">
                  ${this.#sanitizeHTML(this.text)}
               </p>`
            : ""}

          <ul class="card-social-links list-none flex flex-wrap gap-3 mt-2" role="list">
            ${this.links
              .map(
                (link) => `
              <li>
                <a href="${this.#sanitizeHTML(link.url)}"
                   class="card-link rounded-xl inline-flex items-center justify-center p-3 text-[1.3rem] 
                          transition-all duration-300 transform hover:scale-110 focus:scale-105 focus-visible:ring-2 
                          focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                   style="background: var(--accent-bg); color: var(--accent-color)"
                   aria-label="${this.#sanitizeHTML(link.label)}"
                   rel="noopener noreferrer" target="_blank">
                  <i class="${this.#getIconClass(link.label, link.url)}" aria-hidden="true"></i>
                </a>
              </li>
            `
              )
              .join("")}
          </ul>

          ${
            this.studyLinks.length > 0
              ? `
              <p class="card-text mt-5 font-semibold text-[1rem]" style="color: var(--text-color)">Study Links:</p>
              <ul class="card-study-links list-none flex flex-col gap-3 mt-2 overflow-y-auto max-h-[120px] pr-1" 
                  role="list">
                ${this.studyLinks
                  .map(
                    (link) => `
                  <li class="flex items-center">
                    <a href="${this.#sanitizeHTML(link.url)}" 
                       class="study-link inline-flex items-center justify-center w-full rounded-lg p-3 text-[1rem]
                              border transition-all duration-300 hover:scale-[1.02] hover:shadow-sm 
                              focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                              ${
                                this.#isAlwaysBlackLink(link.label)
                                  ? "text-black"
                                  : ""
                              }"
                       style="background: var(--card-bg); color: var(--text-color); border: 1px solid var(--card-border)"
                       rel="noopener noreferrer" target="_blank">
                      ${this.#sanitizeHTML(link.label)}
                    </a>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            `
              : ""
          }
        </div>
      </div>
    `;

    // Hover & focus animations
    cardElement.addEventListener("mouseenter", () => {
      cardElement.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.12)";
      cardElement.style.transform = "translateY(-4px) scale(1.04)";
      // reflect theme using canonical `.dark` class placed on <html> (documentElement)
      cardElement.style.backgroundColor = document.documentElement.classList.contains("dark")
        ? "#1a2f3f"
        : "#f9fafb";
    });
    cardElement.addEventListener("mouseleave", () => {
      cardElement.style.boxShadow = "";
      cardElement.style.transform = "";
      cardElement.style.backgroundColor = "";
    });

    cardElement.addEventListener("focus", () => {
      cardElement.style.outline = "2px solid #2563eb";
      cardElement.style.outlineOffset = "4px";
    });
    cardElement.addEventListener("blur", () => {
      cardElement.style.outline = "";
      cardElement.style.outlineOffset = "";
    });

    return cardElement;
  }

  renderList() {
    const cardElement = document.createElement("div");
    cardElement.setAttribute("role", "article");

    // safer id generation: keep alphanumeric and hyphens only
    const safeIdBase = this.title
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || Date.now();

    cardElement.className = [
      "card-list-item",
      "rounded-xl", "border", "shadow-sm",
      "transition-all", "duration-300", "ease-in-out",
      "hover:shadow-lg",
      "bg-[var(--card-bg)]",
      "border-[#e5e7eb]", "dark:border-[#1e3a47]",
    ].join(" ");

    const descId = `desc-${safeIdBase}`;
    const toggleId = `toggle-${safeIdBase}`;

    // helper: initials for avatar
    const initials = (this.title || "")
      .split(" ")
      .map((s) => s.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();


    cardElement.innerHTML = `
      <div class="card-avatar" aria-hidden="true">${initials}</div>

      <div class="card-meta">
        <div class="flex items-center gap-2">
          <h5 class="card-title">${this.#sanitizeHTML(this.title)}</h5>
          <div class="card-date text-xs rounded-full px-3 py-1 shadow-sm font-medium ml-2"
               style="background: var(--accent-bg); color: var(--accent-color)">
            <i class="fas fa-calendar-alt mr-1 opacity-80"></i>
            <span>${this.#sanitizeHTML(this.updatedAt)}</span>
          </div>
        </div>

        ${this.subtitle ? `<div class="card-subtitle">${this.#sanitizeHTML(this.subtitle)}</div>` : ""}

        <div class="card-preview text-sm opacity-90 mt-1 truncate" aria-hidden="true">
          ${this.text ? this.#sanitizeHTML(this.text) : ""}
        </div>
      </div>

      <div class="card-actions">
        <ul class="card-social-links list-none flex flex-row gap-2" role="list">
          ${this.links
            .map(
              (link) => `
            <li>
              <a href="${this.#sanitizeHTML(link.url)}"
                 class="card-link rounded-lg inline-flex items-center justify-center p-2 text-[1.2rem]
                        transition-all duration-300 transform hover:scale-110 focus-visible:ring-2
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                 style="background: var(--accent-bg); color: var(--accent-color)"
                 aria-label="${this.#sanitizeHTML(link.label)}"
                 rel="noopener noreferrer" target="_blank">
                <i class="${this.#getIconClass(link.label, link.url)}" aria-hidden="true"></i>
              </a>
            </li>
          `
            )
            .join("")}
        </ul>

        <button class="accordion-toggle text-sm font-semibold px-3 py-1 rounded-md ml-2 flex items-center gap-1
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300"
          aria-expanded="false" aria-controls="${descId}" id="${toggleId}">
          <span>Show Description</span>
          <span class="chevron" aria-hidden="true" style="transition: transform 0.25s; display:inline-block;">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </div>

      <div id="${descId}" class="accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300
                                 px-4 border-t border-[var(--card-border)] bg-[var(--card-bg)]"
           aria-hidden="true">
        <div class="py-3">
          ${
            this.text
              ? `<p class="card-text text-sm mb-2 leading-[1.6]" style="color: var(--text-color)">
                   ${this.#sanitizeHTML(this.text)}
                 </p>`
              : ""
          }
          ${
            this.studyLinks.length > 0
              ? `
              <p class="card-text font-semibold mt-2" style="color: var(--text-color)">Study Links:</p>
              <ul class="card-study-links list-none flex flex-col gap-2 mt-1 overflow-y-auto max-h-[80px] pr-1" role="list">
                ${this.studyLinks
                  .map(
                    (link) => `
                    <li>
                      <a href="${this.#sanitizeHTML(link.url)}"
                         class="study-link inline-flex items-center justify-center w-full rounded-md p-2 text-[0.95rem]
                                border transition-all duration-300 hover:scale-[1.02] hover:shadow-sm 
                                focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                                ${
                                  this.#isAlwaysBlackLink(link.label)
                                    ? "text-black"
                                    : ""
                                }"
                         style="background: var(--card-bg); color: var(--text-color); border: 1px solid var(--card-border)"
                         rel="noopener noreferrer" target="_blank">
                        ${this.#sanitizeHTML(link.label)}
                      </a>
                    </li>
                  `
                  )
                  .join("")}
              </ul>
            `
              : ""
          }
        </div>
      </div>
    `;

    // Accordion logic
    const toggleBtn = cardElement.querySelector(".accordion-toggle");
    const content = cardElement.querySelector(".accordion-content");
    const chevron = toggleBtn.querySelector(".chevron");
    const toggleText = toggleBtn.querySelector("span");

    if (toggleBtn && content) {
      const toggleHandler = () => {
        const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
        toggleBtn.setAttribute("aria-expanded", String(!expanded));
        content.setAttribute("aria-hidden", String(expanded));

        if (!expanded) {
          // expand
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
          toggleText.textContent = "Hide Description";
          chevron.style.transform = "rotate(180deg)";
        } else {
          // collapse
          content.style.maxHeight = "0";
          content.style.opacity = "0";
          toggleText.textContent = "Show Description";
          chevron.style.transform = "rotate(0deg)";
        }
      };

      toggleBtn.addEventListener("click", toggleHandler);
      // keyboard support: Enter/Space
      toggleBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleHandler();
        }
      });
    }

    return cardElement;
  }
}

export default Card;
