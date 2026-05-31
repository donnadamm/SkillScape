/* ============================================================
   PROGRESS PAGE - JAVASCRIPT (LIVE FROM USER DATA)
   ============================================================ */

// Data untuk grafik
let progressChart = null;
let categoryChart = null;

// Data perkembangan (dari user activity)
let progressData = {
  labels: [],
  values: [],
};

// Data kategori (dari materi yang sudah diselesaikan)
let categoryData = {
  labels: ["Dasar", "Keamanan", "Lanjutan"],
  values: [0, 0, 0],
  colors: ["#a855f7", "#3b82f6", "#10b981"],
};

// Data Badge (berdasarkan pencapaian)
let badgesData = [];

// Data aktivitas
let activities = [];

// Modal variables
let badgeAchievementModal = null;
let allBadgesModal = null;
let previousEarnedBadges = [];

// ========== FUNGSI UTAMA ==========

function initProgress() {
  loadStatsFromStorage();
  processUserData();
  initCharts();
  renderBadges();
  renderActivities();
}

function loadStatsFromStorage() {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  return stats;
}

function processUserData() {
  const stats = loadStatsFromStorage();

  // ========== 1. HITUNG STATISTIK UTAMA ==========
  const totalMateri = 8;
  const materiSelesai = stats?.completedMateri
    ? stats.completedMateri.length
    : 0;
  const materiPercent = Math.round((materiSelesai / totalMateri) * 100);

  const totalSimulasi = 8;
  const simulasiSelesai = stats?.completedLabs ? stats.completedLabs.length : 0;
  const simulasiPercent = Math.round((simulasiSelesai / totalSimulasi) * 100);

  const avgScore =
    stats?.totalQuiz > 0 ? Math.round(stats.totalSkor / stats.totalQuiz) : 0;

  const totalProgress = (materiPercent + simulasiPercent + avgScore) / 3;
  let level = "Pemula";
  let levelPercent = 20;

  if (totalProgress >= 80) {
    level = "Ahli";
    levelPercent = 90;
  } else if (totalProgress >= 60) {
    level = "Mahir";
    levelPercent = 75;
  } else if (totalProgress >= 40) {
    level = "Menengah";
    levelPercent = 55;
  } else if (totalProgress >= 20) {
    level = "Lanjutan Pemula";
    levelPercent = 35;
  }

  // Update DOM
  document.getElementById("totalMateriStat").innerHTML =
    `${materiSelesai}<span style="font-size: 1rem; color: #64748b;">/${totalMateri}</span>`;
  document.getElementById("totalSimulasiStat").innerHTML =
    `${simulasiSelesai}<span style="font-size: 1rem; color: #64748b;">/${totalSimulasi}</span>`;
  document.getElementById("avgScoreStat").innerHTML =
    `${avgScore}<span style="font-size: 1rem; color: #64748b;">%</span>`;
  document.getElementById("levelStat").innerHTML = level;

  document.getElementById("materiProgressFill").style.width =
    `${materiPercent}%`;
  document.getElementById("materiPercent").innerHTML = `${materiPercent}%`;
  document.getElementById("simulasiProgressFill").style.width =
    `${simulasiPercent}%`;
  document.getElementById("simulasiPercent").innerHTML = `${simulasiPercent}%`;
  document.getElementById("scoreProgressFill").style.width = `${avgScore}%`;
  document.getElementById("scorePercent").innerHTML = `${avgScore}%`;
  document.getElementById("levelProgressFill").style.width = `${levelPercent}%`;
  document.getElementById("levelPercent").innerHTML = `${levelPercent}%`;

  // ========== 2. PROSES DATA KATEGORI ==========
  const materiData = [
    { id: 1, title: "Pengantar Keamanan Siber", category: "dasar" },
    { id: 2, title: "Jenis-jenis Malware", category: "dasar" },
    { id: 3, title: "Keamanan Password", category: "keamanan" },
    { id: 4, title: "Deteksi Phishing", category: "keamanan" },
    { id: 5, title: "Keamanan Jaringan", category: "keamanan" },
    { id: 6, title: "Enkripsi Data", category: "lanjutan" },
    { id: 7, title: "Forensik Digital", category: "lanjutan" },
    { id: 8, title: "Incident Response", category: "lanjutan" },
  ];

  const completedMateri = stats?.completedMateri || [];
  const dasarCompleted = materiData.filter(
    (m) => m.category === "dasar" && completedMateri.includes(m.id),
  ).length;
  const keamananCompleted = materiData.filter(
    (m) => m.category === "keamanan" && completedMateri.includes(m.id),
  ).length;
  const lanjutanCompleted = materiData.filter(
    (m) => m.category === "lanjutan" && completedMateri.includes(m.id),
  ).length;

  const totalDasar = materiData.filter((m) => m.category === "dasar").length;
  const totalKeamanan = materiData.filter(
    (m) => m.category === "keamanan",
  ).length;
  const totalLanjutan = materiData.filter(
    (m) => m.category === "lanjutan",
  ).length;

  categoryData.values = [
    Math.round((dasarCompleted / totalDasar) * 100),
    Math.round((keamananCompleted / totalKeamanan) * 100),
    Math.round((lanjutanCompleted / totalLanjutan) * 100),
  ];

  // ========== 3. PROSES DATA GRAFIK ==========
  const activityLog = stats?.activityLog || [];
  const last7Days = getLast7Days();
  progressData.labels = last7Days.map(
    (d) => `${d.getDate()} ${getMonthName(d.getMonth())}`,
  );
  progressData.values = last7Days.map((day) => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    const dayActivities = activityLog.filter((a) => {
      const activityDate = new Date(a.time);
      return activityDate >= dayStart && activityDate <= dayEnd;
    });
    let progress = 0;
    dayActivities.forEach((activity) => {
      if (activity.type === "materi") progress += 8;
      else if (activity.type === "lab") progress += 10;
      else if (activity.type === "badge") progress += 15;
      else progress += 3;
    });
    return Math.min(progress, 100);
  });

  // ========== 4. PROSES BADGE ==========
  badgesData = [
    {
      id: 1,
      name: "🛡️ Anti Phishing",
      desc: "Berhasil mendeteksi email phishing",
      requirement: "Selesaikan simulasi phishing",
      icon: "mail-search",
      earned: stats?.completedLabs?.includes("phishing") || false,
      date: getEarnedDate(stats?.activityLog, "phishing"),
    },
    {
      id: 2,
      name: "🔐 Password Master",
      desc: "Membuat password super kuat",
      requirement: "Selesaikan materi Password Security",
      icon: "key",
      earned: stats?.completedMateri?.includes(3) || false,
      date: getEarnedDate(stats?.activityLog, "Password Security"),
    },
    {
      id: 3,
      name: "🕵️ Privacy Defender",
      desc: "Memahami pentingnya privasi data",
      requirement: "Skor kuis > 70%",
      icon: "shield",
      earned: avgScore >= 70,
      date: null,
    },
    {
      id: 4,
      name: "🐛 Malware Hunter",
      desc: "Mengenal berbagai jenis malware",
      requirement: "Selesaikan materi Malware",
      icon: "bug",
      earned: stats?.completedMateri?.includes(2) || false,
      date: getEarnedDate(stats?.activityLog, "Malware"),
    },
    {
      id: 5,
      name: "🌐 Network Guardian",
      desc: "Memahami keamanan jaringan",
      requirement: "Selesaikan materi Keamanan Jaringan",
      icon: "wifi",
      earned: stats?.completedMateri?.includes(5) || false,
      date: getEarnedDate(stats?.activityLog, "Keamanan Jaringan"),
    },
    {
      id: 6,
      name: "🎯 Phishing Spotter",
      desc: "Ahli mendeteksi phishing",
      requirement: "Selesaikan 3 simulasi phishing",
      icon: "target",
      earned:
        (stats?.completedLabs?.filter((l) => l === "phishing").length || 0) >=
        3,
      date: null,
    },
    {
      id: 7,
      name: "📚 Knowledge Seeker",
      desc: "Menyelesaikan semua materi",
      requirement: "Selesaikan 8 materi",
      icon: "book-open",
      earned: materiSelesai >= 8,
      date: null,
    },
    {
      id: 8,
      name: "⚡ Speed Learner",
      desc: "Menyelesaikan 5 simulasi",
      requirement: "Selesaikan 5 simulasi",
      icon: "zap",
      earned: simulasiSelesai >= 5,
      date: null,
    },
    {
      id: 9,
      name: "🏆 Master of Cyber",
      desc: "Mencapai level Ahli",
      requirement: "Level keamanan Ahli",
      icon: "trophy",
      earned: totalProgress >= 80,
      date: null,
    },
  ];

  // Check for new badges
  checkNewBadges();

  // ========== 5. PROSES AKTIVITAS ==========
  activities = activityLog.slice(0, 10).map((activity) => ({
    ...activity,
    formattedDate: formatDate(activity.time),
  }));
}

