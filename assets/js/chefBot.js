document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("cookeasyUser");
  const userMenu = document.getElementById("userMenu");

  if (userData && userMenu) {
    const user = JSON.parse(userData);
    userMenu.innerHTML = `
          <div class="relative group inline-block text-left">
          <button class="bg-[#803f22] text-white px-4 py-2 rounded-md flex items-center justify-between gap-2 hover:bg-[#5c2c14] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a8552f]">
            <span>Profil</span>
            <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute right-0 mt-3 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
            <a href="/pages/profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Profil Saya</a>
            <button id="logoutBtn" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#803f22] transition-colors">Keluar</button>
          </div>
        </div>
        `;

    document.getElementById("logoutBtn").addEventListener("click", function () {
      const confirmLogout = confirm("Apakah Anda yakin ingin logout?");
      if (confirmLogout) {
        localStorage.removeItem("cookeasyUser");
        location.reload();
      }
    });
  }
});

const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// Fungsi untuk memproses pertanyaan pengguna
function processCookingQuestion(question) {
  const lowerQuestion = question.toLowerCase();

  // Greetings
  if (/halo|hai|hi|pagi|siang|malam/.test(lowerQuestion)) {
    return "Halo! Saya ChefBot, siap membantu Anda dengan berbagai pertanyaan seputar memasak. Ada yang bisa saya bantu?";
  }

  // Thank you
  if (/terima kasih|makasih|thanks|thank you/.test(lowerQuestion)) {
    return "Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, jangan ragu untuk bertanya ya!";
  }

  // Eggs
  if (/telur/.test(lowerQuestion)) {
    if (/dadar|mata sapi|ceplok/.test(lowerQuestion)) {
      return "Untuk membuat telur dadar: 1. Kocok 2 butir telur dengan garam secukupnya. 2. Panaskan sedikit minyak di wajan dengan api sedang. 3. Tuang telur, masak hingga bagian bawah matang. 4. Balik dan masak sebentar. Tips: Tambahkan irisan daun bawang atau bawang bombay untuk variasi!";
    }
    return "Telur bisa diolah dengan berbagai cara: rebus, dadar, orak-arik, atau mata sapi. Untuk telur rebus sempurna: rebus 7 menit untuk kuning telur setengah matang, 12 menit untuk matang sempurna.";
  }

  // Fried rice
  if (/nasi goreng/.test(lowerQuestion)) {
    return "Resep dasar nasi goreng: \n1. Tumis bawang putih, bawang merah, dan cabai hingga harum \n2. Masukkan nasi dingin, aduk rata \n3. Tambahkan kecap manis, kecap asin, garam, dan merica \n4. Buat lubang di tengah, masukkan telur, orak-arik \n5. Tambahkan ayam/udang dan sayuran sesuai selera \n6. Aduk rata dan sajikan panas";
  }

  // Chicken
  if (/ayam/.test(lowerQuestion)) {
    if (/goreng/.test(lowerQuestion)) {
      return "Resep ayam goreng sederhana: \n1. Marinasi ayam dengan bawang putih halus, ketumbar, garam, dan kunyit selama minimal 30 menit \n2. Gulingkan ayam dalam tepung terigu \n3. Goreng dalam minyak panas dengan api sedang hingga kecokelatan \n4. Tiriskan di atas kertas penyerap minyak";
    }
    if (/bakar|panggang/.test(lowerQuestion)) {
      return "Ayam bakar lezat: \n1. Marinasi ayam dengan kecap manis, bawang putih, ketumbar, dan sedikit jeruk nipis selama 2 jam \n2. Panggang di oven 180°C selama 40 menit, balik sekali \n3. Oles dengan bumbu marinasi setiap 10 menit \n4. Untuk ekstra smoky, panggang sebentar di atas arang";
    }
    return "Ayam adalah bahan serbaguna. Tips: \n- Untuk hasil terbaik, gunakan ayam segar \n- Marinasi minimal 30 menit untuk rasa lebih dalam \n- Masak hingga suhu internal mencapai 75°C untuk memastikan matang sempurna";
  }

  // Meat
  if (/daging|sapi|rendang|empal/.test(lowerQuestion)) {
    if (/empuk/.test(lowerQuestion)) {
      return "Agar daging empuk: \n1. Pilih potongan yang tepat (sengkel, sandung lamur) \n2. Marinasi dengan nanas/pepaya/kiwi selama 30 menit \n3. Masak perlahan dengan metode braising (rebus kecil lama) \n4. Potong melawan serat saat menyajikan \n5. Untuk rendang, masak hingga kuah menyusut dan berminyak";
    }
    return "Daging sapi segar berwarna merah cerah. Tips memasak: \n- Biarkan daging mencapai suhu ruang sebelum dimasak \n- Jangan terlalu sering membalik saat memanggang \n- Diamkan 5-10 menit setelah matang sebelum dipotong";
  }

  // Vegetables
  if (/sayur|wortel|brokoli|kangkung|bayam/.test(lowerQuestion)) {
    return "Tips memasak sayuran: \n1. Cuci bersih sebelum dipotong \n2. Masak sebentar untuk mempertahankan nutrisi (2-3 menit untuk brokoli) \n3. Tambahkan garam di akhir proses memasak \n4. Untuk sayuran hijau, masak dengan api besar dan cepat \n5. Kukus atau tumis lebih baik daripada merebus untuk menjaga nutrisi";
  }

  // Cooking basics
  if (/pemula|dasar|tips|saran/.test(lowerQuestion)) {
    return "Tips untuk pemula: \n1. Siapkan semua bahan sebelum mulai (mise en place) \n2. Pelajari cara mengasah dan menggunakan pisau \n3. Mulai dengan resep sederhana \n4. Ikuti resep dengan tepat saat pertama kali mencoba \n5. Beli bahan berkualitas \n6. Jangan takut gagal - itu bagian dari proses belajar!";
  }

  // If no specific match
  const randomResponses = [
    "Saya bisa membantu dengan resep, teknik memasak, dan tips dapur. Coba tanyakan tentang: cara membuat nasi goreng, tips memasak ayam, atau cara membuat daging empuk.",
    "Pertanyaan menarik! Saya bisa membantu dengan berbagai topik memasak. Mau tanya tentang resep, teknik, atau bahan tertentu?",
    "ChefBot siap membantu! Anda bisa bertanya tentang: \n- Resep masakan Indonesia \n- Teknik dasar memasak \n- Tips memilih bahan \n- Cara menyimpan makanan",
  ];
  return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  // Tampilkan pesan pengguna
  const userMsg = `<div class="mb-2 text-right"><span class="bg-[#803f22] text-white px-3 py-1 rounded-lg inline-block">${userText}</span></div>`;
  chatBox.innerHTML += userMsg;

  // Proses pertanyaan dan dapatkan jawaban
  const botReply = processCookingQuestion(userText);

  // Tampilkan jawaban ChefBot setelah jeda singkat
  setTimeout(() => {
    const botMsg = `<div class="mb-4 text-left"><span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg inline-block">${botReply.replace(
      /\n/g,
      "<br>"
    )}</span></div>`;
    chatBox.innerHTML += botMsg;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 700);

  input.value = "";
});

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    form.dispatchEvent(new Event("submit"));
  }
});
