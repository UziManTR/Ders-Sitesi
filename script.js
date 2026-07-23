// Gizli oyunların listesi ve adresleri
const oyunlar = [
    { isim: "Mazean Oyna", link: "https://mazean.com" },
    { isim: "Poxel Oyna", link: "https://poxel.io" },
    { isim: "Eaglercraft Oyna", link: "https://eaglercraft.com" },
    { isim: "Poki Oyna", link: "https://poki.com" }
];

let arayuzOlustu = false; 

// Kutuyu sürekli kontrol eden fonksiyon
function koduKontrolEt() {
    const girilenYazi = document.getElementById('kodKutusu').value;
    const dinamikAlan = document.getElementById('dinamikAlan');
    
    // 1. Durum: Eğer hiçbir şey yazmıyorsa boş bırak
    if (girilenYazi === "") {
        dinamikAlan.innerHTML = "";
        arayuzOlustu = false;
        return;
    }

    // 2. Durum: Eğer doğru şifre yazıldıysa gizli arayüzü aç
    if (girilenYazi === 'secretcode1234') {
        if (!arayuzOlustu) {
            gizliArayuzOlustur(dinamikAlan);
        }
    } else {
        // 3. Durum: Şifre yanlışsa veya rastgele bir kod yazılıyorsa SAHTE HATA göster
        arayuzOlustu = false;
        dinamikAlan.innerHTML = `
            <div style="background: #5a1818; border: 2px solid #ff4a4a; padding: 15px; margin-top: 20px; border-radius: 8px; text-align: left; font-family: monospace;">
                <b style="color: #ff4a4a;">[CRITICAL ERROR]</b> Connection failed.<br>
                <span style="color: #ccc;">Status:</span> Code Compilation Failed<br>
                <span style="color: #ccc;">Reason:</span> Error 404 - API Gateway Timeout<br>
                <span style="color: #ff9999;">⚠️ Sunucu yanıt vermiyor. Lütfen kod dizilimini kontrol edin.</span>
            </div>
        `;
    }
}

// TAMAMEN JAVASCRIPT ILE ARAYÜZ (UI) OLUŞTURMA
function gizliArayuzOlustur(hedefKutu) {
    arayuzOlustu = true;
    hedefKutu.innerHTML = ""; // Varsa önceki sahte hatayı temizle

    // Dış panel kutusunu oluşturuyoruz
    const gizliPanel = document.createElement('div');
    gizliPanel.style.background = "#111";
    gizliPanel.style.border = "2px dashed #4caf50";
    gizliPanel.style.padding = "20px";
    gizliPanel.style.borderRadius = "10px";
    gizliPanel.style.maxWidth = "500px";
    gizliPanel.style.margin = "20px auto";

    // Başlık ekliyoruz
    const baslik = document.createElement('h2');
    baslik.innerText = "🔓 Geliştirici Oyun Modu Aktif";
    baslik.style.color = "#4caf50";
    gizliPanel.appendChild(baslik);

    // Açıklama yazısı ekliyoruz
    const aciklama = document.createElement('p');
    aciklama.innerText = "Gizli pencerede (about:blank) açmak için bir oyuna tıklayın:";
    gizliPanel.appendChild(aciklama);

    // Her oyun için JS ile buton üretiyoruz
    oyunlar.forEach(oyun => {
        const buton = document.createElement('button');
        buton.innerText = oyun.isim;
        
        // Buton stilleri
        buton.style.background = "#e91e63";
        buton.style.color = "white";
        buton.style.border = "none";
        buton.style.padding = "10px 20px";
        buton.style.margin = "5px";
        buton.style.borderRadius = "5px";
        buton.style.cursor = "pointer";
        buton.style.fontSize = "14px";
        
        // Hover efektleri
        buton.onmouseover = () => buton.style.background = "#c2185b";
        buton.onmouseout = () => buton.style.background = "#e91e63";

        // Tıklanınca maskeli pencereyi açma komutu
        buton.onclick = () => oyunuBaslat(oyun.link);

        gizliPanel.appendChild(buton);
    });

    hedefKutu.appendChild(gizliPanel);
}

// Oyunu internet adresi görünmeden açan fonksiyon
function oyunuBaslat(oyunLinki) {
    const bosPencere = window.open('about:blank', '_blank');
    bosPencere.document.body.style.margin = "0";
    bosPencere.document.body.style.height = "100vh";
    bosPencere.document.body.style.backgroundColor = "#000";
    
    const cerceve = bosPencere.document.createElement('iframe');
    cerceve.src = oyunLinki;
    cerceve.style.width = "100%";
    cerceve.style.height = "100%";
    cerceve.style.border = "none";
    
    bosPencere.document.body.appendChild(cerceve);

    // 🚀 GÜNCELLENEN PANİK MODU: 
    // Oyun açıldığı an arkadaki sekme anında Metodbox sitesine yönlenir!
    window.location.href = "https://metodbox.com";
}
