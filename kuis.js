/* ============================================================
   KUIS PENGETAHUAN KEAMANAN SIBER
   ============================================================ */

// Data Soal Kuis
const kuisQuestions = [
  {
    id: 1,
    category: "dasar",
    question: "Apa kepanjangan dari CIA dalam keamanan siber?",
    options: [
      "Central Intelligence Agency",
      "Confidentiality, Integrity, Availability",
      "Cyber Internet Access",
      "Computer Intelligence Algorithm",
    ],
    correct: 1,
    points: 10,
    explanation:
      "CIA Triad adalah prinsip dasar keamanan informasi: Kerahasiaan (Confidentiality), Integritas (Integrity), dan Ketersediaan (Availability).",
  },
  {
    id: 2,
    category: "dasar",
    question: "Apa yang dimaksud dengan 'Phishing'?",
    options: [
      "Memancing ikan",
      "Teknik mencuri data dengan menyamar sebagai entitas terpercaya",
      "Jenis malware",
      "Enkripsi data",
    ],
    correct: 1,
    points: 10,
    explanation:
      "Phishing adalah serangan siber di mana pelaku menyamar sebagai institusi terpercaya untuk mencuri data sensitif.",
  },
  {
    id: 3,
    category: "dasar",
    question: "Apa fungsi utama dari firewall?",
    options: [
      "Mempercepat koneksi internet",
      "Memantau dan mengontrol lalu lintas jaringan",
      "Menyimpan cadangan data",
      "Menginstal antivirus",
    ],
    correct: 1,
    points: 10,
    explanation:
      "Firewall bertindak sebagai gerbang keamanan yang menyaring lalu lintas jaringan berdasarkan aturan yang ditentukan.",
  },
  {
    id: 4,
    category: "dasar",
    question: "Manakah password berikut yang PALING aman?",
    options: ["password123", "qwerty123", "P@ssw0rd!2024#Secure", "admin2024"],
    correct: 2,
    points: 10,
    explanation:
      "Password kuat minimal 12 karakter dengan kombinasi huruf besar, kecil, angka, dan simbol.",
  },
  {
    id: 5,
    category: "keamanan",
    question: "Apa itu Two-Factor Authentication (2FA)?",
    options: [
      "Password dua kali",
      "Lapisan keamanan kedua selain password",
      "Password diganti 2 minggu",
      "Login dengan 2 akun",
    ],
    correct: 1,
    points: 10,
    explanation:
      "2FA menambah lapisan keamanan ekstra seperti kode OTP atau sidik jari selain password.",
  },
  {
    id: 6,
    category: "keamanan",
    question: "Apa perbedaan utama antara Virus dan Worm?",
    options: [
      "Virus butuh file host, Worm menyebar sendiri",
      "Virus lebih berbahaya",
      "Worm hanya di Windows",
      "Sama saja",
    ],
    correct: 0,
    points: 10,
    explanation:
      "Worm dapat menyebar sendiri tanpa perlu file inang, berbeda dengan virus.",
  },
  {
    id: 7,
    category: "keamanan",
    question: "Apa yang dimaksud dengan Ransomware?",
    options: [
      "Malware iklan",
      "Pencuri password",
      "Enkripsi data minta tebusan",
      "Mata-mata",
    ],
    correct: 2,
    points: 10,
    explanation:
      "Ransomware mengenkripsi data korban dan meminta tebusan untuk dekripsi.",
  },
  {
    id: 8,
    category: "keamanan",
    question: "Ciri-ciri email phishing adalah?",
    options: [
      "Domain mencurigakan",
      "Kesalahan tata bahasa",
      "Meminta data pribadi",
      "Semua jawaban benar",
    ],
    correct: 3,
    points: 10,
    explanation:
      "Waspadai domain aneh, grammar buruk, dan permintaan data pribadi.",
  },
  {
    id: 9,
    category: "lanjutan",
    question: "Apa itu serangan Man-in-the-Middle (MITM)?",
    options: [
      "Serangan ke server utama",
      "Peretas menyadap komunikasi antara dua pihak",
      "Serangan merusak hardware",
      "Serangan membanjiri jaringan",
    ],
    correct: 1,
    points: 15,
    explanation:
      "MITM terjadi ketika peretas diam-diam menyadap komunikasi antara dua pihak.",
  },
  {
    id: 10,
    category: "lanjutan",
    question: "Apa fungsi utama dari VPN?",
    options: [
      "Mempercepat internet",
      "Menyembunyikan alamat IP dan mengenkripsi data",
      "Memblokir iklan",
      "Membersihkan virus",
    ],
    correct: 1,
    points: 15,
    explanation:
      "VPN menciptakan koneksi terenkripsi dan menyembunyikan alamat IP pengguna.",
  },
  {
    id: 11,
    category: "lanjutan",
    question: "Apa yang dimaksud dengan 'Social Engineering'?",
    options: [
      "Rekayasa sosial",
      "Manipulasi psikologis untuk mendapatkan informasi",
      "Pembangunan jaringan sosial",
      "Teknik pemrograman",
    ],
    correct: 1,
    points: 15,
    explanation:
      "Social engineering adalah manipulasi psikologis untuk mendapatkan akses atau informasi.",
  },
  {
    id: 12,
    category: "lanjutan",
    question: "Apa fase pertama dalam Incident Response?",
    options: ["Containment", "Eradication", "Preparation", "Recovery"],
    correct: 2,
    points: 15,
    explanation:
      "Preparation adalah fase persiapan sebelum insiden terjadi, termasuk pelatihan dan perencanaan.",
  },
];

