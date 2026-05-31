/* =========================================================
   GLOBAL INITIALIZATION
========================================================= */
if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

/* =========================================================
   THEME TOGGLE
========================================================= */
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}

/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(15, 23, 42, 0.92)";
      navbar.style.backdropFilter = "blur(12px)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.backdropFilter = "none";
    }
  });
}

/* =========================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
========================================================= */
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId.length > 1) {
      e.preventDefault();
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  });
});

/* =========================================================
   ACTIVE NAVBAR ON SCROLL
========================================================= */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

if (sections.length > 0 && navItems.length > 0) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* =========================================================
   INTERACTIVE CARDS (MOUSE EFFECT)
========================================================= */
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

    let glowColor = "";
    if (card.classList.contains("purple-glow")) {
      glowColor = "rgba(139, 92, 246, 0.18)";
    } else if (card.classList.contains("pink-glow")) {
      glowColor = "rgba(244, 63, 94, 0.18)";
    } else if (card.classList.contains("green-glow")) {
      glowColor = "rgba(45, 212, 191, 0.18)";
    }

    if (glowColor) {
      card.style.background = `radial-gradient(350px circle at ${x}px ${y}px, ${glowColor}, rgba(13, 20, 38, 0.7))`;
    }
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    card.style.background = "rgba(13, 20, 38, 0.7)";
  });
});

/* =========================================================
   LOGIN MODAL SYSTEM (INDEX.HTML)
========================================================= */
const openLogin = document.getElementById("open-login");
const loginModal = document.getElementById("login-modal");
const closeModal = document.getElementById("close-modal");

if (openLogin && loginModal) {
  openLogin.addEventListener("click", () => loginModal.classList.add("active"));
}
if (closeModal && loginModal) {
  closeModal.addEventListener("click", () =>
    loginModal.classList.remove("active"),
  );
}
if (loginModal) {
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.remove("active");
  });
}

/* =========================================================
   =========================================================
   =============== DASHBOARD & MATERI CODE ================
   =========================================================
   =========================================================
*/

/* =========================================================
   SECTION 1: SISTEM AUTENTIKASI (LOGIN & LOGOUT)
========================================================= */
const handleLoginSubmit = (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Email dan password harus diisi!");
    return;
  }

  const userData = {
    name: email.split("@")[0],
    email: email,
  };

  localStorage.setItem("userProfile", JSON.stringify(userData));
  localStorage.setItem("skillscapeLogin", "true");

  window.location.href = "dashboard.html";
};

/* =========================================================
   SECTION 2: DASHBOARD FUNCTIONS
========================================================= */

function initializeDashboard() {
  updateDashboardStats();
  updateActivityLog();
  updateRoadmapStatus();
  setupLabButtons();
  setupPhishingSimulation();
}

function updateDashboardStats() {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (!stats) return;

  const materiCount = document.getElementById("materiCount");
  const simulasiCount = document.getElementById("simulasiCount");
  const rataSkor = document.getElementById("rataSkor");
  const badgeCount = document.getElementById("badgeCount");

  if (materiCount) materiCount.innerText = stats.materiSelesai;
  if (simulasiCount) simulasiCount.innerText = stats.simulasiSelesai;

  const avgScore =
    stats.totalQuiz > 0 ? Math.round(stats.totalSkor / stats.totalQuiz) : 0;
  if (rataSkor) rataSkor.innerText = `${avgScore}%`;
  if (badgeCount) badgeCount.innerText = stats.badgeCount;

  const totalMateri = 10;
  const progressPercent = (stats.materiSelesai / totalMateri) * 100;
  const progressPercentElem = document.getElementById("progressPercent");
  if (progressPercentElem)
    progressPercentElem.innerText = `${Math.round(progressPercent)}%`;

  const fillCircle = document.querySelector(".fill-circle");
  if (fillCircle) {
    const circumference = 440;
    const offset = circumference - (progressPercent / 100) * circumference;
    fillCircle.style.strokeDashoffset = offset;
  }

  const courseTitle = document.querySelector(".course-title");
  const courseProgressFill = document.querySelector(
    ".course-card .progress-fill",
  );
  const courseProgressText = document.getElementById("courseProgress");

  if (stats.courseProgress) {
    if (courseTitle)
      courseTitle.innerHTML = `📚 ${stats.courseProgress.currentCourse}`;
    if (courseProgressFill)
      courseProgressFill.style.width = `${stats.courseProgress.progress}%`;
    if (courseProgressText)
      courseProgressText.innerText = `${stats.courseProgress.progress}% selesai`;
  }
}