function getEarnedDate(activityLog, keyword) {
  if (!activityLog) return null;
  const activity = activityLog.find((a) => a.text.includes(keyword));
  if (activity) {
    const date = new Date(activity.time);
    return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
  }
  return null;
}

function getLast7Days() {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
}

function getMonthName(month) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  return months[month];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return "Kemarin";
  return `${date.getDate()} ${getMonthName(date.getMonth())}`;
}

function initCharts() {
  const ctx = document.getElementById("progressChart").getContext("2d");
  const categoryCtx = document.getElementById("categoryChart").getContext("2d");

  if (progressChart) progressChart.destroy();
  if (categoryChart) categoryChart.destroy();

  progressChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: progressData.labels,
      datasets: [
        {
          label: "Progress Belajar (%)",
          data: progressData.values,
          borderColor: "#818cf8",
          backgroundColor: "rgba(129, 140, 248, 0.1)",
          borderWidth: 3,
          pointBackgroundColor: "#a855f7",
          pointBorderColor: "#fff",
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { labels: { color: "#94a3b8", font: { size: 12 } } },
        tooltip: {
          backgroundColor: "#1e293b",
          titleColor: "#fff",
          bodyColor: "#94a3b8",
          borderColor: "#6366f1",
          borderWidth: 1,
          callbacks: { label: (context) => `Progress: ${context.raw}%` },
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          grid: { color: "rgba(148, 163, 184, 0.1)" },
          ticks: { color: "#94a3b8", callback: (v) => v + "%" },
        },
        x: {
          grid: { color: "rgba(148, 163, 184, 0.1)" },
          ticks: { color: "#94a3b8" },
        },
      },
    },
  });

  categoryChart = new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: categoryData.labels,
      datasets: [
        {
          data: categoryData.values,
          backgroundColor: categoryData.colors,
          borderWidth: 0,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#1e293b",
          titleColor: "#fff",
          bodyColor: "#94a3b8",
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}% selesai`,
          },
        },
      },
    },
  });

  const legendContainer = document.getElementById("categoryLegend");
  if (legendContainer) {
    legendContainer.innerHTML = "";
    categoryData.labels.forEach((label, index) => {
      const legendItem = document.createElement("div");
      legendItem.className = "legend-item";
      legendItem.innerHTML = `<div class="legend-color" style="background: ${categoryData.colors[index]}"></div><span>${label}</span><span style="color: #fff;">${categoryData.values[index]}%</span>`;
      legendContainer.appendChild(legendItem);
    });
  }
}

// ========== BADGE MODAL FUNCTIONS ==========

function showBadgeAchievement(badgeName, badgeDesc, badgeIcon = "trophy") {
  if (!badgeAchievementModal) {
    badgeAchievementModal = document.getElementById("badgeAchievementModal");
  }

  const newBadgeName = document.getElementById("newBadgeName");
  const newBadgeDesc = document.getElementById("newBadgeDesc");
  const badgeIconElement = document.querySelector(
    "#badgeAchievementModal .badge-achievement-icon i",
  );

  if (newBadgeName) newBadgeName.innerText = badgeName;
  if (newBadgeDesc) newBadgeDesc.innerText = badgeDesc;
  if (badgeIconElement) {
    badgeIconElement.setAttribute("data-lucide", badgeIcon);
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  if (badgeAchievementModal) {
    badgeAchievementModal.style.display = "flex";
    setTimeout(() => {
      closeBadgeAchievementModal();
    }, 5000);
  }
}

function closeBadgeAchievementModal() {
  if (badgeAchievementModal) badgeAchievementModal.style.display = "none";
}

function showAllBadges() {
  if (!allBadgesModal)
    allBadgesModal = document.getElementById("allBadgesModal");

  const allBadgesGrid = document.getElementById("allBadgesGrid");
  if (!allBadgesGrid) return;

  allBadgesGrid.innerHTML = "";
  badgesData.forEach((badge) => {
    const badgeItem = document.createElement("div");
    badgeItem.className = `all-badge-item ${!badge.earned ? "locked" : ""}`;
    badgeItem.innerHTML = `
            <div class="all-badge-icon"><i data-lucide="${badge.icon}"></i></div>
            <div class="all-badge-name">${badge.name}</div>
            <div class="all-badge-desc">${badge.desc}</div>
            <div class="all-badge-status ${badge.earned ? "earned" : "locked"}">
                ${badge.earned ? (badge.date ? `🏆 Diperoleh ${badge.date}` : "✓ Diperoleh") : `🔒 ${badge.requirement}`}
            </div>
        `;
    allBadgesGrid.appendChild(badgeItem);
  });

  if (typeof lucide !== "undefined") lucide.createIcons();
  if (allBadgesModal) allBadgesModal.style.display = "flex";
}

function closeAllBadgesModal() {
  if (allBadgesModal) allBadgesModal.style.display = "none";
}

function checkNewBadges() {
  const currentEarnedBadges = badgesData
    .filter((b) => b.earned)
    .map((b) => b.id);
  const newBadges = currentEarnedBadges.filter(
    (id) => !previousEarnedBadges.includes(id),
  );

  newBadges.forEach((badgeId) => {
    const badge = badgesData.find((b) => b.id === badgeId);
    if (badge) showBadgeAchievement(badge.name, badge.desc, badge.icon);
  });
  previousEarnedBadges = [...currentEarnedBadges];
}

function renderBadges() {
  const badgesGrid = document.getElementById("badgesGrid");
  if (!badgesGrid) return;

  badgesGrid.innerHTML = "";
  const earnedBadges = badgesData.filter((b) => b.earned).slice(0, 6);

  if (earnedBadges.length === 0) {
    badgesGrid.innerHTML = `<div class="badge-card" style="grid-column: 1/-1; text-align: center; padding: 40px;">
            <div class="badge-icon"><i data-lucide="award"></i></div>
            <div class="badge-name">Belum Ada Badge</div>
            <div class="badge-desc">Selesaikan lebih banyak materi dan simulasi untuk mendapatkan badge!</div>
        </div>`;
  } else {
    earnedBadges.forEach((badge) => {
      const badgeCard = document.createElement("div");
      badgeCard.className = "badge-card";
      badgeCard.innerHTML = `
                <div class="badge-icon"><i data-lucide="${badge.icon}"></i></div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-desc">${badge.desc}</div>
                <div class="badge-earned">🏆 Diperoleh ${badge.date || "baru!"}</div>
            `;
      badgesGrid.appendChild(badgeCard);
    });
  }

  if (typeof lucide !== "undefined") lucide.createIcons();

  const viewAllBtn = document.querySelector(".badges-header .view-all");
  if (viewAllBtn) {
    const newViewAllBtn = viewAllBtn.cloneNode(true);
    viewAllBtn.parentNode.replaceChild(newViewAllBtn, viewAllBtn);
    newViewAllBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAllBadges();
    });
  }
}

function renderActivities() {
  const timeline = document.getElementById("activityTimeline");
  if (!timeline) return;
  timeline.innerHTML = "";

  if (activities.length === 0) {
    timeline.innerHTML = `<div class="activity-item"><div class="activity-content"><div class="activity-text">Belum ada aktivitas. Mulai belajar sekarang!</div></div></div>`;
    return;
  }

  activities.forEach((activity) => {
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";

    let icon = "check-circle";
    if (activity.type === "lab") icon = "terminal";
    else if (activity.type === "badge") icon = "award";
    else if (activity.type === "materi") icon = "book-open";
    else if (activity.type === "welcome") icon = "home";

    // Extract points from text
    const pointsMatch = activity.text.match(/\+(\d+)/);
    const pointsValue = pointsMatch ? pointsMatch[1] : null;

    // Clean text without points for display
    let cleanText = activity.text;
    if (pointsMatch) {
      cleanText = cleanText.replace(/\+\d+ poin/, "").trim();
    }

    const pointText = pointsValue
      ? `<span class="activity-points">+${pointsValue} poin</span>`
      : "";

    activityItem.innerHTML = `
      <div class="activity-icon"><i data-lucide="${icon}"></i></div>
      <div class="activity-content">
        <div class="activity-text">${cleanText}</div>
        <div class="activity-time">${activity.formattedDate || formatDate(activity.time)}</div>
      </div>
      ${pointText}
    `;
    timeline.appendChild(activityItem);
  });

  if (typeof lucide !== "undefined") lucide.createIcons();
}

// Tambahkan fungsi untuk support
function showSupportModal() {
  // Create modal if not exists
  let supportModal = document.getElementById("supportModal");

  if (!supportModal) {
    supportModal = document.createElement("div");
    supportModal.id = "supportModal";
    supportModal.className = "support-modal";
    supportModal.innerHTML = `
            <div class="support-modal-content">
                <div class="support-modal-header">
                    <h3>💬 Hubungi Support</h3>
                    <button class="support-modal-close">&times;</button>
                </div>
                <div class="support-modal-body">
                    <div class="support-contact-options">
                        <div class="support-option" onclick="window.open('https://mail.google.com/mail/?view=cm&fs=1&to=nengwae82217@gmail.com', '_blank')">
                            <i data-lucide="mail"></i>
                            <div class="support-option-info">
                                <h4>Email</h4>
                                <p>nengwae82217@gmail.com</p>
                            </div>
                        </div>
                        <div class="support-option" onclick="window.open('https://wa.me/6281273487877?text=Halo%20Admin%20SkillScape,%20saya%20butuh%20bantuan.', '_blank')">
                            <i data-lucide="message-circle"></i>
                            <div class="support-option-info">
                                <h4>WhatsApp</h4>
                                <p>+62 812-7348-7877</p>
                            </div>
                        </div>
                    </div>
                    <div class="support-message">
                        <p>Hubungi langsung: <strong>+62 812-7348-7877</strong></p>
                        <p class="support-hours">Jam operasional: Senin - Jumat, 09:00 - 17:00 WIB</p>
                    </div>
                </div>
            </div>
        `;
    document.body.appendChild(supportModal);

    // Add styles for support modal
    const style = document.createElement("style");
    style.textContent = `
            .support-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(20px);
                z-index: 3000;
                justify-content: center;
                align-items: center;
            }
            .support-modal-content {
                background: linear-gradient(135deg, #1e293b, #0f172a);
                border-radius: 28px;
                max-width: 450px;
                width: 90%;
                border: 1px solid rgba(99, 102, 241, 0.3);
                animation: modalFadeIn 0.3s ease;
            }
            .support-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(99, 102, 241, 0.15);
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
                border-radius: 28px 28px 0 0;
            }
            .support-modal-header h3 {
                font-size: 1.3rem;
                font-weight: 700;
                background: linear-gradient(135deg, #fff, #c084fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .support-modal-close {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                width: 36px;
                height: 36px;
                border-radius: 12px;
                color: #94a3b8;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s;
            }
            .support-modal-close:hover {
                background: rgba(239, 68, 68, 0.2);
                color: #f87171;
            }
            .support-modal-body {
                padding: 24px;
            }
            .support-contact-options {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-bottom: 24px;
            }
            .support-option {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.03);
                border-radius: 16px;
                cursor: pointer;
                transition: all 0.3s;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .support-option:hover {
                background: rgba(99, 102, 241, 0.1);
                border-color: rgba(99, 102, 241, 0.3);
                transform: translateX(5px);
            }
            .support-option i {
                width: 36px;
                height: 36px;
                color: #818cf8;
            }
            .support-option-info h4 {
                font-size: 1rem;
                font-weight: 600;
                color: #fff;
                margin-bottom: 4px;
            }
            .support-option-info p {
                font-size: 0.8rem;
                color: #94a3b8;
            }
            .support-message {
                text-align: center;
                padding: 16px;
                background: rgba(99, 102, 241, 0.05);
                border-radius: 16px;
                margin-top: 8px;
            }
            .support-message p {
                color: #94a3b8;
                font-size: 0.85rem;
                margin-bottom: 8px;
            }
            .support-message strong {
                color: #c084fc;
            }
            .support-hours {
                font-size: 0.75rem;
                color: #64748b;
            }
        `;
    document.head.appendChild(style);
  }

  // Re-initialize icons
  if (typeof lucide !== "undefined") lucide.createIcons();

  supportModal.style.display = "flex";

  // Close button
  const closeBtn = supportModal.querySelector(".support-modal-close");
  closeBtn.onclick = () => {
    supportModal.style.display = "none";
  };

  // Click outside to close
  supportModal.onclick = (e) => {
    if (e.target === supportModal) {
      supportModal.style.display = "none";
    }
  };
}

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  initProgress();

  // Initialize modals
  badgeAchievementModal = document.getElementById("badgeAchievementModal");
  allBadgesModal = document.getElementById("allBadgesModal");

  const closeBadgeBtn = document.getElementById("closeBadgeModal");
  if (closeBadgeBtn)
    closeBadgeBtn.addEventListener("click", closeBadgeAchievementModal);

  const closeAllBadgesBtn = document.getElementById("closeAllBadgesModal");
  if (closeAllBadgesBtn)
    closeAllBadgesBtn.addEventListener("click", closeAllBadgesModal);

  if (badgeAchievementModal) {
    badgeAchievementModal.addEventListener("click", (e) => {
      if (e.target === badgeAchievementModal) closeBadgeAchievementModal();
    });
  }
  if (allBadgesModal) {
    allBadgesModal.addEventListener("click", (e) => {
      if (e.target === allBadgesModal) closeAllBadgesModal();
    });
  }

  const chartPeriod = document.getElementById("chartPeriod");
  if (chartPeriod) {
    chartPeriod.addEventListener("change", (e) =>
      console.log(`Change period to ${e.target.value} days`),
    );
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("skillscapeLogin");
      window.location.href = "index.html";
    });
  }

  const supportBtn = document.querySelector(".support-btn");
  if (supportBtn) {
    supportBtn.addEventListener("click", showSupportModal);
  }
});
