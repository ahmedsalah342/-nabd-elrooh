class ProphetReminderSettings {
    constructor() {
        this.initializeElements();
        this.loadSettings();
        this.setupEventListeners();
        this.setupAudio();
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
        // تحميل الإعدادات المحفوظة
        this.settings = {
            enabled: localStorage.getItem('prophetReminder') !== 'false',
            soundEnabled: localStorage.getItem('prophetReminderSound') !== 'false',
            volume: parseInt(localStorage.getItem('prophetReminderVolume')) || 50,
            frequency: parseInt(localStorage.getItem('prophetReminderFrequency')) || 60
        };

        // تطبيق الإعدادات على العناصر
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
            if (this.settings.enabled) {
                this.restartReminder();
            }
        });

        // أزرار التجربة
        this.testSoundButton.addEventListener('click', () => this.testSound());
        this.testReminderButton.addEventListener('click', () => this.testReminder());
    }

    setupAudio() {
        this.reminderSounds = [
            new Audio('../audio/reminders/prophet-reminder1.mp3'),
            new Audio('../audio/reminders/prophet-reminder2.mp3'),
            new Audio('../audio/reminders/prophet-reminder3.mp3')
        ];
        this.updateVolume();
    }

    updateVolume() {
        this.reminderSounds.forEach(sound => {
            sound.volume = this.settings.volume / 100;
        });
    }

    testSound() {
        if (!this.settings.soundEnabled) return;
        const randomSound = this.reminderSounds[Math.floor(Math.random() * this.reminderSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play();
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
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('تذكير بالصلاة على النبي ﷺ', {
                body: text,
                icon: '../images/icon128.png'
            });
        }

        // تشغيل الصوت
        if (this.settings.soundEnabled) {
            this.testSound();
        }
    }

    startReminder() {
        this.stopReminder();
        this.reminderInterval = setInterval(() => {
            this.testReminder();
        }, this.settings.frequency * 60 * 1000);
    }

    stopReminder() {
        if (this.reminderInterval) {
            clearInterval(this.reminderInterval);
        }
    }

    restartReminder() {
        if (this.settings.enabled) {
            this.startReminder();
        }
    }
}

// تهيئة إعدادات التذكير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.prophetReminderSettings = new ProphetReminderSettings();
});
