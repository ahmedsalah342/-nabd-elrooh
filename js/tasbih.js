// تعريف المتغيرات الرئيسية
let tasbihCount = 0;
let dailyTotal = 0;
let bestStreak = 0;
let currentStreak = 0;
let vibrateEnabled = true;
let targetCount = 33;

// تعريف الأذكار
const dhikrTypes = {
    custom: { text: "تسبيح مخصص", target: 33 },
    subhanallah: { text: "سبحان الله", target: 33 },
    alhamdulillah: { text: "الحمد لله", target: 33 },
    allahuakbar: { text: "الله أكبر", target: 33 },
    astagfirullah: { text: "أستغفر الله", target: 100 },
    lailahaillallah: { text: "لا إله إلا الله", target: 100 }
};

// تحميل البيانات المحفوظة
function loadSavedData() {
    dailyTotal = parseInt(localStorage.getItem('dailyTotal')) || 0;
    bestStreak = parseInt(localStorage.getItem('bestStreak')) || 0;
    vibrateEnabled = localStorage.getItem('vibrateEnabled') !== 'false';
    
    // تحديث العرض
    updateDisplay();
}

// تحديث الذكر
function changeDhikr() {
    const select = document.getElementById('dhikr-select');
    const selectedDhikr = dhikrTypes[select.value];
    
    document.getElementById('current-dhikr').textContent = selectedDhikr.text;
    targetCount = selectedDhikr.target;
    document.getElementById('tasbih-target').textContent = `/${targetCount}`;
    
    // إعادة تعيين العداد
    resetTasbih();
}

// زيادة العداد
function incrementTasbih() {
    tasbihCount++;
    dailyTotal++;
    currentStreak++;
    
    // تحديث أفضل تسلسل
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        localStorage.setItem('bestStreak', bestStreak);
    }
    
    // حفظ المجموع اليومي
    localStorage.setItem('dailyTotal', dailyTotal);
    
    // تحديث العرض
    updateDisplay();
    
    // اهتزاز عند الضغط
    if (vibrateEnabled && navigator.vibrate) {
        navigator.vibrate(20);
    }
    
    // تشغيل الصوت
    playTasbihSound();
    
    // التحقق من اكتمال الدورة
    if (tasbihCount >= targetCount) {
        celebrateCompletion();
    }
}

// تحديث العرض
function updateDisplay() {
    document.getElementById('tasbih-count').textContent = tasbihCount;
    document.getElementById('daily-total').textContent = dailyTotal;
    document.getElementById('best-streak').textContent = bestStreak;
    
    // تحديث دائرة التقدم
    const progress = (tasbihCount / targetCount) * 100;
    document.getElementById('tasbih-progress').style.background = 
        `conic-gradient(var(--primary-color) ${progress}%, transparent ${progress}%)`;
}

// إعادة تعيين العداد
function resetTasbih() {
    tasbihCount = 0;
    currentStreak = 0;
    updateDisplay();
}

// تبديل الاهتزاز
function toggleVibration() {
    vibrateEnabled = !vibrateEnabled;
    localStorage.setItem('vibrateEnabled', vibrateEnabled);
    
    // تحديث شكل الزر
    const vibrateBtn = document.querySelector('.vibrate-btn i');
    vibrateBtn.style.opacity = vibrateEnabled ? 1 : 0.5;
}

// تشغيل صوت التسبيح
function playTasbihSound() {
    const audio = new Audio('sounds/click.mp3');
    audio.play().catch(() => {
        // تجاهل الأخطاء في حالة عدم دعم الصوت
    });
}

// الاحتفال باكتمال الدورة
function celebrateCompletion() {
    // اهتزاز طويل
    if (vibrateEnabled && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
    
    // تأثير بصري
    const tasbihCircle = document.querySelector('.tasbih-circle');
    tasbihCircle.style.animation = 'spin 1s linear';
    setTimeout(() => {
        tasbihCircle.style.animation = '';
    }, 1000);
}

// إعادة تعيين المجموع اليومي عند منتصف الليل
function checkDayReset() {
    const lastReset = localStorage.getItem('lastResetDate');
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
        dailyTotal = 0;
        localStorage.setItem('dailyTotal', 0);
        localStorage.setItem('lastResetDate', today);
        updateDisplay();
    }
}

// تهيئة المسبحة
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    checkDayReset();
    
    // تحديث الذكر الافتراضي
    changeDhikr();
});
