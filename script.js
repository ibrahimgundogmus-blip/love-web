const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");
const hayirBtn = document.getElementById('hayir-btn');
const hayirError = document.getElementById('hayir-error');
const butonlar = document.getElementById('butonlar');
const evetButon = document.querySelector('.evet-buton');

const firstPage = document.getElementById('first-page');
const secondPage = document.getElementById('second-page');



const kalp = document.querySelector('.corazon');
const muzik = document.getElementById('arkaPlanMuzik');

evetButon.addEventListener('click', (e) => {
    e.preventDefault();
    // 1. Birinci sayfayı gizle
    firstPage.style.display = 'none';

    // 2. İkinci sayfayı göster
    secondPage.style.display = 'block';
});

kalp.addEventListener('click', () => {
    // Müziği çal (Hata vermemesi için kontrol ekliyoruz)
    muzik.play().catch(error => {
        console.log("Müzik otomatik başlatılamadı, bir etkileşim gerekiyor:", error);
    });
});


// Zarf ve kalp açma/kapama
document.addEventListener("click", (e) => {
    // HAYIR'a tıklanırsa mektup açılmasın
    if (e.target.matches("#hayir-btn")) {
        return;
    }
    // Zarf veya kalbe tıklandığında aç/kapat
    if (e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")) {
        envoltura.classList.toggle("abierto");
    } else if (e.target.matches(".sobre *")) {
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");
            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);
            envoltura.classList.add("desactivar-sobre")
        } else {
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");
            setTimeout(() => {
                carta.classList.remove("cerrando-carta")
                carta.classList.remove("abierta")
            }, 500);
        }
    }
});

// Hayır butonu animasyonu için
hayirBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Butonları gizle
    butonlar.style.opacity = '0';
    setTimeout(() => {
        butonlar.style.display = 'none';
        // Hata mesajını göster
        hayirError.style.display = 'block';
        hayirError.classList.remove('hayir-error');
        void hayirError.offsetWidth; // reflow
        hayirError.classList.add('hayir-error');
        hayirError.style.opacity = '1';
        // 2.1s sonra tekrar butonları göster
        setTimeout(() => {
            hayirError.style.opacity = '0';
            setTimeout(() => {
                hayirError.style.display = 'none';
                butonlar.style.display = 'flex';
                setTimeout(() => {
                    butonlar.style.opacity = '1';
                }, 10);
            }, 350);
        }, 2100);
    }, 200);
});



// Hedef tarihi belirleyin (Yıl, Ay-1, Gün, Saat, Dakika)
const targetDate = new Date("Dec 31, 2025 23:59:59").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Zaman hesaplamaları
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  // Ekrana yazdırma
  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;

  // Süre bittiğinde yapılacak işlem
  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown-container").innerHTML = "Süre Doldu!";
  }
}, 1000);