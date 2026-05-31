/* ============================================================
   PENGATURAN PAGE - JAVASCRIPT (INLINE EDITING)
   ============================================================ */

// Load user data from localStorage
function loadUserData() {
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

  const stats = JSON.parse(localStorage.getItem("userStats"));
  let level = "Pemula";

  if (stats) {
    const materiSelesai = stats.completedMateri?.length || 0;
    const avgScore =
      stats.totalQuiz > 0 ? Math.round(stats.totalSkor / stats.totalQuiz) : 0;
    const totalProgress = ((materiSelesai / 8) * 100 + avgScore) / 2;

    if (totalProgress >= 80) level = "Ahli";
    else if (totalProgress >= 60) level = "Mahir";
    else if (totalProgress >= 40) level = "Menengah";
    else if (totalProgress >= 20) level = "Lanjutan Pemula";
  }

  // Update profile display
  document.getElementById("profileName").innerText = userData.name;
  document.getElementById("profileEmail").innerText = userData.email;
  document.getElementById("profileId").innerText =
    userData.userId || generateUserId();
  document.getElementById("profileUsername").innerText = userData.username;
  document.getElementById("profileJoinDate").innerText = userData.joinDate;
  document.getElementById("profileLevel").innerHTML =
    `<span class="level-badge">${level}</span>`;
  document.getElementById("avatarInitial").innerText = userData.name.charAt(0);

  return userData;
}

function generateUserId() {
  return "USR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Save user data to localStorage
function saveUserData(data) {
  localStorage.setItem("userProfile", JSON.stringify(data));
}

// INLINE EDITING FUNCTIONS
function editInline(field, elementId) {
  const element = document.getElementById(elementId);
  const currentValue = element.innerText;
  const userData = JSON.parse(localStorage.getItem("userProfile")) || {
    name: "Andi Pratama",
    email: "andi23@example.com",
    username: "andi23",
  };

  // Create input element
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentValue;
  input.className = "inline-edit-input";
  input.style.cssText = `
        background: rgba(99, 102, 241, 0.15);
        border: 1px solid #818cf8;
        border-radius: 8px;
        padding: 6px 12px;
        color: #fff;
        font-size: 0.9rem;
        outline: none;
        width: 200px;
    `;

  // Replace text with input
  element.style.display = "none";
  element.parentNode.insertBefore(input, element);
  input.focus();

  // Save on enter or blur
  const saveEdit = () => {
    const newValue = input.value.trim();
    if (newValue && newValue !== currentValue) {
      // Update user data
      switch (field) {
        case "name":
          userData.name = newValue;
          document.getElementById("avatarInitial").innerText =
            newValue.charAt(0);
          break;
        case "email":
          userData.email = newValue;
          break;
        case "username":
          userData.username = newValue;
          break;
      }
      saveUserData(userData);
      element.innerText = newValue;
      showToast(`${getFieldLabel(field)} berhasil diperbarui!`);
    }
    element.style.display = "inline";
    input.remove();
  };

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  });
}

function getFieldLabel(field) {
  switch (field) {
    case "name":
      return "Nama";
    case "email":
      return "Email";
    case "username":
      return "Username";
    default:
      return field;
  }
}

