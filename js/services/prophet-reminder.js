// مدير تذكير الصلاة على النبي ﷺ
class ProphetReminderManager {
    constructor() {
        this.initializeSettings();
        this.loadSounds();
        this.setupEventListeners();
        this.startReminder();
    }

    // تهيئة الإعدادات
    initializeSettings() {
        // استرجاع الإعدادات المحفوظة أو استخدام الإعدادات الافتراضية
        this.settings = {
            enabled: localStorage.getItem('prophetReminder') !== 'false',
            soundEnabled: localStorage.getItem('prophetReminderSound') !== 'false',
            volume: parseInt(localStorage.getItem('prophetReminderVolume')) || 50,
            frequency: parseInt(localStorage.getItem('prophetReminderFrequency')) || 60 // بالدقائق
        };

        // تحديث واجهة المستخدم
        this.updateUI();
    }

    // تحميل الأصوات
    loadSounds() {
        this.sound = new Audio('../audio/reminders/prophet-reminder.mp3');
        this.updateVolume();
    }

    // تحديث واجهة المستخدم
    updateUI() {
        const toggleElement = document.getElementById('prophetReminderToggle');
        const soundToggleElement = document.getElementById('prophetReminderSoundToggle');
        const volumeElement = document.getElementById('prophetReminderVolume');
        const frequencyElement = document.getElementById('prophetReminderFrequency');

        if (toggleElement) toggleElement.checked = this.settings.enabled;
        if (soundToggleElement) soundToggleElement.checked = this.settings.soundEnabled;
        if (volumeElement) volumeElement.value = this.settings.volume;
        if (frequencyElement) frequencyElement.value = this.settings.frequency;

        // تحديث عرض قيمة مستوى الصوت
        const volumeValueElement = document.querySelector('.volume-value');
        if (volumeValueElement) {
            volumeValueElement.textContent = this.settings.volume + '%';
        }
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        document.getElementById('prophetReminderToggle')?.addEventListener('change', (e) => {
            this.settings.enabled = e.target.checked;
            localStorage.setItem('prophetReminder', e.target.checked);
            if (e.target.checked) {
                this.startReminder();
            } else {
                this.stopReminder();
            }
        });

        document.getElementById('prophetReminderSoundToggle')?.addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            localStorage.setItem('prophetReminderSound', e.target.checked);
        });

        document.getElementById('prophetReminderVolume')?.addEventListener('input', (e) => {
            this.settings.volume = e.target.value;
            localStorage.setItem('prophetReminderVolume', e.target.value);
            this.updateVolume();
            
            // تحديث عرض قيمة مستوى الصوت
            const volumeValueElement = document.querySelector('.volume-value');
            if (volumeValueElement) {
                volumeValueElement.textContent = e.target.value + '%';
            }
        });

        document.getElementById('prophetReminderFrequency')?.addEventListener('change', (e) => {
            this.settings.frequency = parseInt(e.target.value);
            localStorage.setItem('prophetReminderFrequency', e.target.value);
            this.restartReminder();
        });

        document.getElementById('testProphetSound')?.addEventListener('click', () => {
            this.playSound();
        });

        document.getElementById('testProphetReminder')?.addEventListener('click', () => {
            this.showNotification();
        });
    }

    // تحديث مستوى الصوت
    updateVolume() {
        this.sound.volume = this.settings.volume / 100;
    }

    // تشغيل الصوت
    playSound() {
        if (this.settings.soundEnabled) {
            this.sound.currentTime = 0;
            this.sound.play();
        }
    }

    // عرض الإشعار
    showNotification() {
        if (!('Notification' in window)) {
            console.log('هذا المتصفح لا يدعم الإشعارات');
            return;
        }

        if (Notification.permission === 'granted') {
            const notification = new Notification('الصلاة على النبي ﷺ', {
                body: 'اللهم صل وسلم وبارك على سيدنا محمد',
                icon: '../images/icon.png',
                silent: true
            });

            if (this.settings.soundEnabled) {
                this.playSound();
            }
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showNotification();
                }
            });
        }
    }

    // بدء التذكير
    startReminder() {
        if (this.settings.enabled) {
            this.reminderInterval = setInterval(() => {
                this.showNotification();
            }, this.settings.frequency * 60 * 1000);
        }
    }

    // إيقاف التذكير
    stopReminder() {
        if (this.reminderInterval) {
            clearInterval(this.reminderInterval);
        }
    }

    // إعادة تشغيل التذكير
    restartReminder() {
        this.stopReminder();
        this.startReminder();
    }
}

// إنشاء كائن مدير التذكير وإضافته للنافذة
window.prophetReminderManager = new ProphetReminderManager();
