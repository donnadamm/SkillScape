/* ============================================================
   SIMULASI INTERAKTIF - MULTIPLE SCENARIOS
   ============================================================ */

// Data Simulasi - Berbagai Skenario (Email, SMS, Website, Social Media)
const dataSimulasi = [
  // 1. EMAIL PHISHING - BANK
  {
    id: 1,
    title: "Email Phishing - Bank",
    category: "email",
    description:
      "Anda menerima email mencurigakan yang mengaku dari bank. Identifikasi apakah ini phishing.",
    difficulty: "easy",
    points: 10,
    completed: false,
    email: {
      from: "support@bank-bca-security.com",
      to: "user@email.com",
      subject: "🔴 PERINGATAN: Verifikasi Akun Anda Segera!",
      badge: "⚠️ TANDA BERBAHAYA",
      badgeType: "danger",
      greeting: "Yth. Nasabah,",
      message:
        "Kami mendeteksi aktivitas mencurigakan pada akun Anda. Beberapa kali percobaan login gagal terdeteksi dari lokasi yang tidak dikenal. Untuk keamanan akun Anda, kami telah membatasi akses sementara.",
      warning:
        "Akun Anda akan ditutup permanen dalam 24 jam jika tidak segera diverifikasi!",
      buttonText: "Verifikasi Akun Sekarang",
      buttonType: "danger",
      footer: "Bank Aman - Jaga kerahasiaan data Anda.",
    },
    question: "Apa yang akan Anda lakukan terhadap email ini?",
    options: [
      "Klik link verifikasi untuk mengamankan akun",
      "Abaikan email tersebut",
      "Laporkan sebagai phishing ke bank melalui kontak resmi",
      "Balas email untuk konfirmasi",
    ],
    correct: 2,
    explanation:
      "Email phishing sering menggunakan kata-kata mendesak dan tautan palsu. Selalu verifikasi melalui kontak resmi bank!",
  },
  // 2. SMS PHISHING (SMISHING)
  {
    id: 2,
    title: "SMS Phishing - Paket",
    category: "sms",
    description:
      "Anda menerima SMS mengaku dari kurir yang meminta konfirmasi paket.",
    difficulty: "easy",
    points: 10,
    completed: false,
    sms: {
      from: "+6281234567890",
      message:
        "[JNE] Paket Anda sedang diproses. Karena alamat tidak lengkap, silakan klik link berikut untuk konfirmasi: http://jne-id.top/konfirmasi",
      badge: "⚠️ TIDAK RESMI",
      badgeType: "danger",
    },
    question: "Apa tindakan yang paling tepat?",
    options: [
      "Klik link untuk konfirmasi paket",
      "Abaikan dan hapus SMS",
      "Cek langsung ke aplikasi resmi JNE",
      "Balas SMS dengan data diri",
    ],
    correct: 2,
    explanation:
      "Jangan pernah klik link mencurigakan dari SMS. Selalu cek melalui aplikasi atau website resmi!",
  },
  // 3. PHONE CALL SIMULATION
  {
    id: 3,
    title: "Telepon Penipuan - CSR Bank",
    category: "phone",
    description:
      "Anda menerima telepon dari 'Customer Service Bank' yang meminta OTP.",
    difficulty: "medium",
    points: 15,
    completed: false,
    phone: {
      caller: "021-5085-8888 (mengaku Bank BCA)",
      message:
        "Selamat siang, saya dari Bank BCA. Ada transaksi mencurigakan di rekening Anda sebesar Rp 5.000.000. Untuk memblokir, kami perlu kode OTP yang akan dikirim ke HP Anda.",
      badge: "⚠️ MODUS PENIPUAN",
      badgeType: "danger",
    },
    question: "Apa yang harus Anda lakukan?",
    options: [
      "Berikan kode OTP untuk memblokir transaksi",
      "Tutup telepon dan hubungi bank melalui nomor resmi",
      "Ikuti instruksi penelpon",
      "Berikan data pribadi untuk verifikasi",
    ],
    correct: 1,
    explanation:
      "Bank TIDAK PERNAH meminta OTP melalui telepon. Matikan telepon dan hubungi bank via nomor resmi!",
  },
  // 4. WEBSITE PHISHING
  {
    id: 4,
    title: "Website Palsu - Shopee",
    category: "website",
    description:
      "Anda menemukan website yang mirip dengan Shopee dengan diskon besar-besaran.",
    difficulty: "medium",
    points: 15,
    completed: false,
    website: {
      url: "http://shoppe-promo.top",
      name: "Shopee Promo Spesial",
      message:
        "🎉 SELAMAT! Anda mendapatkan diskon 90% untuk semua produk. Klaim sekarang juga!",
      badge: "⚠️ DOMAIN MENYUSUPA",
      badgeType: "danger",
    },
    question: "Apa yang harus Anda lakukan?",
    options: [
      "Langsung belanja karena diskon besar",
      "Cek URL website apakah official (shopee.co.id)",
      "Masukkan login dan password",
      "Bagikan link ke teman",
    ],
    correct: 1,
    explanation:
      "Selalu periksa URL website. Website palsu biasanya menggunakan domain mencurigakan!",
  },
  // 5. SOCIAL MEDIA SCAM
  {
    id: 5,
    title: "Media Sosial - Giveaway",
    category: "social",
    description:
      "Anda melihat postingan giveaway di Instagram yang menjanjikan hadiah besar.",
    difficulty: "easy",
    points: 10,
    completed: false,
    social: {
      platform: "Instagram",
      from: "@official_giveaway_2024",
      message:
        "🎁 GIVEAWAY! Kami memberikan iPhone 15 Pro untuk 10 pemenang. Klik link di bio untuk mengikuti!",
      badge: "⚠️ AKUN PALSU",
      badgeType: "warning",
    },
    question: "Apa yang sebaiknya Anda lakukan?",
    options: [
      "Langsung klik link dan ikuti",
      "Abaikan dan laporkan akun tersebut",
      "Kirim data pribadi untuk verifikasi",
      "Share ke teman-teman",
    ],
    correct: 1,
    explanation:
      "Giveaway yang terlalu bagus biasanya penipuan. Jangan pernah klik link mencurigakan!",
  },
  // 6. QR CODE SCAM
  {
    id: 6,
    title: "QR Code Palsu - Parkir",
    category: "qrcode",
    description:
      "Di tempat parkir, ada stiker QR code untuk pembayaran yang tidak resmi.",
    difficulty: "medium",
    points: 15,
    completed: false,
    qrCode: {
      location: "Area Parkir Mall",
      message:
        "Scan QR code untuk pembayaran parkir. Pembayaran online lebih praktis!",
      badge: "⚠️ QRC TIDAK RESMI",
      badgeType: "danger",
    },
    question: "Apa yang harus Anda lakukan?",
    options: [
      "Scan QR dan ikuti instruksi",
      "Cek ke petugas parkir resmi terlebih dahulu",
      "Bayar langsung ke orang yang mengaku petugas",
      "Abaikan dan pergi begitu saja",
    ],
    correct: 1,
    explanation:
      "Selalu pastikan QR code resmi. Penipu bisa mengganti QR code untuk mencuri data!",
  },
  // 7. EMAIL - JOB SCAM
  {
    id: 7,
    title: "Lowongan Kerja Palsu",
    category: "email",
    description:
      "Anda mendapat email tawaran kerja dengan gaji besar tanpa proses wawancara.",
    difficulty: "medium",
    points: 15,
    completed: false,
    email: {
      from: "hrd@company-career.net",
      to: "user@email.com",
      subject: "🌟 SELAMAT! Anda Diterima Bekerja",
      badge: "⚠️ LOWONGAN PALSU",
      badgeType: "danger",
      greeting: "Kepada Yth. Calon Karyawan,",
      message:
        "Selamat! Anda telah kami terima bekerja di perusahaan kami. Gaji Rp 15.000.000/bulan. Sebelum mulai, kami memerlukan biaya administrasi sebesar Rp 500.000.",
      warning: "Pendaftaran hanya berlaku 24 jam!",
      buttonText: "Bayar Administrasi",
      buttonType: "danger",
      footer: "PT. Company Career - Rekrutmen Online",
    },
    question: "Apa yang harus Anda lakukan?",
    options: [
      "Segera bayar karena takut kehilangan kesempatan",
      "Abaikan - lowongan resmi tidak minta biaya",
      "Kirim data pribadi lengkap",
      "Follow up via email",
    ],
    correct: 1,
    explanation:
      "Lowongan kerja resmi TIDAK PERNAH meminta biaya apapun. Ini modus penipuan!",
  },
  // 8. EMAIL - INVOICE SCAM
  {
    id: 8,
    title: "Invoice Palsu - Langganan",
    category: "email",
    description:
      "Anda mendapat email invoice langganan yang tidak pernah Anda daftar.",
    difficulty: "hard",
    points: 20,
    completed: false,
    email: {
      from: "billing@netflix-account.com",
      to: "user@email.com",
      subject: "🧾 INVOICE: Pembayaran Gagal - Tindakan Diperlukan",
      badge: "⚠️ INVOICE PALSU",
      badgeType: "danger",
      greeting: "Pelanggan yang terhormat,",
      message:
        "Kami tidak dapat memproses pembayaran langganan Netflix Anda bulan ini. Akun Anda akan ditangguhkan.",
      warning: "Klik link di bawah untuk memperbarui metode pembayaran!",
      buttonText: "Perbarui Pembayaran",
      buttonType: "danger",
      footer: "Netflix - Streaming Worldwide",
    },
    question: "Apa yang harus Anda lakukan?",
    options: [
      "Klik link untuk perbarui pembayaran",
      "Cek langsung ke akun Netflix resmi",
      "Hubungi nomor di email",
      "Abaikan email",
    ],
    correct: 1,
    explanation:
      "Jika ragu, selalu cek langsung ke website/app resmi. Jangan klik link dari email!",
  },
];