// Settings toggles
function initSettings() {
  // Dark Mode
  const darkModeToggle = document.getElementById("darkModeToggle");
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  darkModeToggle.checked = isDarkMode;
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }

  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
    showToast(`Mode ${darkModeToggle.checked ? "gelap" : "terang"} diaktifkan`);
  });

  // Sound
  const soundToggle = document.getElementById("soundToggle");
  const isSoundOn = localStorage.getItem("soundEnabled") !== "false";
  soundToggle.checked = isSoundOn;

  soundToggle.addEventListener("change", () => {
    localStorage.setItem("soundEnabled", soundToggle.checked);
    showToast(`Suara ${soundToggle.checked ? "diaktifkan" : "dinonaktifkan"}`);
    if (soundToggle.checked) {
      playTestSound();
    }
  });

  // Notifications
  const notifToggle = document.getElementById("notificationToggle");
  const isNotifOn = localStorage.getItem("notificationsEnabled") !== "false";
  notifToggle.checked = isNotifOn;

  notifToggle.addEventListener("change", () => {
    localStorage.setItem("notificationsEnabled", notifToggle.checked);
    if (notifToggle.checked && Notification.permission === "default") {
      Notification.requestPermission();
    }
    showToast(
      `Notifikasi ${notifToggle.checked ? "diaktifkan" : "dinonaktifkan"}`,
    );
  });

  // Language
  const languageSelect = document.getElementById("languageSelect");
  const savedLang = localStorage.getItem("language") || "id";
  languageSelect.value = savedLang;

  languageSelect.addEventListener("change", () => {
    localStorage.setItem("language", languageSelect.value);
    showToast(
      `Bahasa diubah menjadi ${languageSelect.options[languageSelect.selectedIndex].text}`,
    );
  });
}

function playTestSound() {
  // Simple beep sound simulation
  const audio = new Audio("data:audio/wav;base64,U3RlYWx0aCBzb3VuZA==");
  audio.play().catch((e) => console.log("Sound not supported"));
}

// Change password modal (still needed for security)
function changePassword() {
  document.getElementById("changePasswordModal").style.display = "flex";
}

function closePasswordModal() {
  document.getElementById("changePasswordModal").style.display = "none";
  document.getElementById("oldPassword").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
}

function submitChangePassword() {
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!oldPassword || !newPassword || !confirmPassword) {
    alert("Semua field harus diisi!");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Password baru dan konfirmasi tidak cocok!");
    return;
  }

  if (newPassword.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }

  localStorage.setItem("userPassword", newPassword);
  closePasswordModal();
  showToast("Password berhasil diubah!");
}

// Support modal
function showSupportModal() {
  const modal = document.getElementById("supportModal");
  if (modal) {
    modal.style.display = "flex";
    if (typeof lucide !== "undefined") lucide.createIcons();
  }
}

function closeSupportModal() {
  const modal = document.getElementById("supportModal");
  if (modal) modal.style.display = "none";
}

function contactVia(method) {
  switch (method) {
    case "email":
      window.location.href =
        "mailto:admin@skillscape.com?subject=Bantuan%20SkillScape";
      break;
    case "whatsapp":
      window.open(
        "https://wa.me/6281234567890?text=Halo%20Admin%20SkillScape,%20saya%20butuh%20bantuan",
        "_blank",
      );
      break;
    case "telegram":
      window.open("https://t.me/skillscape", "_blank");
      break;
  }
  closeSupportModal();
}

// Toast notification
function showToast(message) {
  let toast = document.getElementById("customToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "customToast";
    toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 500;
            z-index: 9999;
            animation: slideUp 0.3s ease;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
        `;
    document.body.appendChild(toast);

    const style = document.createElement("style");
    style.textContent = `
            @keyframes slideUp {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes slideDown {
                from { opacity: 1; transform: translateX(-50%) translateY(0); }
                to { opacity: 0; transform: translateX(-50%) translateY(20px); }
            }
        `;
    document.head.appendChild(style);
  }

  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.animation = "slideDown 0.3s ease";
    setTimeout(() => {
      toast.style.display = "none";
      toast.style.animation = "slideUp 0.3s ease";
    }, 300);
  }, 3000);
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  loadUserData();
  initSettings();

  // Close modals when clicking outside
  window.onclick = (e) => {
    const passwordModal = document.getElementById("changePasswordModal");
    const supportModal = document.getElementById("supportModal");

    if (e.target === passwordModal) closePasswordModal();
    if (e.target === supportModal) closeSupportModal();
  };

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("skillscapeLogin");
      window.location.href = "index.html";
    });
  }
});

// Expose functions globally
window.editInline = editInline;
window.changePassword = changePassword;
window.closePasswordModal = closePasswordModal;
window.submitChangePassword = submitChangePassword;
window.showSupportModal = showSupportModal;
window.closeSupportModal = closeSupportModal;
window.contactVia = contactVia;
