document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. AÇIK / KOYU TEMA (DARK MODE) LORİĞİ
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });

    // ==========================================
    // 2. POMODORO ZAMANLAYICI LOJİĞİ
    // ==========================================
    let timeLeft = 25 * 60; // 25 dakika
    let timerId = null;
    let isWorkTime = true;

    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const modeStatus = document.getElementById('modeStatus');

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (timerId !== null) return; // Zaten çalışıyorsa tekrar başlatma

        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                
                // Sesli uyarı ver
                const alertAudio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                alertAudio.play().catch(() => {}); // Otomatik oynatma engeline karşı catch

                if (isWorkTime) {
                    alert("Tebrikler! Ders süresi bitti. 5 dakika mola vakti!");
                    isWorkTime = false;
                    timeLeft = 5 * 60;
                    modeStatus.textContent = "Mod: Mola (5 dk)";
                } else {
                    alert("Mola bitti! Tekrar ders başı yapma zamanı.");
                    isWorkTime = true;
                    timeLeft = 25 * 60;
                    modeStatus.textContent = "Mod: Ders Çalışma (25 dk)";
                }
                updateDisplay();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerId);
        timerId = null;
    }

    function resetTimer() {
        pauseTimer();
        isWorkTime = true;
        timeLeft = 25 * 60;
        modeStatus.textContent = "Mod: Ders Çalışma (25 dk)";
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // ==========================================
    // 3. NOT DEFTERİ (LOCALSTORAGE) LOJİĞİ
    // ==========================================
    const noteInput = document.getElementById('noteInput');
    const saveStatus = document.getElementById('saveStatus');

    // Önceki kayıtlı notu çek
    noteInput.value = localStorage.getItem('userNote') || '';

    // Her harf yazıldığında otomatik kaydet
    noteInput.addEventListener('input', () => {
        localStorage.setItem('userNote', noteInput.value);
        saveStatus.textContent = 'Kaydediliyor...';
        setTimeout(() => { 
            saveStatus.textContent = 'Kaydedildi'; 
        }, 500);
    });

    // ==========================================
    // 4. DERS ORTALAMASI HESAPLAMA LOJİĞİ
    // ==========================================
    const calcBtn = document.getElementById('calcBtn');
    const vizeInput = document.getElementById('vize');
    const finalInput = document.getElementById('final');
    const gradeResult = document.getElementById('gradeResult');

    calcBtn.addEventListener('click', () => {
        const vize = parseFloat(vizeInput.value);
        const final = parseFloat(finalInput.value);

        if (isNaN(vize) || isNaN(final) || vize < 0 || vize > 100 || final < 0 || final > 100) {
            gradeResult.textContent = "Lütfen 0-100 arasında geçerli notlar girin!";
            gradeResult.style.color = "var(--accent-color)";
            return;
        }

        const average = (vize * 0.4) + (final * 0.6);
        let letter = '';

        if (average >= 90) letter = 'AA';
        else if (average >= 85) letter = 'BA';
        else if (average >= 80) letter = 'BB';
        else if (average >= 75) letter = 'CB';
        else if (average >= 70) letter = 'CC';
        else if (average >= 65) letter = 'DC';
        else if (average >= 60) letter = 'DD';
        else if (average >= 50) letter = 'FD';
        else letter = 'FF';

        gradeResult.style.color = "var(--text-color)";
        gradeResult.textContent = `Ortalama: ${average.toFixed(2)} | Harf Notu: ${letter}`;
    });

});