// State Management
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = [];
let totalScore = 0;
let currentCategory = "all";
let quizStarted = false;
let timerInterval = null;
let timeRemaining = 600; // 10 menit = 600 detik

// DOM Elements
let categoryBtns, questionText, optionsList, prevBtn, nextBtn, submitBtn;
let currentNumSpan, totalNumSpan, scoreDisplay;
let totalSoalStat, soalTerjawabStat, skorSaatIniStat, waktuTersisaStat;
let quizCategoryBadge, quizFeedback, progressFillBig;
let resultModal, closeResultBtn, retryQuizBtn;
let startQuizModal, confirmStartBtn, cancelStartBtn;
let timeoutModal, timeoutCloseBtn, timeoutTerjawab, timeoutSkor;

// Initialize Quiz - Tampilkan modal konfirmasi dulu
function initKuis() {
  console.log("=== Kuis dimulai ===");

  // Get DOM elements
  categoryBtns = document.querySelectorAll(".category-kuis-btn");
  questionText = document.getElementById("questionText");
  optionsList = document.getElementById("optionsList");
  prevBtn = document.getElementById("prevBtn");
  nextBtn = document.getElementById("nextBtn");
  submitBtn = document.getElementById("submitBtn");
  currentNumSpan = document.getElementById("currentSoalNum");
  totalNumSpan = document.getElementById("totalSoalNum");
  scoreDisplay = document.getElementById("skorSaatIni");
  totalSoalStat = document.getElementById("totalSoal");
  soalTerjawabStat = document.getElementById("soalTerjawab");
  skorSaatIniStat = document.getElementById("skorSaatIni");
  waktuTersisaStat = document.getElementById("waktuTersisa");
  quizCategoryBadge = document.getElementById("quizCategoryBadge");
  quizFeedback = document.getElementById("quizFeedback");
  progressFillBig = document.getElementById("progressFillBig");
  resultModal = document.getElementById("resultModal");
  closeResultBtn = document.getElementById("closeResultBtn");
  retryQuizBtn = document.getElementById("retryQuizBtn");
  startQuizModal = document.getElementById("startQuizModal");
  confirmStartBtn = document.getElementById("confirmStartBtn");
  cancelStartBtn = document.getElementById("cancelStartBtn");
  timeoutModal = document.getElementById("timeoutModal");
  timeoutCloseBtn = document.getElementById("timeoutCloseBtn");
  timeoutTerjawab = document.getElementById("timeoutTerjawab");
  timeoutSkor = document.getElementById("timeoutSkor");

  if (!questionText) {
    console.error("Element tidak ditemukan!");
    return;
  }

  // Sembunyikan konten kuis terlebih dahulu
  document.querySelector(".quiz-wrapper").style.opacity = "0.5";
  document.querySelector(".quiz-wrapper").style.pointerEvents = "none";
  document.querySelector(".kuis-category").style.opacity = "0.5";
  document.querySelector(".kuis-category").style.pointerEvents = "none";

  // Setup event listeners untuk modal
  if (confirmStartBtn) {
    confirmStartBtn.addEventListener("click", startQuiz);
  }
  if (cancelStartBtn) {
    cancelStartBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }
  if (timeoutCloseBtn) {
    timeoutCloseBtn.addEventListener("click", () => {
      timeoutModal.style.display = "none";
      showKuisResultModal(
        totalScore,
        currentQuestions.reduce((sum, q) => sum + q.points, 0),
        Math.round(
          (totalScore /
            currentQuestions.reduce((sum, q) => sum + q.points, 0)) *
            100,
        ),
        0,
        currentQuestions.length,
        10,
        0,
      );
    });
  }

  // Tampilkan modal konfirmasi
  const totalSoalKonfirmasi = document.getElementById("totalSoalKonfirmasi");
  if (totalSoalKonfirmasi) {
    totalSoalKonfirmasi.innerText = kuisQuestions.length;
  }
  if (startQuizModal) {
    startQuizModal.style.display = "flex";
  }
}