function updateActivityLog() {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (!stats || !stats.activityLog) return;

  const activityList = document.getElementById("activityList");
  if (!activityList) return;

  activityList.innerHTML = "";
  const recentActivities = stats.activityLog.slice(-5).reverse();

  recentActivities.forEach((activity) => {
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";

    let icon = "check-circle";
    if (activity.type === "lab") icon = "terminal";
    else if (activity.type === "badge") icon = "award";
    else if (activity.type === "welcome") icon = "home";
    else if (activity.type === "materi") icon = "book-open";

    activityItem.innerHTML = `<i data-lucide="${icon}"></i><span>${activity.text}</span>`;
    activityList.appendChild(activityItem);
  });

  if (typeof lucide !== "undefined") lucide.createIcons();
}

function updateRoadmapStatus() {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (!stats) return;

  const roadmapSteps = document.querySelectorAll(".roadmap-step");
  roadmapSteps.forEach((step) => {
    const roadmapKey = step.getAttribute("data-roadmap");
    if (stats.roadmapProgress[roadmapKey]) {
      step.classList.add("completed");
      step.classList.remove("active");
    }
  });

  const order = ["basic", "password", "phishing", "network", "forensic"];
  for (let key of order) {
    if (!stats.roadmapProgress[key]) {
      const step = document.querySelector(
        `.roadmap-step[data-roadmap="${key}"]`,
      );
      if (step) step.classList.add("active");
      break;
    }
  }
}

function setupLabButtons() {
  const labButtons = document.querySelectorAll(".btn-start");
  labButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const labName = button.getAttribute("data-lab");
      const points = parseInt(button.getAttribute("data-points"));
      if (labName === "phishing") {
        openPhishingModal();
      } else {
        completeLab(labName, points);
      }
    });
  });
}

function completeLab(labName, points) {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (!stats) return;

  if (stats.completedLabs.includes(labName)) {
    alert(`Anda sudah menyelesaikan ${labName} sebelumnya!`);
    return;
  }

  stats.completedLabs.push(labName);
  stats.simulasiSelesai++;
  stats.materiSelesai =
    stats.completedLabs.length + stats.completedMateri.length;
  stats.totalQuiz++;
  stats.totalSkor += points;

  const newBadges = checkBadgeMilestones(stats);
  stats.badgeCount += newBadges;

  stats.activityLog.unshift({
    text: `Lab ${labName} selesai dengan skor ${points}`,
    time: new Date().toISOString(),
    type: "lab",
  });

  updateRoadmapBasedOnLab(labName, stats);
  updateCourseProgress(stats);

  localStorage.setItem("userStats", JSON.stringify(stats));
  localStorage.setItem("statsUpdate", Date.now().toString());

  updateDashboardStats();
  updateActivityLog();
  updateRoadmapStatus();

  alert(
    `Selamat! Anda menyelesaikan ${labName} dan mendapatkan ${points} poin!`,
  );
}

function checkBadgeMilestones(stats) {
  let newBadges = 0;
  const currentBadges = stats.badgeCount;
  const totalCompleted =
    stats.completedLabs.length + stats.completedMateri.length;

  if (totalCompleted >= 1 && currentBadges < 1) {
    stats.activityLog.unshift({
      text: "Badge Pemula diperoleh!",
      time: new Date().toISOString(),
      type: "badge",
    });
    newBadges++;
  }
  if (totalCompleted >= 3 && currentBadges < 2) {
    stats.activityLog.unshift({
      text: "Badge Explorer diperoleh!",
      time: new Date().toISOString(),
      type: "badge",
    });
    newBadges++;
  }
  if (totalCompleted >= 6 && currentBadges < 3) {
    stats.activityLog.unshift({
      text: "Badge Master diperoleh!",
      time: new Date().toISOString(),
      type: "badge",
    });
    newBadges++;
  }
  return newBadges;
}

function updateRoadmapBasedOnLab(labName, stats) {
  const roadmapMap = {
    basic: "basic",
    password: "password",
    phishing: "phishing",
    network: "network",
    forensic: "forensic",
  };
  const key = roadmapMap[labName];
  if (key) stats.roadmapProgress[key] = true;
}

function updateCourseProgress(stats) {
  const completedCount = Object.values(stats.roadmapProgress).filter(
    (v) => v === true,
  ).length;
  const progress = (completedCount / 5) * 100;

  let currentCourse = "Dasar Cyber Security";
  if (stats.roadmapProgress.basic && !stats.roadmapProgress.password)
    currentCourse = "Password Security";
  else if (stats.roadmapProgress.password && !stats.roadmapProgress.phishing)
    currentCourse = "Phishing Detection";
  else if (stats.roadmapProgress.phishing && !stats.roadmapProgress.network)
    currentCourse = "Network Security";
  else if (stats.roadmapProgress.network && !stats.roadmapProgress.forensic)
    currentCourse = "Digital Forensics";
  else if (stats.roadmapProgress.forensic)
    currentCourse = "Semua Materi Selesai!";

  stats.courseProgress = {
    currentCourse: currentCourse,
    progress: Math.round(progress),
  };
}

/* =========================================================
   SECTION 3: PHISHING SIMULATION MODAL
========================================================= */