// State
let userStatsSim = {
  completedSimulations: [],
  totalScore: 0,
};

// Load stats from localStorage
function loadSimStats() {
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (stats) {
    const completed = stats.completedLabs || [];
    userStatsSim.completedSimulations = completed;
    userStatsSim.totalScore = stats.totalSkor || 0;

    dataSimulasi.forEach((sim) => {
      sim.completed = completed.includes(`simulasi_${sim.id}`);
    });
  }
  updateStatsDisplay();
}

function updateStatsDisplay() {
  const totalSim = dataSimulasi.length;
  const completedSim = dataSimulasi.filter((s) => s.completed).length;
  const totalScore = userStatsSim.totalScore;
  const avgScore = completedSim > 0 ? Math.round(totalScore / completedSim) : 0;

  const simTersedia = document.getElementById("simulasiTersedia");
  const simSelesai = document.getElementById("simulasiSelesai");
  const totalSkor = document.getElementById("totalSkorSim");
  const rataSkor = document.getElementById("rataSkorSim");

  if (simTersedia) simTersedia.innerText = totalSim;
  if (simSelesai) simSelesai.innerText = completedSim;
  if (totalSkor) totalSkor.innerText = totalScore;
  if (rataSkor) rataSkor.innerText = avgScore + "%";
}

