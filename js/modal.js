// التحكم في النوافذ المنبثقة
function showModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId + '-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // تحميل المحتوى حسب نوع النافذة
        if (modalId === 'hadith') {
            loadHadithContent();
        } else if (modalId === 'names') {
            loadNamesContent();
        }
    } else {
        console.error('Modal not found:', modalId + '-modal');
    }
}

// إغلاق النافذة المنبثقة
function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    const modal = document.getElementById(modalId + '-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// إغلاق النافذة عند النقر خارجها
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// منع إغلاق النافذة عند النقر داخلها
document.querySelectorAll('.modal-content').forEach(content => {
    content.onclick = function(event) {
        event.stopPropagation();
    }
});

// إغلاق المودال عند الضغط على زر الإغلاق
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.closest('.modal').id;
        closeModal(modalId);
        // الرجوع خطوة للوراء في التاريخ
        history.back();
    });
});

// إغلاق المودال عند الضغط خارجه
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            const modalId = overlay.nextElementSibling.id;
            closeModal(modalId);
            // الرجوع خطوة للوراء في التاريخ
            history.back();
        }
    });
});

// إعادة فتح المودال عند تحديث الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const openModalId = localStorage.getItem('openModal');
    if (openModalId) {
        showModal(openModalId);
    }
});

// تحميل محتوى الأحاديث
function loadHadithContent() {
    const hadithList = document.getElementById('hadith-list');
    if (!hadithList) {
        console.error('Hadith list container not found');
        return;
    }
    
    if (!hadithList.children.length) {
        // إضافة قسم المقدمة
        const introSection = document.createElement('div');
        introSection.className = 'hadith-intro';
        introSection.innerHTML = `
            <h2>صحيح البخاري</h2>
            <p class="author-info">للإمام محمد بن إسماعيل البخاري (194-256هـ)</p>
            <div class="hadith-search">
                <input type="text" id="hadith-search-input" placeholder="ابحث في الأحاديث...">
                <select id="hadith-chapter-select">
                    <option value="all">جميع الأبواب</option>
                    <option value="iman">كتاب الإيمان</option>
                    <option value="ilm">كتاب العلم</option>
                    <option value="taharah">كتاب الطهارة</option>
                    <option value="salah">كتاب الصلاة</option>
                </select>
            </div>
        `;
        hadithList.parentNode.insertBefore(introSection, hadithList);

        // إضافة نموذج للأحاديث
        const hadiths = {
            iman: [
                {
                    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى",
                    narrator: "عمر بن الخطاب رضي الله عنه",
                    chapter: "باب كيف كان بدء الوحي",
                    number: "1"
                },
                {
                    text: "بني الإسلام على خمس: شهادة أن لا إله إلا الله وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، والحج، وصوم رمضان",
                    narrator: "ابن عمر رضي الله عنهما",
                    chapter: "باب أركان الإسلام",
                    number: "8"
                }
            ],
            ilm: [
                {
                    text: "طلب العلم فريضة على كل مسلم",
                    narrator: "أنس بن مالك رضي الله عنه",
                    chapter: "باب فضل العلم",
                    number: "77"
                }
            ]
        };

        // إنشاء عرض الأحاديث
        Object.entries(hadiths).forEach(([category, categoryHadiths]) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'hadith-category';
            categorySection.dataset.category = category;
            
            categoryHadiths.forEach(hadith => {
                const hadithCard = document.createElement('div');
                hadithCard.className = 'hadith-card';
                hadithCard.innerHTML = `
                    <div class="hadith-number">${hadith.number}</div>
                    <div class="hadith-content">
                        <div class="hadith-chapter">${hadith.chapter}</div>
                        <div class="hadith-text">${hadith.text}</div>
                        <div class="hadith-narrator">${hadith.narrator}</div>
                    </div>
                    <div class="hadith-actions">
                        <button class="share-btn" onclick="shareHadith(${hadith.number})">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="copy-btn" onclick="copyHadith(${hadith.number})">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                `;
                categorySection.appendChild(hadithCard);
            });
            
            hadithList.appendChild(categorySection);
        });

        // إضافة وظائف البحث والتصفية
        setupHadithSearch();
    }
}

// إعداد وظائف البحث في الأحاديث
function setupHadithSearch() {
    const searchInput = document.getElementById('hadith-search-input');
    const chapterSelect = document.getElementById('hadith-chapter-select');
    
    if (searchInput && chapterSelect) {
        searchInput.addEventListener('input', filterHadiths);
        chapterSelect.addEventListener('change', filterHadiths);
    }
}

// تصفية الأحاديث
function filterHadiths() {
    const searchInput = document.getElementById('hadith-search-input');
    const chapterSelect = document.getElementById('hadith-chapter-select');
    const searchText = searchInput.value.toLowerCase();
    const selectedChapter = chapterSelect.value;
    
    document.querySelectorAll('.hadith-card').forEach(card => {
        const text = card.querySelector('.hadith-text').textContent.toLowerCase();
        const category = card.closest('.hadith-category').dataset.category;
        
        const matchesSearch = text.includes(searchText);
        const matchesChapter = selectedChapter === 'all' || category === selectedChapter;
        
        card.style.display = matchesSearch && matchesChapter ? 'flex' : 'none';
    });
}

// مشاركة الحديث
function shareHadith(number) {
    // سيتم إضافة وظيفة المشاركة لاحقاً
    console.log('مشاركة الحديث رقم:', number);
}

// نسخ الحديث
function copyHadith(number) {
    const hadithCard = document.querySelector(`.hadith-card[data-number="${number}"]`);
    if (hadithCard) {
        const text = hadithCard.querySelector('.hadith-text').textContent;
        navigator.clipboard.writeText(text).then(() => {
            alert('تم نسخ الحديث بنجاح');
        });
    }
}

// تحميل محتوى أسماء الله الحسنى
function loadNamesContent() {
    // سيتم إضافة المحتوى الجديد لاحقاً
    console.log('تحميل محتوى أسماء الله الحسنى');
}

// تصحيح ارتفاع الشاشة على الموبايل
function setMobileHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

// تحديث الارتفاع عند تغيير حجم الشاشة
window.addEventListener('resize', setMobileHeight);
window.addEventListener('orientationchange', setMobileHeight);