function startQuiz() {
  // Sembunyikan modal
  if (startQuizModal) startQuizModal.style.display = "none";

  // Tampilkan konten kuis
  document.querySelector(".quiz-wrapper").style.opacity = "1";
  document.querySelector(".quiz-wrapper").style.pointerEvents = "auto";
  document.querySelector(".kuis-category").style.opacity = "1";
  document.querySelector(".kuis-category").style.pointerEvents = "auto";

  quizStarted = true;

  // Load questions
  loadKuisQuestions("all");

  // Setup event listeners
  setupKuisEventListeners();

  // Start timer
  startTimer();

  console.log("Kuis dimulai! Total soal:", currentQuestions.length);
}

function loadKuisQuestions(category) {
  // Stop timer if running and quiz already started
  if (timerInterval && quizStarted) {
    clearInterval(timerInterval);
  }

  if (category === "all") {
    currentQuestions = [...kuisQuestions];
    if (quizCategoryBadge) quizCategoryBadge.innerText = "Semua Topik";
  } else {
    currentQuestions = kuisQuestions.filter((q) => q.category === category);
    const names = {
      dasar: "Dasar",
      keamanan: "Keamanan",
      lanjutan: "Lanjutan",
    };
    if (quizCategoryBadge)
      quizCategoryBadge.innerText = names[category] || category;
  }

  currentIndex = 0;
  userAnswers = new Array(currentQuestions.length).fill(null);
  totalScore = 0;

  if (totalNumSpan) totalNumSpan.innerText = currentQuestions.length;
  if (totalSoalStat) totalSoalStat.innerText = currentQuestions.length;
  if (scoreDisplay) scoreDisplay.innerText = "0";
  if (skorSaatIniStat) skorSaatIniStat.innerText = "0";

  updateKuisStats();
  renderKuisQuestion();
  updateKuisButtons();
  updateProgressBar();

  if (quizStarted) {
    startTimer();
  }
}

function renderKuisQuestion() {
  if (!currentQuestions.length || currentIndex >= currentQuestions.length)
    return;

  const q = currentQuestions[currentIndex];
  const userAnswer = userAnswers[currentIndex];

  if (questionText) questionText.innerText = q.question;
  if (currentNumSpan) currentNumSpan.innerText = currentIndex + 1;

  if (optionsList) {
    optionsList.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    q.options.forEach((opt, idx) => {
      const div = document.createElement("div");
      div.className = `quiz-option-item ${userAnswer !== null && userAnswer === idx ? "selected" : ""}`;
      div.onclick = () => selectKuisOption(idx);
      div.innerHTML = `
                <div class="option-letter">${letters[idx]}</div>
                <div class="option-text">${opt}</div>
            `;
      optionsList.appendChild(div);
    });
  }

  if (quizFeedback) quizFeedback.innerHTML = "";
  if (quizFeedback) quizFeedback.className = "quiz-feedback";

  updateKuisButtons();
  updateProgressBar();
}

function selectKuisOption(selectedIdx) {
  userAnswers[currentIndex] = selectedIdx;
  updateKuisStats();
  renderKuisQuestion(); // Re-render to show selected state
  updateKuisButtons(); // This will enable next button

  // Optional: Auto-advance to next question after answer (uncomment if wanted)
  // setTimeout(() => {
  //     if (currentIndex < currentQuestions.length - 1) {
  //         nextKuisQuestion();
  //     }
  // }, 500);
}

