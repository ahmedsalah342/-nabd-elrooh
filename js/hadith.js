// قاعدة بيانات الأحاديث
const hadiths = [
    {
        number: 1,
        category: 'iman',
        categoryName: 'كتاب الإيمان',
        text: 'عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ ﷺ يَقُولُ: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى"',
        narrator: 'رواه البخاري ومسلم'
    },
    {
        number: 2,
        category: 'iman',
        categoryName: 'كتاب الإيمان',
        text: 'عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: "الْإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الْأَذَى عَنِ الطَّرِيقِ، وَالْحَيَاءُ شُعْبَةٌ مِنَ الْإِيمَانِ"',
        narrator: 'رواه البخاري ومسلم'
    },
    {
        number: 3,
        category: 'salah',
        categoryName: 'كتاب الصلاة',
        text: 'عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: قَالَ رَسُولُ اللَّهِ ﷺ: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ"',
        narrator: 'رواه البخاري ومسلم'
    }
    // يمكن إضافة المزيد من الأحاديث هنا
];

let currentPage = 1;
const itemsPerPage = 5;
let filteredHadiths = [...hadiths];

// تحميل الأحاديث
function loadHadiths() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageHadiths = filteredHadiths.slice(startIndex, endIndex);
    
    const hadithList = document.getElementById('hadith-list');
    hadithList.innerHTML = '';
    
    pageHadiths.forEach(hadith => {
        const hadithElement = document.createElement('div');
        hadithElement.className = 'hadith-item';
        hadithElement.innerHTML = `
            <div class="hadith-number">حديث رقم ${hadith.number}</div>
            <div class="hadith-text">${hadith.text}</div>
            <div class="hadith-narrator">${hadith.narrator}</div>
            <div class="hadith-category">${hadith.categoryName}</div>
        `;
        hadithList.appendChild(hadithElement);
    });
    
    updatePagination();
}

// تحديث أزرار التنقل
function updatePagination() {
    const totalPages = Math.ceil(filteredHadiths.length / itemsPerPage);
    document.getElementById('page-info').textContent = `صفحة ${currentPage} من ${totalPages}`;
    
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

// الانتقال للصفحة السابقة
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadHadiths();
    }
}

// الانتقال للصفحة التالية
function nextPage() {
    const totalPages = Math.ceil(filteredHadiths.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        loadHadiths();
    }
}

// البحث في الأحاديث
function searchHadith() {
    const searchTerm = document.getElementById('hadith-search').value.toLowerCase();
    const category = document.getElementById('hadith-category').value;
    
    filteredHadiths = hadiths.filter(hadith => {
        const matchesSearch = hadith.text.toLowerCase().includes(searchTerm) ||
                            hadith.narrator.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || hadith.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    currentPage = 1;
    loadHadiths();
}

// تصفية الأحاديث حسب الباب
function filterHadithByCategory() {
    searchHadith();
}

// تهيئة القسم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadHadiths();
});