function openPhishingModal() {
  const modal = document.getElementById("simulationModal");
  if (!modal) return;

  modal.style.display = "flex";

  const simIntro = document.getElementById("simulation-intro");
  const emailMockup = document.getElementById("emailMockup");
  const simChoices = document.getElementById("simulation-choices");
  const startSimBtn = document.getElementById("startSimBtn");
  const feedbackBox = document.getElementById("feedback-box");

  if (simIntro) simIntro.style.display = "block";
  if (emailMockup) emailMockup.style.display = "none";
  if (simChoices) simChoices.style.display = "none";
  if (startSimBtn) startSimBtn.style.display = "inline-block";
  if (feedbackBox) feedbackBox.innerHTML = "";

  setupPhishingModalListeners(
    modal,
    simIntro,
    emailMockup,
    simChoices,
    startSimBtn,
    feedbackBox,
  );
}

function setupPhishingModalListeners(
  modal,
  simIntro,
  emailMockup,
  simChoices,
  startSimBtn,
  feedbackBox,
) {
  const closeBtn = modal.querySelector(".close-modal-btn");
  const startBtn = document.getElementById("startSimBtn");
  const choiceBtns = document.querySelectorAll(".choice-btn");

  const closeModal = () => {
    modal.style.display = "none";
    if (simIntro) simIntro.style.display = "block";
    if (emailMockup) emailMockup.style.display = "none";
    if (simChoices) simChoices.style.display = "none";
    if (startSimBtn) startSimBtn.style.display = "inline-block";
    if (feedbackBox) feedbackBox.innerHTML = "";
  };

  if (closeBtn) closeBtn.onclick = closeModal;

  if (startBtn) {
    startBtn.onclick = () => {
      if (simIntro) simIntro.style.display = "none";
      if (emailMockup) emailMockup.style.display = "block";
      if (startSimBtn) startSimBtn.style.display = "none";
      if (simChoices) simChoices.style.display = "flex";
    };
  }

  choiceBtns.forEach((btn) => {
    btn.onclick = () => {
      const choiceType = btn.getAttribute("data-choice");
      const points = parseInt(btn.getAttribute("data-points"));
      evaluatePhishingChoice(choiceType, points, btn, feedbackBox);
      setTimeout(() => {
        closeModal();
        completeLab("phishing", points);
      }, 3000);
    };
  });

  window.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

function evaluatePhishingChoice(choiceType, points, button, feedbackBox) {
  const allButtons = document.querySelectorAll(".choice-btn");
  allButtons.forEach((btn) => {
    btn.style.borderColor = "";
    btn.style.background = "";
  });

  button.style.borderColor = getBorderColorPhishing(choiceType);
  button.style.background = getBackgroundColorPhishing(choiceType);

  const feedback = getFeedbackMessagePhishing(choiceType, points);
  if (feedbackBox) feedbackBox.innerHTML = feedback;
}

function getBorderColorPhishing(choiceType) {
  switch (choiceType) {
    case "safe":
      return "#22c55e";
    case "danger-link":
      return "#ef4444";
    case "reply":
      return "#f59e0b";
    default:
      return "";
  }
}

function getBackgroundColorPhishing(choiceType) {
  switch (choiceType) {
    case "safe":
      return "rgba(34, 197, 94, 0.05)";
    case "danger-link":
      return "rgba(239, 68, 68, 0.05)";
    case "reply":
      return "rgba(245, 158, 11, 0.05)";
    default:
      return "";
  }
}

function getFeedbackMessagePhishing(choiceType, points) {
  switch (choiceType) {
    case "safe":
      return `<div style="background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); padding: 20px; border-radius: 16px;">
        <strong style="color: #4ade80;">✅ Pilihan Tepat! (+${points} poin)</strong><br><br>
        Analisis yang hebat! Email tersebut menggunakan domain palsu yang jelas-jelas bukan domain resmi bank.
      </div>`;
    case "danger-link":
      return `<div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); padding: 20px; border-radius: 16px;">
        <strong style="color: #f87171;">❌ Berbahaya! (+${points} poin)</strong><br><br>
        Mengeklik link tersebut berbahaya. Pelajari lebih lanjut untuk menghindari phishing di masa depan.
      </div>`;
    default:
      return `<div style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 20px; border-radius: 16px;">
        <strong style="color: #fbbf24;">⚠️ Perlu Perhatian! (+${points} poin)</strong><br><br>
        Membalas email tersebut memberi tahu penipu bahwa email Anda aktif.
      </div>`;
  }
}

function setupPhishingSimulation() {
  const startPhishingSim = document.getElementById("startPhishingSim");
  if (startPhishingSim) {
    startPhishingSim.addEventListener("click", (e) => {
      e.preventDefault();
      openPhishingModal();
    });
  }
}

/* =========================================================
   SECTION 4: MATERI PAGE FUNCTIONS
========================================================= */

const materiData = [
  {
    id: 1,
    title: "Pengantar Keamanan Siber",
    category: "dasar",
    description:
      "Pelajari dasar-dasar keamanan siber, ancaman umum, dan prinsip keamanan informasi.",
    duration: "30 menit",
    points: 10,
    level: "easy",
    imageIcon: "shield",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Keamanan siber adalah praktik melindungi sistem, jaringan, dan program dari serangan digital.",
      topics: [
        "Apa itu Keamanan Siber?",
        "Jenis-jenis Ancaman Siber",
        "Prinsip CIA",
        "Mengapa Keamanan Siber Penting?",
      ],
      quiz: {
        question: "Apa singkatan dari CIA dalam keamanan siber?",
        options: [
          "Central Intelligence Agency",
          "Confidentiality, Integrity, Availability",
          "Cyber Internet Access",
          "Computer Intelligence Algorithm",
        ],
        correct: 1,
      },
    },
  },
  {
    id: 2,
    title: "Jenis-jenis Malware",
    category: "dasar",
    description:
      "Kenali berbagai jenis malware seperti virus, worm, trojan, ransomware, dan spyware.",
    duration: "45 menit",
    points: 15,
    level: "easy",
    imageIcon: "bug",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Malware adalah perangkat lunak berbahaya yang dirancang untuk merusak sistem komputer.",
      topics: ["Virus", "Worm", "Trojan", "Ransomware", "Spyware"],
      quiz: {
        question:
          "Jenis malware mana yang dapat menyebar tanpa interaksi pengguna?",
        options: ["Virus", "Trojan", "Worm", "Ransomware"],
        correct: 2,
      },
    },
  },
  {
    id: 3,
    title: "Keamanan Password",
    category: "keamanan",
    description:
      "Pelajari cara membuat dan mengelola password yang kuat dan aman dari serangan.",
    duration: "40 menit",
    points: 15,
    level: "easy",
    imageIcon: "key",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Password adalah garis pertahanan pertama dalam keamanan akun online.",
      topics: [
        "Karakteristik password kuat",
        "Brute force attack",
        "Password manager",
        "2FA",
        "Social engineering",
      ],
      quiz: {
        question: "Manakah password yang paling aman?",
        options: ["password123", "admin2024", "P@ssw0rd!2024#Secure", "qwerty"],
        correct: 2,
      },
    },
  },
  {
    id: 4,
    title: "Deteksi Phishing",
    category: "keamanan",
    description:
      "Pelajari cara mengenali dan menghindari serangan phishing yang mencuri data pribadi.",
    duration: "50 menit",
    points: 20,
    level: "medium",
    imageIcon: "mail-search",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Phishing adalah teknik penipuan untuk mendapatkan informasi sensitif.",
      topics: [
        "Ciri-ciri email phishing",
        "Domain palsu",
        "Spear phishing",
        "Langkah antisipasi",
      ],
      quiz: {
        question:
          "Apa yang harus Anda lakukan jika menerima email mencurigakan dari bank?",
        options: [
          "Klik link verifikasi",
          "Balas email",
          "Hubungi bank via kontak resmi",
          "Forward ke teman",
        ],
        correct: 2,
      },
    },
  },
  {
    id: 5,
    title: "Keamanan Jaringan",
    category: "keamanan",
    description:
      "Pelajari cara mengamankan jaringan dari serangan dan akses tidak sah.",
    duration: "60 menit",
    points: 25,
    level: "medium",
    imageIcon: "wifi",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Keamanan jaringan melindungi infrastruktur jaringan dari akses tidak sah.",
      topics: [
        "Firewall",
        "VPN",
        "IDS/IPS",
        "Keamanan Wi-Fi",
        "Segmentasi jaringan",
      ],
      quiz: {
        question: "Apa fungsi utama dari firewall?",
        options: [
          "Mempercepat internet",
          "Memantau lalu lintas jaringan",
          "Menyimpan data",
          "Mengenkripsi file",
        ],
        correct: 1,
      },
    },
  },
  {
    id: 6,
    title: "Enkripsi Data",
    category: "lanjutan",
    description:
      "Pelajari konsep enkripsi dan cara melindungi data sensitif dengan kriptografi.",
    duration: "55 menit",
    points: 25,
    level: "medium",
    imageIcon: "lock",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Enkripsi adalah proses mengubah data menjadi format tidak terbaca tanpa kunci dekripsi.",
      topics: [
        "Enkripsi simetris vs asimetris",
        "AES, RSA",
        "TLS/SSL",
        "Enkripsi end-to-end",
        "Hash digital",
      ],
      quiz: {
        question: "Perbedaan utama enkripsi simetris dan asimetris?",
        options: [
          "Satu kunci vs dua kunci",
          "Simetris lebih lambat",
          "Asimetris untuk email",
          "Tidak ada perbedaan",
        ],
        correct: 0,
      },
    },
  },
  {
    id: 7,
    title: "Forensik Digital",
    category: "lanjutan",
    description:
      "Pelajari teknik investigasi digital untuk mengumpulkan bukti dari serangan siber.",
    duration: "70 menit",
    points: 30,
    level: "hard",
    imageIcon: "search",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Forensik digital adalah ilmu pemulihan dan investigasi bukti digital.",
      topics: [
        "Prinsip forensik",
        "Chain of custody",
        "Analisis hard drive",
        "Recovery file",
        "Timeline analysis",
      ],
      quiz: {
        question: "Apa itu chain of custody?",
        options: [
          "Rantai penjara",
          "Dokumentasi jejak bukti",
          "Koneksi perangkat",
          "Jaringan terenkripsi",
        ],
        correct: 1,
      },
    },
  },
  {
    id: 8,
    title: "Incident Response",
    category: "lanjutan",
    description:
      "Pelajari cara merespon insiden keamanan siber dengan cepat dan efektif.",
    duration: "65 menit",
    points: 30,
    level: "hard",
    imageIcon: "alert-triangle",
    completed: false,
    progress: 0,
    content: {
      overview:
        "Incident Response adalah proses terstruktur menangani serangan siber.",
      topics: [
        "Siklus IR",
        "Tim CSIRT",
        "Playbook insiden",
        "Komunikasi krisis",
        "Post-mortem",
      ],
      quiz: {
        question: "Fase pertama dalam incident response?",
        options: ["Containment", "Eradication", "Preparation", "Recovery"],
        correct: 2,
      },
    },
  },
];