function updateKuisStats() {
  const answered = userAnswers.filter((a) => a !== null).length;
  let score = 0;
  let correctCount = 0;

  for (let i = 0; i < userAnswers.length; i++) {
    if (
      userAnswers[i] !== null &&
      userAnswers[i] === currentQuestions[i]?.correct
    ) {
      score += currentQuestions[i].points;
      correctCount++;
    }
  }

  totalScore = score;

  if (soalTerjawabStat) soalTerjawabStat.innerText = answered;
  if (skorSaatIniStat) skorSaatIniStat.innerText = score;
  if (scoreDisplay) scoreDisplay.innerText = score;
}

function updateKuisButtons() {
  if (prevBtn) prevBtn.disabled = currentIndex === 0;

  const isLastQuestion = currentIndex === currentQuestions.length - 1;
  const hasAnswer = userAnswers[currentIndex] !== null;

  // Disable next button if current question not answered
  if (nextBtn) {
    if (!hasAnswer && !isLastQuestion) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = "0.5";
      nextBtn.style.cursor = "not-allowed";
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
      nextBtn.style.cursor = "pointer";
    }
  }

  if (submitBtn && nextBtn) {
    if (isLastQuestion) {
      nextBtn.style.display = "none";
      submitBtn.style.display = "flex";
      if (hasAnswer) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
      } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
      }
    } else {
      nextBtn.style.display = "flex";
      submitBtn.style.display = "none";
    }
  }
}

function updateProgressBar() {
  const progress = ((currentIndex + 1) / currentQuestions.length) * 100;
  if (progressFillBig) progressFillBig.style.width = `${progress}%`;
}

function nextKuisQuestion() {
  // Check if current question has been answered
  const hasAnswer = userAnswers[currentIndex] !== null;

  if (!hasAnswer) {
    // Show warning toast
    showWarningToast(
      "⚠️ Jawab pertanyaan ini terlebih dahulu sebelum melanjutkan!",
    );
    return;
  }

  if (currentIndex < currentQuestions.length - 1) {
    currentIndex++;
    renderKuisQuestion();
    if (typeof lucide !== "undefined") lucide.createIcons();
  }
}

function prevKuisQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    renderKuisQuestion();
    if (typeof lucide !== "undefined") lucide.createIcons();
  }
}

// Tambahkan fungsi untuk menampilkan warning toast
function showWarningToast(message) {
  // Cek apakah toast sudah ada
  let toast = document.getElementById("warningToast");
  if (toast) {
    toast.remove();
  }

  // Buat toast element
  toast = document.createElement("div");
  toast.id = "warningToast";
  toast.innerHTML = `
        <div style="
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 14px 28px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 10000;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideUp 0.3s ease;
        ">
            <i data-lucide="alert-triangle" style="width: 20px; height: 20px;"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(toast);

  if (typeof lucide !== "undefined") lucide.createIcons();

  // Animasi slide up
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        @keyframes slideDown {
            from {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
        }
    `;
  document.head.appendChild(style);

  // Hapus toast setelah 3 detik
  setTimeout(() => {
    toast.style.animation = "slideDown 0.3s ease";
    setTimeout(() => {
      if (toast && toast.remove) toast.remove();
    }, 300);
  }, 3000);
}

function submitKuis() {
  const allAnswered = userAnswers.every((a) => a !== null);
  if (!allAnswered) {
    alert("Silakan jawab semua pertanyaan terlebih dahulu!");
    return;
  }

  // Stop timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  let correctCount = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === currentQuestions[i]?.correct) {
      correctCount++;
    }
  }

  const totalPossiblePoints = currentQuestions.reduce(
    (sum, q) => sum + q.points,
    0,
  );
  const percentage = Math.round((totalScore / totalPossiblePoints) * 100);
  const timeSpent = 600 - timeRemaining;
  const minutesSpent = Math.floor(timeSpent / 60);
  const secondsSpent = timeSpent % 60;

  // Save to localStorage
  const stats = JSON.parse(localStorage.getItem("userStats"));
  if (stats) {
    stats.totalQuiz = (stats.totalQuiz || 0) + currentQuestions.length;
    stats.totalSkor = (stats.totalSkor || 0) + totalScore;
    stats.activityLog = stats.activityLog || [];
    stats.activityLog.unshift({
      text: `Kuis selesai! Skor: ${totalScore}/${totalPossiblePoints} (${percentage}%)`,
      time: new Date().toISOString(),
      type: "badge",
    });
    localStorage.setItem("userStats", JSON.stringify(stats));
    localStorage.setItem("statsUpdate", Date.now().toString());
  }

  showKuisResultModal(
    totalScore,
    totalPossiblePoints,
    percentage,
    correctCount,
    currentQuestions.length,
    minutesSpent,
    secondsSpent,
  );
}