function renderSimulasiList() {
  const container = document.getElementById("simulasiList");
  if (!container) return;

  container.innerHTML = "";

  const categoryIcons = {
    email: "mail-search",
    sms: "message-square",
    phone: "phone",
    website: "globe",
    social: "instagram",
    qrcode: "qr-code",
  };

  dataSimulasi.forEach((sim) => {
    const card = document.createElement("div");
    card.className = `simulasi-card ${sim.completed ? "completed" : ""}`;
    card.onclick = () => openSimulasi(sim.id);

    const icon = categoryIcons[sim.category] || "shield";
    const difficultyText =
      sim.difficulty === "easy"
        ? "Mudah"
        : sim.difficulty === "medium"
          ? "Sedang"
          : "Sulit";

    card.innerHTML = `
            <div class="simulasi-card-header">
                <i data-lucide="${icon}"></i>
                <h3>${sim.title}</h3>
            </div>
            <div class="simulasi-card-body">
                <p>${sim.description}</p>
                <div class="simulasi-meta">
                    <span class="simulasi-difficulty ${sim.difficulty}">${difficultyText}</span>
                    <span class="simulasi-points">🏆 +${sim.points} poin</span>
                </div>
                <button class="btn-start-sim ${sim.completed ? "completed" : ""}" onclick="event.stopPropagation(); openSimulasi(${sim.id})">
                    ${sim.completed ? "✓ Selesai" : "▶ Mulai Simulasi"}
                </button>
            </div>
        `;
    container.appendChild(card);
  });

  if (typeof lucide !== "undefined") lucide.createIcons();
}

let currentSimulation = null;
let selectedOption = null;
let modal = null;