// Data Resource Video YouTube
const materiResources = {
  1: {
    videoUrl: "https://www.youtube.com/embed/IvBfxSJWx6A",
    videoTitle: "Yuk Mengenal Keamanan Siber",
  },

  2: {
    videoUrl: "https://www.youtube.com/embed/SzOASPzvMiw",
    videoTitle: "Jenis Jenis Malware",
  },

  3: {
    videoUrl: "https://www.youtube.com/embed/6K4IFchANkI",
    videoTitle: "Tips Menjaga Keamanan Password",
  },

  4: {
    videoUrl: "https://www.youtube.com/embed/vq-5IyHWgXE",
    videoTitle: "Cara Kerja Phishing",
  },

  5: {
    videoUrl: "https://www.youtube.com/embed/sZtPt02I1O0",
    videoTitle: "Keamanan Jaringan",
  },

  6: {
    videoUrl: "https://www.youtube.com/embed/iBkYvL5ZQbE",
    videoTitle: "Bagaimana Enkripsi Mengamankan Data Kita?",
  },

  7: {
    videoUrl: "https://www.youtube.com/embed/IdocPg_Upvw",
    videoTitle: "Pengenalan Forensik Digital",
  },

  8: {
    videoUrl: "https://www.youtube.com/embed/-uwENcQzXj8",
    videoTitle: "Penjelasan Proses Respons Insiden",
  },
};

