// Gizli oyunların listesi ve adresleri
const oyunlar = [
    { isim: "Mazean Oyna", link: "https://mazean.com" },
    { isim: "Poxel Oyna", link: "https://poxel.io" },
    { isim: "Eaglercraft Oyna", link: "https://eaglercraft.com" },
    { isim: "Poki Oyna", link: "https://poki.com" }
];

let arayuzOlustu = false; // Panel iki kere arka arkaya açılmasın diye kontrol

// Kutuyu sürekli kontrol eden fonksiyon
function koduKontrolEt() {
    const girilenYazi = document.getElementById('kodKutusu').value;
    const dinamikAlan = document.getElementById('dinamikAlan');
    
    // Eğer şifre doğruysa ve arayüz henüz ekranda yoksa oluştur
    if (girilenYazi === 'secretcode1234') {
        if (!arayuzOlustu) {
            gizliArayuzOlustur(dinamikAlan);
        }
    } else {
        // Şifre silinirse veya yanlışsa paneli ekrandan kaldır
        dinamikAlan.innerHTML = "";
        arayuzOlustu = false;
    }
}

// TAMAMEN JAVASCRIPT ILE ARAYÜZ (UI) OLUŞTURMA
function gizliArayuzOlustur(hedefKutu) {
    arayuzOlustu = true;

    // 1. Dış panel kutusunu oluşturuyoruz
    const gizliPanel = document.createElement('div');
    gizliPanel.style.background = "#111";
    gizliPanel.style.border = "2px dashed #4caf50";
    gizliPanel.style.padding = "20px";
    gizliPanel.style.borderRadius = "10px";
    gizliPanel.style.maxWidth = "500px";
    gizliPanel.style.margin = "20px auto";

    // 2. Başlık ekliyoruz
    const baslik = document.createElement('h2');
    baslik.innerText = "🔓 Geliştirici Oyun Modu Aktif";
    baslik.style.color = "#4caf50";
    gizliPanel.appendChild(baslik);

    // 3. Açıklama yazısı ekliyoruz
    const aciklama = document.createElement('p');
    aciklama.innerText = "Gizli pencerede (about:blank) açmak için bir oyuna tıklayın:";
    gizliPanel.appendChild(aciklama);

    // 4. Her oyun için JS ile buton üretiyoruz
    oyunlar.forEach(oyun => {
        const buton = document.createElement('button');
        buton.innerText = oyun.isim;
        
        // Butonun renkleri ve şekli
        buton.style.background = "#e91e63";
        buton.style.color = "white";
        buton.style.border = "none";
        buton.style.padding = "10px 20px";
        buton.style.margin = "5px";
        buton.style.borderRadius = "5px";
        buton.style.cursor = "pointer";
        buton.style.fontSize = "14px";
        
        // Fare üzerine gelince renk değiştirme (Hover) efekti
        buton.onmouseover = () => buton.style.background = "#c2185b";
        buton.onmouseout = () => buton.style.background = "#e91e63";

        // Tıklanınca maskeli pencereyi açma komutu
        buton.onclick = () => oyunuBaslat(oyun.link);

        // Butonu panele ekle
        gizliPanel.appendChild(buton);
    });

    // 5. Hazırladığımız tüm bu gizli paneli sayfaya enjekte et
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
}