function showKuisResultModal(
  score,
  total,
  percentage,
  correct,
  totalQ,
  minutes,
  seconds,
) {
  if (!resultModal) return;

  const resultIcon = document.getElementById("resultIcon");
  const resultTitle = document.getElementById("resultTitle");
  const resultScore = document.getElementById("resultScore");
  const resultPercentage = document.getElementById("resultPercentage");
  const resultMessage = document.getElementById("resultMessage");
  const resultTotalSoal = document.getElementById("resultTotalSoal");
  const resultBenar = document.getElementById("resultBenar");
  const resultSalah = document.getElementById("resultSalah");
  const resultWaktu = document.getElementById("resultWaktu");
  const resultDetailList = document.getElementById("resultDetailList");

  const wrongCount = totalQ - correct;
  const waktuStr = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Set icon and title based on percentage
  if (percentage >= 80) {
    if (resultIcon) resultIcon.className = "result-icon excellent";
    if (resultTitle) resultTitle.innerText = "🏆 Luar Biasa!";
    if (resultMessage)
      resultMessage.innerText = `Selamat! Anda menguasai materi dengan sangat baik.`;
  } else if (percentage >= 60) {
    if (resultIcon) resultIcon.className = "result-icon great";
    if (resultTitle) resultTitle.innerText = "👍 Bagus!";
    if (resultMessage)
      resultMessage.innerText = `Anda sudah cukup baik, tapi masih bisa ditingkatkan lagi.`;
  } else {
    if (resultIcon) resultIcon.className = "result-icon good";
    if (resultTitle) resultTitle.innerText = "📚 Terus Belajar!";
    if (resultMessage)
      resultMessage.innerText = `Jangan menyerah! Pelajari materi kembali dan coba lagi.`;
  }

  if (resultScore) resultScore.innerText = `${score}/${total}`;
  if (resultPercentage) resultPercentage.innerText = `${percentage}%`;
  if (resultTotalSoal) resultTotalSoal.innerText = totalQ;
  if (resultBenar) resultBenar.innerText = correct;
  if (resultSalah) resultSalah.innerText = wrongCount;
  if (resultWaktu) resultWaktu.innerText = waktuStr;

  // Build detail jawaban list
  if (resultDetailList) {
    resultDetailList.innerHTML = "";

    currentQuestions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx];
      const isCorrect = userAnswer === q.correct;
      const userAnswerText =
        userAnswer !== null ? q.options[userAnswer] : "Tidak dijawab";
      const correctAnswerText = q.options[q.correct];

      const detailItem = document.createElement("div");
      detailItem.className = `detail-item ${isCorrect ? "correct" : "wrong"}`;

      detailItem.innerHTML = `
                <div class="detail-number">${idx + 1}</div>
                <div class="detail-content">
                    <div class="detail-question">${q.question}</div>
                    <div class="detail-answer">
                        <span class="user-answer">Jawaban Anda: ${userAnswerText}</span>
                        ${!isCorrect ? `<span class="correct-answer">✓ Jawaban benar: ${correctAnswerText}</span>` : ""}
                    </div>
                </div>
                <div class="detail-status ${isCorrect ? "correct" : "wrong"}">
                    <i data-lucide="${isCorrect ? "check-circle" : "x-circle"}"></i>
                </div>
            `;

      resultDetailList.appendChild(detailItem);
    });

    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  resultModal.style.display = "flex";
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeKuisResultModal() {
  if (resultModal) resultModal.style.display = "none";
  // Reset quiz to first question when closing modal
  resetToFirstQuestion();
}

