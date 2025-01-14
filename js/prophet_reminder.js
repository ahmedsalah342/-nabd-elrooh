class ProphetReminder {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.setupEventListeners();
        this.setupAudio();
        this.startReminder();
    }

    initializeElements() {
        this.toggleSwitch = document.getElementById('prophetReminderToggle');
        this.soundToggle = document.getElementById('prophetReminderSoundToggle');
        this.volumeSlider = document.getElementById('prophetReminderVolume');
        this.volumeValue = this.volumeSlider.nextElementSibling;
        this.frequencySelect = document.getElementById('prophetReminderFrequency');
        this.testSoundButton = document.getElementById('testProphetSound');
        this.testReminderButton = document.getElementById('testProphetReminder');
    }

    loadSettings() {
        this.settings = {
            enabled: localStorage.getItem('prophetReminder') !== 'false',
            soundEnabled: localStorage.getItem('prophetReminderSound') !== 'false',
            volume: parseInt(localStorage.getItem('prophetReminderVolume')) || 50,
            frequency: parseInt(localStorage.getItem('prophetReminderFrequency')) || 60
        };

        // تطبيق الإعدادات
        this.toggleSwitch.checked = this.settings.enabled;
        this.soundToggle.checked = this.settings.soundEnabled;
        this.volumeSlider.value = this.settings.volume;
        this.volumeValue.textContent = `${this.settings.volume}%`;
        this.frequencySelect.value = this.settings.frequency;
    }

    setupEventListeners() {
        // مراقبة تغييرات التفعيل
        this.toggleSwitch.addEventListener('change', () => {
            this.settings.enabled = this.toggleSwitch.checked;
            localStorage.setItem('prophetReminder', this.settings.enabled);
            if (this.settings.enabled) {
                this.startReminder();
            } else {
                this.stopReminder();
            }
        });

        // مراقبة تغييرات الصوت
        this.soundToggle.addEventListener('change', () => {
            this.settings.soundEnabled = this.soundToggle.checked;
            localStorage.setItem('prophetReminderSound', this.settings.soundEnabled);
        });

        // مراقبة تغييرات مستوى الصوت
        this.volumeSlider.addEventListener('input', () => {
            this.settings.volume = this.volumeSlider.value;
            this.volumeValue.textContent = `${this.settings.volume}%`;
            localStorage.setItem('prophetReminderVolume', this.settings.volume);
            this.updateVolume();
        });

        // مراقبة تغييرات التكرار
        this.frequencySelect.addEventListener('change', () => {
            this.settings.frequency = parseInt(this.frequencySelect.value);
            localStorage.setItem('prophetReminderFrequency', this.settings.frequency);
            this.restartReminder();
        });

        // أزرار التجربة
        this.testSoundButton.addEventListener('click', () => this.testSound());
        this.testReminderButton.addEventListener('click', () => this.testReminder());
    }

    setupAudio() {
        this.audio = new Audio('../audio/reminders/رنين صلى على محمد.mp3');
        this.updateVolume();
    }

    updateVolume() {
        this.audio.volume = this.settings.volume / 100;
    }

    playSound() {
        if (!this.settings.soundEnabled) return;
        this.audio.currentTime = 0;
        this.audio.play().catch(error => {
            console.error('خطأ في تشغيل الصوت:', error);
        });
    }

    testSound() {
        this.playSound();
    }

    testReminder() {
        const reminderTexts = [
            'صلِّ على النبي ﷺ',
            'اللهم صل وسلم على نبينا محمد ﷺ',
            'اللهم صل وسلم وبارك على سيدنا محمد ﷺ'
        ];
        const randomText = reminderTexts[Math.floor(Math.random() * reminderTexts.length)];
        this.showReminder(randomText);
    }

    showReminder(text) {
        // إظهار الإشعار
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('تذكير بالصلاة على النبي ﷺ', {
                    body: text,
                    icon: '../images/icon128.png'
                });
                this.playSound();
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        this.showReminder(text);
                    }
                });
            }
        }
    }

    startReminder() {
        if (!this.settings.enabled) return;
        this.stopReminder();
        
        const reminderTexts = [
            'صلِّ على النبي ﷺ',
            'اللهم صل وسلم على نبينا محمد ﷺ',
            'اللهم صل وسلم وبارك على سيدنا محمد ﷺ'
        ];

        this.reminderInterval = setInterval(() => {
            const randomText = reminderTexts[Math.floor(Math.random() * reminderTexts.length)];
            this.showReminder(randomText);
        }, this.settings.frequency * 60 * 1000); // تحويل الدقائق إلى ميلي ثانية
    }

    stopReminder() {
        if (this.reminderInterval) {
            clearInterval(this.reminderInterval);
            this.reminderInterval = null;
        }
    }

    restartReminder() {
        this.stopReminder();
        this.startReminder();
    }
}

// تهيئة التذكير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.prophetReminder = new ProphetReminder();
});
