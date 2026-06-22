const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const projectGrid = qs("#projectGrid");
const documentGrid = qs("#documentGrid");
const videoGrid = qs("#videoGrid");
const documentSection = qs("#documents");
const archiveBgLayer = qs(".archive-bg-layer");
const heroSection = qs(".hero");
const heroBgLayer = qs(".hero-bg");
const navToggle = qs(".nav-toggle");
const navMenu = qs(".nav-menu");

function createProjectCards() {
  projectGrid.innerHTML = portfolioData.projects.map((project) => `
    <article class="project-card reveal" data-project="${project.id}">
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title} 대표 이미지" loading="lazy" />
      </div>
      <div class="project-content">
        <p class="project-type">${project.type}</p>
        <h3>${project.title}</h3>
        <p class="genre">${project.genre}</p>
        <p>${project.summary}</p>
        <dl class="role-list">
          <dt>담당 영역</dt>
          <dd>${project.role}</dd>
        </dl>
        <div class="tag-list">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <div class="card-actions">
          <a href="#documents" class="text-link" data-doc-filter="${project.id}">문서 보기</a>
          <a href="#videos" class="text-link">영상 보기</a>
        </div>
      </div>
    </article>
  `).join("");
}

function updateHeroBackground() {
  if (!heroSection || !heroBgLayer || !portfolioData.site?.heroBackground) return;

  heroBgLayer.style.backgroundImage = `
    linear-gradient(90deg, rgba(8, 11, 18, 0.86), rgba(8, 11, 18, 0.54) 48%, rgba(18, 16, 33, 0.74)),
    url("${portfolioData.site.heroBackground}")
  `;
}

function updateDocumentSectionBackground(filter = "all") {
  if (!documentSection || !archiveBgLayer) return;

  const project = portfolioData.projects.find((item) => item.id === filter);

  if (!project || filter === "all") {
    documentSection.classList.remove("has-project-bg");
    archiveBgLayer.style.removeProperty("background-image");
    documentSection.dataset.activeProject = "all";
    return;
  }

  documentSection.classList.add("has-project-bg");
  archiveBgLayer.style.backgroundImage = `url("${project.archiveBackground}")`;
  documentSection.dataset.activeProject = project.id;
}

function createDocumentCards(filter = "all") {
  const projects = filter === "all"
    ? portfolioData.projects
    : portfolioData.projects.filter((project) => project.id === filter);

  documentGrid.innerHTML = projects.flatMap((project) => {
    const folder = projectDocFolders[project.id];
    return portfolioData.documents.map((docName) => {
      const encodedFileName = encodeURIComponent(`${docName}.pdf`);
      const filePath = `assets/docs/${folder}/${encodedFileName}`;
      return `
        <article class="doc-card reveal" data-project="${project.id}">
          <div>
            <p class="doc-project">${project.title}</p>
            <h3>${docName}</h3>
            <p>PDF 파일을 같은 이름으로 교체하면 버튼이 자동 연결됩니다.</p>
          </div>
          <a class="btn small" href="${filePath}" target="_blank" rel="noopener noreferrer">PDF 열기</a>
        </article>
      `;
    });
  }).join("");
  observeReveals();
}

function createVideoCards() {
  videoGrid.innerHTML = portfolioData.projects.map((project) => `
    <article class="video-card reveal">
      <div class="video-frame">
        <iframe
          src="https://www.youtube.com/embed/${project.youtubeId}"
          title="${project.title} gameplay prototype"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
      <div class="video-info">
        <p class="project-type">${project.type}</p>
        <h3>${project.title}</h3>
        <p>${project.genre}</p>
      </div>
    </article>
  `).join("");
}

function bindTabs() {
  qsa(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      qsa(".tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      createDocumentCards(tab.dataset.filter);
      updateDocumentSectionBackground(tab.dataset.filter);
    });
  });
}

function bindProjectDocLinks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-doc-filter]");
    if (!link) return;
    const filter = link.dataset.docFilter;
    const tab = qs(`.tab[data-filter="${filter}"]`);
    if (tab) tab.click();
  });
}

function bindMobileNav() {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("open");
  });

  qsa(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("open");
    });
  });
}

function observeReveals() {
  const revealEls = qsa(".reveal:not(.visible)");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => observer.observe(el));
}

function init() {
  updateHeroBackground();
  createProjectCards();
  createDocumentCards();
  updateDocumentSectionBackground("all");
  createVideoCards();
  bindTabs();
  bindProjectDocLinks();
  bindMobileNav();
  observeReveals();
}

document.addEventListener("DOMContentLoaded", init);