function retryKuis() {
  // Reset state
  currentIndex = 0;
  userAnswers = new Array(currentQuestions.length).fill(null);
  totalScore = 0;
  timeRemaining = 600;

  updateKuisStats();
  renderKuisQuestion();
  updateKuisButtons();
  updateProgressBar();

  // Restart timer
  if (timerInterval) clearInterval(timerInterval);
  startTimer();

  closeKuisResultModal();
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function backToKuis() {
  if (resultModal) resultModal.style.display = "none";
  // Reset quiz to first question when going back
  resetToFirstQuestion();
}

function resetToFirstQuestion() {
  // Reset to first question of current category
  currentIndex = 0;
  renderKuisQuestion();
  updateProgressBar();
  updateKuisButtons();

  // Scroll to top of quiz
  const quizWrapper = document.querySelector(".quiz-wrapper");
  if (quizWrapper) {
    quizWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Update event listeners
function setupKuisEventListeners() {
  if (prevBtn) prevBtn.addEventListener("click", prevKuisQuestion);
  if (nextBtn) nextBtn.addEventListener("click", nextKuisQuestion);
  if (submitBtn) submitBtn.addEventListener("click", submitKuis);
  if (closeResultBtn)
    closeResultBtn.addEventListener("click", closeKuisResultModal);
  if (retryQuizBtn) retryQuizBtn.addEventListener("click", retryKuis);

  // Add back to kuis button
  const backToKuisBtn = document.getElementById("backToKuisBtn");
  if (backToKuisBtn) backToKuisBtn.addEventListener("click", backToKuis);

  if (categoryBtns) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!quizStarted) {
          alert("Silakan mulai kuis terlebih dahulu!");
          return;
        }
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        loadKuisQuestions(currentCategory);
        if (typeof lucide !== "undefined") lucide.createIcons();
      });
    });
  }
}

function closeKuisResultModal() {
  if (resultModal) resultModal.style.display = "none";
}

function retryKuis() {
  // Reset all answers
  userAnswers = new Array(currentQuestions.length).fill(null);
  totalScore = 0;
  currentIndex = 0;
  timeRemaining = 600;

  // Restart timer
  if (timerInterval) clearInterval(timerInterval);
  startTimer();

  // Reset UI
  updateKuisStats();
  renderKuisQuestion();
  updateKuisButtons();
  updateProgressBar();

  // Close modal
  closeKuisResultModal();

  if (typeof lucide !== "undefined") lucide.createIcons();
}

function backToDashboard() {
  window.location.href = "kuis.html";
}

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      // Tampilkan modal waktu habis
      showTimeoutModal();
    } else {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      if (waktuTersisaStat) {
        waktuTersisaStat.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
    }
  }, 1000);
}

function showTimeoutModal() {
  // Hitung skor sementara
  let currentScore = 0;
  let answered = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] !== null) {
      answered++;
      if (userAnswers[i] === currentQuestions[i]?.correct) {
        currentScore += currentQuestions[i].points;
      }
    }
  }
  totalScore = currentScore;

  if (timeoutTerjawab) timeoutTerjawab.innerText = answered;
  if (timeoutSkor) timeoutSkor.innerText = currentScore;

  if (timeoutModal) timeoutModal.style.display = "flex";
}

function setupKuisEventListeners() {
  if (prevBtn) prevBtn.addEventListener("click", prevKuisQuestion);
  if (nextBtn) nextBtn.addEventListener("click", nextKuisQuestion);
  if (submitBtn) submitBtn.addEventListener("click", submitKuis);
  if (closeResultBtn)
    closeResultBtn.addEventListener("click", closeKuisResultModal);
  if (retryQuizBtn) retryQuizBtn.addEventListener("click", retryKuis);

  // Update back to kuis button
  const backToKuisBtn = document.getElementById("backToKuisBtn");
  if (backToKuisBtn) {
    backToKuisBtn.addEventListener("click", backToKuis);
  }

  if (categoryBtns) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!quizStarted) {
          alert("Silakan mulai kuis terlebih dahulu!");
          return;
        }
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        loadKuisQuestions(currentCategory);
        if (typeof lucide !== "undefined") lucide.createIcons();
      });
    });
  }
}

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initKuis();

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("skillscapeLogin");
      window.location.href = "index.html";
    });
  }
});

// Expose functions
window.closeKuisResultModal = closeKuisResultModal;
window.retryKuis = retryKuis;