function extractVideoId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
    /(?:youtube\.com\/shorts\/)([^?]+)/,
  ];
  for (let pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function openVideoInput(materiId) {
  const videoUrl = prompt(
    "Masukkan URL YouTube (contoh: https://youtu.be/xxxxx atau https://www.youtube.com/watch?v=xxxxx):",
  );
  if (videoUrl && videoUrl.trim()) {
    let embedUrl = "";
    if (videoUrl.includes("youtube.com/watch?v=")) {
      const videoId = videoUrl.split("v=")[1].split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtu.be/")) {
      const videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes("youtube.com/embed/")) {
      embedUrl = videoUrl;
    } else if (videoUrl.includes("youtube.com/shorts/")) {
      const videoId = videoUrl.split("shorts/")[1].split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else {
      embedUrl = `https://www.youtube.com/embed/${videoUrl}`;
    }

    if (!materiResources[materiId])
      materiResources[materiId] = { videoUrl: "", videoTitle: "" };
    materiResources[materiId].videoUrl = embedUrl;
    const videoTitle = prompt("Masukkan judul video:", "Video Pembelajaran");
    materiResources[materiId].videoTitle = videoTitle || "Video Pembelajaran";
    alert("Video berhasil ditambahkan!");
    openMateriDetail(materiId);
  }
}

let currentMateriId = null;
let selectedQuizOption = null;

function initializeMateriPage() {
  loadMateriProgress();
  renderMateri();
  updateMateriStatsSummary();
  setupMateriCategoryTabs();
}

function loadMateriProgress() {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (stats && stats.completedMateri) {
    materiData.forEach((materi) => {
      materi.completed = stats.completedMateri.includes(materi.id);
      materi.progress = materi.completed ? 100 : 0;
    });
  }
}

function updateMateriStatsSummary() {
  const totalMateri = materiData.length;
  const completedMateri = materiData.filter((m) => m.completed).length;
  const totalPoints = materiData
    .filter((m) => m.completed)
    .reduce((sum, m) => sum + m.points, 0);
  const completionRate = Math.round((completedMateri / totalMateri) * 100);

  const totalMateriEl = document.getElementById("totalMateri");
  const completedMateriEl = document.getElementById("completedMateri");
  const totalPointsEl = document.getElementById("totalPoints");
  const completionRateEl = document.getElementById("completionRate");

  if (totalMateriEl) totalMateriEl.innerText = totalMateri;
  if (completedMateriEl) completedMateriEl.innerText = completedMateri;
  if (totalPointsEl) totalPointsEl.innerText = totalPoints;
  if (completionRateEl) completionRateEl.innerText = completionRate + "%";
}

function saveMateriProgressToStats(materiId) {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (!stats) return;
  if (!stats.completedMateri) stats.completedMateri = [];

  if (!stats.completedMateri.includes(materiId)) {
    const materi = materiData.find((m) => m.id === materiId);
    if (materi) {
      stats.completedMateri.push(materiId);
      stats.materiSelesai =
        stats.completedMateri.length + (stats.completedLabs?.length || 0);
      stats.totalQuiz = (stats.totalQuiz || 0) + 1;
      stats.totalSkor = (stats.totalSkor || 0) + materi.points;
      stats.activityLog = stats.activityLog || [];
      stats.activityLog.unshift({
        text: `Materi "${materi.title}" selesai! +${materi.points} poin`,
        time: new Date().toISOString(),
        type: "materi",
      });
      const newBadges = checkBadgeMilestones(stats);
      stats.badgeCount += newBadges;
      localStorage.setItem("userStats", JSON.stringify(stats));
      localStorage.setItem("statsUpdate", Date.now().toString());
    }
  }
}

function renderMateri(category = "all") {
  const grid = document.getElementById("materiGrid");
  if (!grid) return;

  loadMateriProgress();
  updateMateriStatsSummary();

  let filteredMateri =
    category === "all"
      ? materiData
      : materiData.filter((m) => m.category === category);
  grid.innerHTML = "";

  filteredMateri.forEach((materi) => {
    const card = document.createElement("div");
    card.className = `materi-card ${materi.completed ? "completed" : ""}`;
    card.setAttribute("data-category", materi.category);
    card.onclick = () => openMateriDetail(materi.id);
    card.innerHTML = `
      <div class="materi-image"><i data-lucide="${materi.imageIcon}"></i>
        <span class="materi-badge ${materi.level}">${materi.level === "easy" ? "Mudah" : materi.level === "medium" ? "Sedang" : "Sulit"}</span>
      </div>
      <div class="materi-content">
        <h3>${materi.title}</h3>
        <p>${materi.description}</p>
        <div class="materi-meta">
          <span class="materi-duration"><i data-lucide="clock"></i> ${materi.duration}</span>
          <span class="materi-points">🏆 +${materi.points} poin</span>
        </div>
        <div class="progress-bar-small"><div class="progress-fill-small" style="width: ${materi.progress}%"></div></div>
        <button class="btn-mulai ${materi.completed ? "completed" : ""}" onclick="event.stopPropagation(); openMateriDetail(${materi.id})">
          ${materi.completed ? "✓ Selesai" : "Mulai Pelajari →"}
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function openMateriDetail(materiId) {
  currentMateriId = materiId;
  selectedQuizOption = null;

  const materi = materiData.find((m) => m.id === materiId);
  if (!materi) return;

  const modal = document.getElementById("materiDetailModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  if (!modal || !modalTitle || !modalBody) return;

  const resources = materiResources[materiId] || {
    videoUrl: "",
    videoTitle: "",
  };

  // ========== PERBAIKAN: Konversi URL Video ==========
  // =============================
  // KONVERSI LINK YOUTUBE
  // =============================

  function convertToEmbedUrl(url) {
    if (!url) return "";

    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("shorts/")) {
      videoId = url.split("shorts/")[1].split("?")[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  }

  const embedUrl = convertToEmbedUrl(resources.videoUrl);
  const hasVideo =
    embedUrl !== null && resources.videoUrl && resources.videoUrl.trim() !== "";
  const videoTitle =
    resources.videoTitle ||
    (hasVideo ? "Video Pembelajaran" : "Belum ada video");

  modalTitle.innerHTML = `${materi.completed ? "✓ " : "📚 "}${materi.title}`;

  modalBody.innerHTML = `
    <div class="materi-meta" style="margin-bottom: 20px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: space-between; align-items: center;">
      <span class="materi-duration"><i data-lucide="clock"></i> ${materi.duration}</span>
      <span class="materi-points" style="background: rgba(251,191,36,0.15); padding: 5px 12px; border-radius: 20px;">🏆 +${materi.points} poin</span>
      <span class="level-badge ${materi.level}" style="padding: 5px 12px; border-radius: 20px; background: ${materi.level === "easy" ? "rgba(34,197,94,0.15)" : materi.level === "medium" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"}; color: ${materi.level === "easy" ? "#4ade80" : materi.level === "medium" ? "#fbbf24" : "#f87171"};">${materi.level === "easy" ? "Mudah" : materi.level === "medium" ? "Sedang" : "Sulit"}</span>
    </div>
    
    <!-- VIDEO SECTION -->
    <div style="background: rgba(0,0,0,0.3); border-radius: 20px; padding: 20px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
        <i data-lucide="video" style="width: 22px; height: 22px; color: #c084fc;"></i>
        <span style="font-weight: 600; color: #c084fc;">Video Pembelajaran</span>
      </div>
      <div style="background: #0f172a; border-radius: 16px; overflow: hidden;">
        <div style="padding: 12px 16px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(99,102,241,0.2); text-align: center;">
          <span style="color: #94a3b8; font-size: 0.85rem;">${videoTitle}</span>
        </div>
        <div style="aspect-ratio: 16/9; background: #0a0f1a;">
          ${
            hasVideo
              ? `
            <iframe 
              style="
      width:100%;
      height:100%;
      border:none;
    "
    src="${embedUrl}"
    title="${videoTitle}"
    allow="
      accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture
    "
    allowfullscreen>
            </iframe>
          `
              : `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
              <i data-lucide="video-off" style="width: 48px; height: 48px; color: #64748b;"></i>
              <p style="color: #94a3b8;">Belum ada video untuk materi ini</p>
              <small style="color: #64748b;">Video akan ditambahkan oleh admin</small>
            </div>
          `
          }
        </div>
      </div>
    </div>
    
    <!-- MATERI CONTENT -->
    <h3 style="font-size: 1.1rem; font-weight: 700; margin: 24px 0 12px 0; color: #c084fc; display: flex; align-items: center; gap: 10px;">
      <i data-lucide="book-open" style="width: 20px; height: 20px;"></i> Ringkasan Materi
    </h3>
    <p style="color: #cbd5e1; line-height: 1.7; margin-bottom: 20px;">${materi.content.overview}</p>
    
    <h3 style="font-size: 1.1rem; font-weight: 700; margin: 24px 0 12px 0; color: #c084fc; display: flex; align-items: center; gap: 10px;">
      <i data-lucide="list" style="width: 20px; height: 20px;"></i> Topik yang Dipelajari
    </h3>
    <ul style="list-style: none; padding: 0;">
      ${materi.content.topics.map((topic) => `<li style="display: flex; align-items: center; gap: 10px; padding: 8px 0; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);"><i data-lucide="check-circle" style="width: 16px; height: 16px; color: #818cf8;"></i> ${topic}</li>`).join("")}
    </ul>
    
    ${
      !materi.completed
        ? `
      <div style="background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05)); border-radius: 24px; padding: 24px; margin-top: 28px; border: 1px solid rgba(99,102,241,0.2);">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
          <i data-lucide="help-circle" style="width: 22px; height: 22px; color: #fbbf24;"></i>
          <h3 style="font-size: 1rem; font-weight: 700; color: #fbbf24;">Kuis Pemahaman</h3>
        </div>
        <div style="margin-bottom: 24px;">
          <p style="font-weight: 700; color: #fff;">${materi.content.quiz.question}</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${materi.content.quiz.options
            .map(
              (opt, idx) => `
            <div class="quiz-option" onclick="selectQuizOptionMateri(${idx})" style="display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: rgba(255,255,255,0.03); border-radius: 14px; cursor: pointer; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.05);">
              <input type="radio" name="quiz" value="${idx}" id="opt_${idx}" style="accent-color: #818cf8; width: 18px; height: 18px; cursor: pointer;">
              <label for="opt_${idx}" style="cursor: pointer; flex: 1; color: #cbd5e1;">${opt}</label>
            </div>
          `,
            )
            .join("")}
        </div>
        <button class="btn-submit-quiz" onclick="submitQuizMateri(${materi.id})" style="background: linear-gradient(135deg, #6366f1, #a855f7); border: none; padding: 14px 28px; border-radius: 16px; color: white; font-weight: 700; cursor: pointer; margin-top: 24px; width: 100%; transition: all 0.3s;">
          <i data-lucide="send" style="width: 18px; height: 18px;"></i> Kirim Jawaban
        </button>
        <div id="quizResult" class="quiz-result" style="margin-top: 20px; padding: 16px; border-radius: 14px; display: none;"></div>
      </div>
    `
        : `
      <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(52,211,153,0.05)); border-radius: 20px; margin-top: 20px;">
        <i data-lucide="check-circle" style="width: 60px; height: 60px; color: #34d399; margin-bottom: 16px;"></i>
        <p style="color: #34d399; font-size: 1rem; font-weight: 600;">✓ Materi ini telah selesai Anda pelajari!</p>
      </div>
    `
    }
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeMateriModal() {
  const modal = document.getElementById("materiDetailModal");
  if (modal) modal.style.display = "none";
}

function selectQuizOptionMateri(optionIndex) {
  selectedQuizOption = optionIndex;
  const radios = document.querySelectorAll('input[name="quiz"]');
  radios.forEach((radio, idx) => {
    radio.checked = idx === optionIndex;
  });
}

function submitQuizMateri(materiId) {
  const materi = materiData.find((m) => m.id === materiId);
  if (!materi) return;

  const resultDiv = document.getElementById("quizResult");
  if (!resultDiv) return;

  if (selectedQuizOption === null) {
    resultDiv.className = "quiz-result incorrect";
    resultDiv.innerHTML = "❌ Silakan pilih jawaban terlebih dahulu!";
    return;
  }

  const isCorrect = selectedQuizOption === materi.content.quiz.correct;

  if (isCorrect) {
    resultDiv.className = "quiz-result correct";
    resultDiv.innerHTML = `✅ Jawaban benar! +${materi.points} poin! Materi telah selesai.`;
    if (!materi.completed) {
      materi.completed = true;
      materi.progress = 100;
      saveMateriProgressToStats(materiId);
      const activeCategory =
        document.querySelector(".category-tab.active")?.dataset.category ||
        "all";
      renderMateri(activeCategory);
    }
    setTimeout(() => closeMateriModal(), 2000);
  } else {
    resultDiv.className = "quiz-result incorrect";
    resultDiv.innerHTML = "❌ Jawaban kurang tepat. Coba baca materi lagi!";
  }
}

function setupMateriCategoryTabs() {
  const categoryTabs = document.querySelectorAll(".category-tab");
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderMateri(tab.dataset.category);
    });
  });
}

