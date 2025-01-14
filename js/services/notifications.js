// مدير التنبيهات
class NotificationManager {
    constructor() {
        this.checkPermission();
        this.initializeNotifications();
        this.initializeProphetReminder();
        this.prophetReminderSound = new Audio('./audio/reminders/prophet-reminder.mp3');
    }

    // التحقق من إذن التنبيهات
    async checkPermission() {
        if (!('Notification' in window)) {
            console.log('هذا المتصفح لا يدعم التنبيهات');
            return;
        }

        if (Notification.permission !== 'granted') {
            await Notification.requestPermission();
        }
    }

    // تهيئة التنبيهات
    initializeNotifications() {
        this.prayerNotificationsEnabled = localStorage.getItem('prayerNotifications') === 'true';
        this.athkarNotificationsEnabled = localStorage.getItem('athkarNotifications') === 'true';
        this.notificationTime = parseInt(localStorage.getItem('adhanNotification')) || 15;

        if (this.prayerNotificationsEnabled) {
            this.startPrayerNotifications();
        }

        if (this.athkarNotificationsEnabled) {
            this.startAthkarNotifications();
        }
    }

    // تهيئة تذكير الصلاة على النبي
    initializeProphetReminder() {
        this.prophetReminderEnabled = localStorage.getItem('prophetReminder') === 'true';
        if (this.prophetReminderEnabled) {
            this.startProphetReminder();
        }
    }

    // بدء تنبيهات الصلاة
    startPrayerNotifications() {
        setInterval(() => {
            if (!this.prayerNotificationsEnabled) return;
            
            const prayers = window.prayerTimesManager.getTodayPrayers();
            const now = new Date();
            
            for (const [prayer, time] of Object.entries(prayers)) {
                const prayerTime = new Date(time);
                const timeDiff = (prayerTime - now) / (1000 * 60); // الفرق بالدقائق
                
                if (timeDiff > 0 && timeDiff <= this.notificationTime) {
                    this.showNotification(
                        'تنبيه الصلاة',
                        `اقتربت صلاة ${this.getPrayerNameArabic(prayer)}`,
                        'icons/prayer.png'
                    );
                }
            }
        }, 60000); // فحص كل دقيقة
    }

    // بدء تنبيهات الأذكار
    startAthkarNotifications() {
        // أذكار الصباح
        const morningTime = new Date();
        morningTime.setHours(7, 0, 0);
        
        // أذكار المساء
        const eveningTime = new Date();
        eveningTime.setHours(16, 0, 0);
        
        setInterval(() => {
            if (!this.athkarNotificationsEnabled) return;
            
            const now = new Date();
            const randomThikr = this.getRandomThikr();
            
            // تنبيه عشوائي كل ساعتين
            if (now.getMinutes() === 0 && now.getSeconds() === 0) {
                this.showNotification(
                    'ذكر',
                    randomThikr,
                    'icons/athkar.png'
                );
            }
            
            // أذكار الصباح والمساء
            if (now.getHours() === morningTime.getHours() && now.getMinutes() === 0) {
                this.showNotification(
                    'أذكار الصباح',
                    'حان وقت أذكار الصباح',
                    'icons/morning.png'
                );
            }
            
            if (now.getHours() === eveningTime.getHours() && now.getMinutes() === 0) {
                this.showNotification(
                    'أذكار المساء',
                    'حان وقت أذكار المساء',
                    'icons/evening.png'
                );
            }
        }, 1000); // فحص كل ثانية
    }

    // بدء تذكير الصلاة على النبي
    startProphetReminder() {
        const reminderTexts = [
            'صلِّ على النبي ﷺ',
            'اللهم صل وسلم على نبينا محمد ﷺ',
            'من صلى عليَّ صلاةً صلى الله عليه بها عشراً ﷺ',
            'أكثروا من الصلاة عليَّ يوم الجمعة ﷺ'
        ];

        // تذكير كل ساعة
        setInterval(() => {
            const randomText = reminderTexts[Math.floor(Math.random() * reminderTexts.length)];
            this.showProphetReminder(randomText);
        }, 3600000); // كل ساعة

        // تذكير خاص يوم الجمعة
        setInterval(() => {
            const now = new Date();
            if (now.getDay() === 5) { // يوم الجمعة
                this.showProphetReminder(
                    'أكثروا من الصلاة عليَّ يوم الجمعة فإنه مشهود تشهده الملائكة ﷺ',
                    true
                );
            }
        }, 7200000); // كل ساعتين يوم الجمعة
    }

    // عرض التنبيه
    showNotification(title, body, icon) {
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: icon,
                silent: false
            });
        }
    }

    // عرض تذكير الصلاة على النبي مع الصوت
    showProphetReminder(text, isFriday = false) {
        // عرض الإشعار
        this.showNotification(
            isFriday ? 'فضل الصلاة على النبي ﷺ' : 'تذكير',
            text,
            './icons/prophet.png'
        );

        // تشغيل الصوت إذا كان مفعل
        if (localStorage.getItem('prophetReminderSound') !== 'false') {
            this.prophetReminderSound.play().catch(error => {
                console.log('خطأ في تشغيل الصوت:', error);
            });
        }
    }

    // الحصول على اسم الصلاة بالعربية
    getPrayerNameArabic(prayer) {
        const names = {
            fajr: 'الفجر',
            sunrise: 'الشروق',
            dhuhr: 'الظهر',
            asr: 'العصر',
            maghrib: 'المغرب',
            isha: 'العشاء'
        };
        return names[prayer] || prayer;
    }

    // الحصول على ذكر عشوائي
    getRandomThikr() {
        const athkar = [
            'سبحان الله وبحمده',
            'اللهم صل على محمد',
            'استغفر الله العظيم',
            'لا إله إلا الله',
            'الله أكبر',
            'سبحان الله العظيم',
            'الحمد لله رب العالمين'
        ];
        return athkar[Math.floor(Math.random() * athkar.length)];
    }

    // تفعيل/تعطيل تنبيهات الصلاة
    togglePrayerNotifications(enabled) {
        this.prayerNotificationsEnabled = enabled;
        localStorage.setItem('prayerNotifications', enabled);
        if (enabled) {
            this.checkPermission();
            this.startPrayerNotifications();
        }
    }

    // تفعيل/تعطيل تنبيهات الأذكار
    toggleAthkarNotifications(enabled) {
        this.athkarNotificationsEnabled = enabled;
        localStorage.setItem('athkarNotifications', enabled);
        if (enabled) {
            this.checkPermission();
            this.startAthkarNotifications();
        }
    }

    // تحديث وقت التنبيه قبل الصلاة
    updateNotificationTime(minutes) {
        this.notificationTime = parseInt(minutes);
        localStorage.setItem('adhanNotification', minutes);
    }
}

// إنشاء كائن مدير التنبيهات عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    window.notificationManager = new NotificationManager();
});
