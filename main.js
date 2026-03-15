// ============================
// DATA
// ============================

const skillsData = [
  { name: "Java", category: "mobile", color: "#60a5fa" },
  { name: "Kotlin", category: "mobile", color: "#60a5fa" },
  { name: "Swift", category: "mobile", color: "#60a5fa" },
  { name: "Flutter", category: "mobile", color: "#60a5fa" },
  { name: "React Native", category: "mobile", color: "#60a5fa" },
  { name: "Android Studio", category: "tools", color: "#ef4444" },
  { name: "Xcode", category: "tools", color: "#ef4444" },
  { name: "Jetpack Compose", category: "mobile", color: "#60a5fa" },
  { name: "UIKit", category: "mobile", color: "#60a5fa" },
  { name: "Firebase", category: "backend", color: "#34d399" },
  { name: "REST APIs", category: "backend", color: "#34d399" },
  { name: "Spring Boot", category: "backend", color: "#34d399" },
  { name: "Node.js", category: "backend", color: "#34d399" },
  { name: "Python", category: "backend", color: "#34d399" },
  { name: "TeamCity", category: "devops", color: "#fbbf24" },
  { name: "Jenkins", category: "devops", color: "#fbbf24" },
  { name: "GitHub", category: "devops", color: "#fbbf24" },
  { name: "Bitbucket", category: "devops", color: "#fbbf24" },
  { name: "CircleCI", category: "devops", color: "#fbbf24" },
  { name: "Nexus", category: "devops", color: "#fbbf24" },
  { name: "Jira", category: "tools", color: "#ef4444" },
  { name: "Figma", category: "tools", color: "#ef4444" },
  { name: "Alamofire", category: "mobile", color: "#60a5fa" },
  { name: "ExoPlayer", category: "mobile", color: "#60a5fa" },
  { name: "Conviva", category: "tools", color: "#ef4444" },
  { name: "Sentry", category: "devops", color: "#fbbf24" },
  { name: "Firebase Crashlytics", category: "devops", color: "#fbbf24" },
  { name: "JavaScript", category: "web", color: "#8b5cf6" },
  { name: "TypeScript", category: "web", color: "#8b5cf6" },
  { name: "React", category: "web", color: "#8b5cf6" },
];

const projectsData = {

  professional: [
    {
      title: "CyberArk Identity App",
      description: "Integrated TeeSDK and DataStore for secured storage. Delivered enterprise-grade mobile security solutions.",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.centrify.mdm.samsung",
      appStoreUrl: "https://apps.apple.com/us/app/cyberark-identity/id499910663",
      tags: ["Security", "Enterprise", "Authentication"]
    },
    {
      title: "Bankwest Digital Banking",
      description: "Led development of Simplified Self-Service features and enabled secure currency conversion flows.",
      playStoreUrl: "https://play.google.com/store/apps/details?id=au.com.bankwest.mobile",
      appStoreUrl: "https://apps.apple.com/au/app/bankwest/id419259235",
      tags: ["Banking", "Finance", "Mobile"]
    },
    {
      title: "Conviva Android SDK",
      description: "Developed a robust analytics SDK for Android video players, integrating with ExoPlayer to deliver real-time insights.",
      stats: [
        "7 Billion sensors on devices",
        "5 Trillion events processed per day",
        "12 Billion metric computations per minute"
      ],
      tags: ["Analytics", "Video", "SDK"]
    }
  ],

  personal: [
    {
      title: "AI Similarity",
      description: "Advanced machine learning algorithm for semantic similarity matching. Enables intelligent content recommendations and duplicate detection across large datasets.",
      websiteUrl: "https://www.aisimilarity.com",
      logo: "public/ai-similarity-logo.png",
      tags: ["Python", "TensorFlow", "NLP", "Vector DB"]
    },
    {
      title: "CodeForumBlogs",
      description: "Community-driven platform for technical discussions and blogging. Features real-time collaboration, code syntax highlighting, and knowledge sharing among developers.",
      websiteUrl: "https://www.codeforumblogs.com",
      tags: ["React", "Node.js", "MongoDB", "WebSocket"]
    }
  ]
};



// ============================
// HEADER SCROLL EFFECT
// ============================

const header = document.querySelector('.fixed-header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}



// ============================
// MOBILE MENU
// ============================

const menuButton = document.querySelector('.mobile-menu-button');
const mobileNav = document.querySelector('.mobile-nav');

if (menuButton && mobileNav) {

  menuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuButton.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      menuButton.classList.remove('active');
    });
  });

}



// ============================
// SKILLS
// ============================

const skillsGrid = document.querySelector('.skills-grid');
const filterButtons = document.querySelectorAll('.filter-button');

function renderSkills(category = null) {

  if (!skillsGrid) return;

  const filteredSkills =
    category === null || category === 'all'
      ? skillsData
      : skillsData.filter(skill => skill.category === category);

  skillsGrid.innerHTML = filteredSkills.map(skill => `
      <span class="skill-badge"
        style="background:${skill.color}20;color:${skill.color}">
        ${skill.name}
      </span>
  `).join('');
}

filterButtons.forEach(button => {

  button.addEventListener('click', () => {

    filterButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    renderSkills(button.dataset.category);

  });

});



// ============================
// PROJECTS
// ============================

const projectsGrid = document.querySelector('.projects-grid');
const tabButtons = document.querySelectorAll('.tab-button');

function renderProjects(type = "personal") {

  if (!projectsGrid) return;

  const projects = projectsData[type];

  projectsGrid.innerHTML = projects.map(project => `

    <div class="project-card">

      ${project.logo ? `
        <div style="margin-bottom:16px;display:flex;justify-content:center">
          <img 
            src="${project.logo}" 
            alt="${project.title}"
            style="height:40px;object-fit:contain;opacity:.9">
        </div>
      ` : ""}

      <h3 class="text-xl font-bold mb-2">${project.title}</h3>

      <div class="flex flex-wrap gap-2 mb-3">
        ${project.tags.map(tag => `
          <span class="badge">${tag}</span>
        `).join("")}
      </div>

      <p class="text-gray-400 mb-4">${project.description}</p>

      ${project.stats ? `
        <div class="mt-4 space-y-2">
          ${project.stats.map(stat => `
            <div class="flex items-center text-sm">
              <div class="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span class="text-gray-300">${stat}</span>
            </div>
          `).join("")}
        </div>
      ` : ""}

      <div class="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap gap-3">

        ${project.websiteUrl ? `
          <a href="${project.websiteUrl}" target="_blank"
            class="project-link">
            🌐 Visit Website
          </a>
        ` : ""}

        ${project.playStoreUrl ? `
          <a href="${project.playStoreUrl}" target="_blank"
            class="project-link">
            📱 Play Store
          </a>
        ` : ""}

        ${project.appStoreUrl ? `
          <a href="${project.appStoreUrl}" target="_blank"
            class="project-link">
            📱 App Store
          </a>
        ` : ""}

      </div>

    </div>

  `).join("");

}



// ============================
// TAB SWITCHING
// ============================

tabButtons.forEach(button => {

  button.addEventListener("click", () => {

    tabButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    renderProjects(button.dataset.tab);

  });

});



// ============================
// CONTACT FORM
// ============================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", e => {

    e.preventDefault();

    alert("Message sent successfully!");

    contactForm.reset();

  });

}



// ============================
// INIT
// ============================

document.addEventListener("DOMContentLoaded", () => {

  renderSkills();

  // Start with PERSONAL so AI Similarity shows
  renderProjects("personal");

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

});