function openSimulasi(simId) {
  currentSimulation = dataSimulasi.find((s) => s.id === simId);
  if (!currentSimulation) return;

  modal = document.getElementById("simulasiModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  if (!modal || !modalTitle || !modalBody) return;

  modalTitle.innerHTML = currentSimulation.title;

  // Render content based on simulation type
  let contentHTML = "";

  if (currentSimulation.email) {
    // Email simulation
    const email = currentSimulation.email;
    const badgeClass =
      email.badgeType === "danger"
        ? "danger"
        : email.badgeType === "warning"
          ? "warning"
          : "info";
    const buttonClass =
      email.buttonType === "danger" ? "btn-verify" : "btn-action";

    contentHTML = `
            <div class="email-simulation">
                <div class="email-header">
                    <div class="email-field">
                        <span class="email-label">From:</span>
                        <span class="email-value">${email.from}</span>
                    </div>
                    <div class="email-field">
                        <span class="email-label">To:</span>
                        <span class="email-value">${email.to}</span>
                    </div>
                    <div class="email-field">
                        <span class="email-label">Subject:</span>
                        <span class="email-value email-subject">${email.subject}</span>
                    </div>
                    <div class="email-badge ${badgeClass}">${email.badge}</div>
                </div>
                <div class="email-body">
                    <div class="email-greeting">${email.greeting}</div>
                    <div class="email-message">${email.message}</div>
                    ${email.warning ? `<div class="email-warning-box"><p>⚠️ ${email.warning}</p></div>` : ""}
                    <div style="text-align: center;">
                        <a href="#" class="${buttonClass}" id="fakeActionBtn">${email.buttonText}</a>
                    </div>
                    <div class="email-footer">${email.footer}</div>
                </div>
            </div>
        `;
  } else if (currentSimulation.sms) {
    // SMS simulation
    const sms = currentSimulation.sms;
    const badgeClass = sms.badgeType === "danger" ? "danger" : "warning";

    contentHTML = `
            <div class="email-simulation">
                <div class="email-header">
                    <div class="email-field">
                        <span class="email-label">From:</span>
                        <span class="email-value">${sms.from}</span>
                    </div>
                    <div class="email-badge ${badgeClass}">${sms.badge}</div>
                </div>
                <div class="email-body">
                    <div class="email-message" style="background: #f1f5f9; padding: 16px; border-radius: 16px; margin-bottom: 0;">
                        ${sms.message}
                    </div>
                </div>
            </div>
        `;
  } else if (currentSimulation.phone) {
    // Phone simulation
    const phone = currentSimulation.phone;
    const badgeClass = phone.badgeType === "danger" ? "danger" : "warning";

    contentHTML = `
            <div class="email-simulation">
                <div class="email-header">
                    <div class="email-field">
                        <span class="email-label">From:</span>
                        <span class="email-value">${phone.caller}</span>
                    </div>
                    <div class="email-badge ${badgeClass}">${phone.badge}</div>
                </div>
                <div class="email-body">
                    <div class="email-message">"${phone.message}"</div>
                </div>
            </div>
        `;
  } else if (currentSimulation.website) {
    // Website simulation
    const website = currentSimulation.website;
    const badgeClass = website.badgeType === "danger" ? "danger" : "warning";

    contentHTML = `
            <div class="email-simulation">
                <div class="email-header">
                    <div class="email-field">
                        <span class="email-label">URL:</span>
                        <span class="email-value" style="color: #dc2626;">${website.url}</span>
                    </div>
                    <div class="email-field">
                        <span class="email-label">Site:</span>
                        <span class="email-value">${website.name}</span>
                    </div>
                    <div class="email-badge ${badgeClass}">${website.badge}</div>
                </div>
                <div class="email-body">
                    <div class="email-warning-box" style="background: #fef3c7;">
                        <p>🎉 ${website.message}</p>
                    </div>
                </div>
            </div>
        `;
  } else if (currentSimulation.social) {
    // Social media simulation
    const social = currentSimulation.social;
    const badgeClass = social.badgeType === "danger" ? "danger" : "warning";

    contentHTML = `
            <div class="email-simulation">
                <div class="email-header">
                    <div class="email-field">
                        <span class="email-label">Platform:</span>
                        <span class="email-value">${social.platform}</span>
                    </div>
                    <div class="email-field">
                        <span class="email-label">From:</span>
                        <span class="email-value">${social.from}</span>
                    </div>
                    <div class="email-badge ${badgeClass}">${social.badge}</div>
                </div>
                <div class="email-body">
                    <div class="email-message">${social.message}</div>
                </div>
            </div>
        `;
  } else if (currentSimulation.qrCode) {
    // QR Code simulation
    const qr = currentSimulation.qrCode;
    const badgeClass = qr.badgeType === "danger" ? "danger" : "warning";

    contentHTML = `
            <div class="email-simulation">
                <div class="email-header">
                    <div class="email-field">
                        <span class="email-label">Lokasi:</span>
                        <span class="email-value">${qr.location}</span>
                    </div>
                    <div class="email-badge ${badgeClass}">${qr.badge}</div>
                </div>
                <div class="email-body" style="text-align: center;">
                    <div style="width: 150px; height: 150px; background: #fff; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 1px solid #e2e8f0;">
                        <i data-lucide="qr-code" style="width: 80px; height: 80px; color: #1e293b;"></i>
                    </div>
                    <div class="email-message">${qr.message}</div>
                </div>
            </div>
        `;
  }

  modalBody.innerHTML = `
        <div class="simulation-two-columns">
            <!-- LEFT COLUMN - SCENARIO DISPLAY -->
            <div class="simulation-left-col">
                ${contentHTML}
            </div>
            
            <!-- RIGHT COLUMN - QUESTION & ACTIONS -->
            <div class="simulation-right-col">
                <div class="simulation-question">
                    <h4><i data-lucide="help-circle"></i> ${currentSimulation.question}</h4>
                    <div class="simulation-options" id="simOptions">
                        ${currentSimulation.options
                          .map(
                            (opt, idx) => `
                            <div class="sim-option-btn" data-opt="${idx}">
                                <div class="option-letter-sim">${String.fromCharCode(65 + idx)}</div>
                                <div class="option-text-sim">${opt}</div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
                
                <div class="tips-box">
                    <div class="tips-title">
                        <i data-lucide="lightbulb"></i>
                        <span>💡 Tips Keamanan Siber</span>
                    </div>
                    <p>Waspadai komunikasi yang meminta data pribadi, menggunakan kata-kata mendesak, atau mengandung tautan mencurigakan. Selalu verifikasi melalui saluran resmi!</p>
                </div>
                
                <div id="simFeedback" class="sim-feedback"></div>
                
                <div class="sim-action-buttons">
                    <button class="btn-reset-sim" id="resetSimBtn">Reset Pilihan</button>
                    <button class="btn-submit-sim" id="submitSimBtn">Kirim Jawaban</button>
                </div>
            </div>
        </div>
    `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  if (typeof lucide !== "undefined") lucide.createIcons();

  setupModalEvents();
}

function setupModalEvents() {
  selectedOption = null;

  // Option buttons
  const optionBtns = document.querySelectorAll(".sim-option-btn");
  optionBtns.forEach((btn) => {
    btn.onclick = () => {
      optionBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedOption = parseInt(btn.dataset.opt);
    };
  });

  // Fake action button warning
  const fakeBtn = document.getElementById("fakeActionBtn");
  if (fakeBtn) {
    fakeBtn.onclick = (e) => {
      e.preventDefault();
      showFeedback(
        -1,
        false,
        "⚠️ PERINGATAN! Ini adalah tautan/link mencurigakan! Jangan pernah klik tautan dari sumber yang tidak dikenal.",
      );
    };
  }

  // Submit button
  const submitBtn = document.getElementById("submitSimBtn");
  if (submitBtn) {
    submitBtn.onclick = () => submitAnswer();
  }

  // Reset button
  const resetBtn = document.getElementById("resetSimBtn");
  if (resetBtn) {
    resetBtn.onclick = () => resetModal();
  }
}

function showFeedback(selected, isCorrect, message) {
  const feedbackDiv = document.getElementById("simFeedback");
  if (!feedbackDiv) return;

  const feedbackType = isCorrect ? "correct" : "wrong";
  const icon = isCorrect ? "check-circle" : "alert-circle";
  const title = isCorrect ? "✅ Jawaban Benar!" : "❌ Jawaban Kurang Tepat";

  feedbackDiv.innerHTML = `
        <div class="feedback-title">
            <i data-lucide="${icon}"></i>
            <span>${title}</span>
        </div>
        <div class="feedback-text">${message}</div>
    `;
  feedbackDiv.className = `sim-feedback ${feedbackType}`;

  if (typeof lucide !== "undefined") lucide.createIcons();
}

function submitAnswer() {
  if (selectedOption === null) {
    showFeedback(null, false, "Silakan pilih jawaban terlebih dahulu!");
    return;
  }

  const isCorrect = selectedOption === currentSimulation.correct;
  const message = isCorrect
    ? `✅ Benar! ${currentSimulation.explanation} +${currentSimulation.points} poin!`
    : `❌ Kurang tepat. ${currentSimulation.explanation}`;

  showFeedback(selectedOption, isCorrect, message);

  if (isCorrect && !currentSimulation.completed) {
    currentSimulation.completed = true;

    const stats = JSON.parse(localStorage.getItem("userStats"));
    if (stats) {
      if (!stats.completedLabs) stats.completedLabs = [];
      if (!stats.completedLabs.includes(`simulasi_${currentSimulation.id}`)) {
        stats.completedLabs.push(`simulasi_${currentSimulation.id}`);
        stats.simulasiSelesai = (stats.simulasiSelesai || 0) + 1;
        stats.totalQuiz = (stats.totalQuiz || 0) + 1;
        stats.totalSkor = (stats.totalSkor || 0) + currentSimulation.points;
        stats.activityLog = stats.activityLog || [];
        stats.activityLog.unshift({
          text: `Simulasi "${currentSimulation.title}" selesai! +${currentSimulation.points} poin`,
          time: new Date().toISOString(),
          type: "lab",
        });
        localStorage.setItem("userStats", JSON.stringify(stats));
        localStorage.setItem("statsUpdate", Date.now().toString());

        userStatsSim.completedSimulations = stats.completedLabs;
        userStatsSim.totalScore = stats.totalSkor;
      }
    }

    updateStatsDisplay();
    renderSimulasiList();

    // Tampilkan tombol navigasi setelah jawaban benar
    showNavigationButtons();
  }

  const submitBtn = document.getElementById("submitSimBtn");
  if (submitBtn) submitBtn.disabled = true;
}

// Fungsi untuk menampilkan tombol navigasi
function showNavigationButtons() {
  const actionButtons = document.querySelector(".sim-action-buttons");
  if (!actionButtons) return;

  // Sembunyikan tombol reset dan submit
  const resetBtn = document.getElementById("resetSimBtn");
  const submitBtn = document.getElementById("submitSimBtn");
  if (resetBtn) resetBtn.style.display = "none";
  if (submitBtn) submitBtn.style.display = "none";

  // Cek apakah masih ada simulasi yang belum selesai
  const remainingSimulations = dataSimulasi.filter((s) => !s.completed).length;

  // Buat tombol navigasi
  let navButtonsHTML = "";

  if (remainingSimulations > 0) {
    navButtonsHTML = `
            <button class="btn-next-sim" id="nextSimBtn">
                <i data-lucide="arrow-right"></i> Simulasi Berikutnya
            </button>
            <button class="btn-back-list" id="backToListBtn">
                <i data-lucide="list"></i> Kembali ke Daftar
            </button>
        `;
  } else {
    navButtonsHTML = `
            <button class="btn-celebrate" id="celebrateBtn">
                <i data-lucide="trophy"></i> 🎉 Selamat! Semua Simulasi Selesai 🎉
            </button>
            <button class="btn-back-list" id="backToListBtn">
                <i data-lucide="list"></i> Kembali ke Daftar
            </button>
        `;
  }

  actionButtons.innerHTML = navButtonsHTML;

  if (typeof lucide !== "undefined") lucide.createIcons();

  // Event listeners untuk tombol navigasi
  const nextSimBtn = document.getElementById("nextSimBtn");
  if (nextSimBtn) {
    nextSimBtn.addEventListener("click", () => {
      // Cari simulasi berikutnya yang belum selesai
      const nextSim = dataSimulasi.find((s) => !s.completed);
      if (nextSim) {
        closeSimulasiModal();
        setTimeout(() => openSimulasi(nextSim.id), 300);
      } else {
        closeSimulasiModal();
      }
    });
  }

  const backToListBtn = document.getElementById("backToListBtn");
  if (backToListBtn) {
    backToListBtn.addEventListener("click", () => {
      closeSimulasiModal();
    });
  }

  const celebrateBtn = document.getElementById("celebrateBtn");
  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", () => {
      closeSimulasiModal();
    });
  }
}

function resetModal() {
  selectedOption = null;
  const feedbackDiv = document.getElementById("simFeedback");
  if (feedbackDiv) {
    feedbackDiv.innerHTML = "";
    feedbackDiv.className = "sim-feedback";
  }

  const optionBtns = document.querySelectorAll(".sim-option-btn");
  optionBtns.forEach((btn) => btn.classList.remove("selected"));

  const submitBtn = document.getElementById("submitSimBtn");
  if (submitBtn) submitBtn.disabled = false;
}

function closeSimulasiModal() {
  const modal = document.getElementById("simulasiModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadSimStats();
  renderSimulasiList();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("skillscapeLogin");
      window.location.href = "index.html";
    });
  }
});

window.closeSimulasiModal = closeSimulasiModal;
