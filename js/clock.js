// Clock Module
export function initClock() {
    setupAnalogClock();
    setupDigitalClock();
    startClock(); 
}

function setupAnalogClock() {
    const clockContainer = document.getElementById('analog-clock');
    if (!clockContainer) return;

    // Create clock face
    const clockFace = document.createElement('div');
    clockFace.className = 'clock-face';

    // Add hour markers
    for (let i = 1; i <= 12; i++) {
        const marker = document.createElement('div');
        marker.className = 'hour-marker';
        marker.style.transform = `rotate(${i * 30}deg)`;
        clockFace.appendChild(marker);
    }

    // Add clock hands
    const hands = ['hour', 'minute', 'second'].map(type => {
        const hand = document.createElement('div');
        hand.className = `${type}-hand`;
        hand.id = `${type}-hand`;
        return hand;
    });

    hands.forEach(hand => clockFace.appendChild(hand));
    clockContainer.appendChild(clockFace);
}

function setupDigitalClock() {
    const digitalClock = document.getElementById('digital-clock');
    if (!digitalClock) return;
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // تحديث العقارب
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    // حساب زوايا العقارب
    const secondAngle = (seconds / 60) * 360;
    const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
    const hourAngle = ((hours + minutes / 60) / 12) * 360;

    // تحديث العقارب
    if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${secondAngle}deg)`;

    // تحديث الساعة الرقمية
    const digitalClock = document.getElementById('digital-clock');
    if (digitalClock) {
        const formattedHours = String(now.getHours()).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        digitalClock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}

// تحديث الساعة كل ثانية
function startClock() {
    updateClock(); // تحديث فوري
    setInterval(updateClock, 1000);
}

// Hijri Date
function getHijriDate() {
    const today = new Date();
    
    // Convert to Hijri using a simple approximation
    const islamicYear = Math.floor((today.getFullYear() - 622) * (33/32));
    const islamicMonth = today.getMonth();
    const islamicDay = today.getDate();
    
    // Arabic month names
    const hijriMonths = [
        "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
        "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
        "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
    ];
    
    return {
        year: islamicYear,
        month: hijriMonths[islamicMonth],
        day: islamicDay
    };
}

// Update Hijri date display
function updateHijriDate() {
    const hijriDateElement = document.getElementById('hijri-date');
    if (!hijriDateElement) return;
    
    const hijriDate = getHijriDate();
    hijriDateElement.textContent = `${hijriDate.day} ${hijriDate.month} ${hijriDate.year}`;
}

// Update Hijri date when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateHijriDate();
    // Update Hijri date every day
    setInterval(updateHijriDate, 24 * 60 * 60 * 1000);
});