window.onclick = (e) => {
  const modal = document.getElementById("materiDetailModal");
  if (e.target === modal) closeMateriModal();
};

window.selectQuizOptionMateri = selectQuizOptionMateri;
window.submitQuizMateri = submitQuizMateri;
window.closeMateriModal = closeMateriModal;
window.openMateriDetail = openMateriDetail;
window.openVideoInput = openVideoInput;

function loadUserProfileToDashboard() {
  const userData = JSON.parse(localStorage.getItem("userProfile")) || {
    name: "Pengguna",
    email: "pengguna@example.com",
    username: "pengguna",
    joinDate: new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };

  const firstName = userData.name ? userData.name.charAt(0) : "P";

  // Update sidebar user profile
  const sidebarAvatar = document.getElementById("sidebarAvatar");
  const sidebarUserName = document.getElementById("sidebarUserName");
  if (sidebarAvatar) sidebarAvatar.innerText = firstName;
  if (sidebarUserName) sidebarUserName.innerText = userData.name;

  // Update header user card
  const dashboardAvatar = document.getElementById("dashboardAvatar");
  const dashboardUserName = document.getElementById("dashboardUserName");
  if (dashboardAvatar) dashboardAvatar.innerText = firstName;
  if (dashboardUserName) dashboardUserName.innerText = userData.name;

  // Update any other user info elements
  const allUserNames = document.querySelectorAll(
    ".user-info h4, .user-card h4, .profile-name",
  );
  allUserNames.forEach((el) => {
    if (el && !el.id) el.innerText = userData.name;
  });

  // Update avatar in materi page if exists
  const materiAvatar = document.querySelector(".avatar");
  if (materiAvatar && !materiAvatar.id) materiAvatar.innerText = firstName;
}

/* =========================================================
   LOGIN SYSTEM
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Silakan isi email dan password!");
      return;
    }

    const userData = {
      name: email.split("@")[0],
      email: email,
    };

    localStorage.setItem("skillscapeLogin", "true");
    localStorage.setItem("userProfile", JSON.stringify(userData));

    window.location.href = "dashboard.html";
  });
}

/* =========================================================
   PROTECT DASHBOARD
========================================================= */

const currentPage = window.location.pathname.split("/").pop();

if (
  currentPage === "dashboard.html" &&
  localStorage.getItem("skillscapeLogin") !== "true"
) {
  window.location.href = "login.html";
}

/* =========================================================
   LOGOUT SYSTEM
========================================================= */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    const confirmLogout = confirm("Apakah Anda yakin ingin logout?");

    if (confirmLogout) {
      localStorage.removeItem("skillscapeLogin");

      // Hapus jika ingin data user ikut hilang
      // localStorage.removeItem("userProfile");

      window.location.href = "index.html";
    }
  });
}

/* =========================================================
   LOAD USER PROFILE
========================================================= */

const profileData = localStorage.getItem("userProfile");

if (profileData) {
  const user = JSON.parse(profileData);

  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");

  if (profileName) {
    profileName.textContent = user.name;
  }

  if (profileEmail) {
    profileEmail.textContent = user.email;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "dashboard.html") {
    initializeDashboard();
  }

  if (currentPage === "materi.html") {
    initializeMateriPage();
  }

  loadUserProfileToDashboard();

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  if (window.location.pathname.includes("materi")) {
    initializeMateriPage();
  }

  if (window.location.pathname.includes("dashboard")) {
    initializeDashboard();
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});
