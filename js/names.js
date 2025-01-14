// قائمة أسماء الله الحسنى
const divineNames = [
    {
        name: "الله",
        meaning: "الإله المعبود بحق",
        explanation: "هو الإله المعبود بحق، الجامع لصفات الألوهية والربوبية والأسماء الحسنى"
    },
    {
        name: "الرحمن",
        meaning: "ذو الرحمة الواسعة",
        explanation: "هو الذي وسعت رحمته كل شيء في الدنيا والآخرة"
    },
    {
        name: "الرحيم",
        meaning: "ذو الرحمة الواصلة",
        explanation: "هو الذي يوصل رحمته لمن يشاء من عباده"
    },
    {
        name: "الملك",
        meaning: "المالك المتصرف",
        explanation: "هو المالك لجميع الأشياء، المتصرف فيها كيف يشاء"
    },
    {
        name: "القدوس",
        meaning: "الطاهر المنزه",
        explanation: "هو المنزه عن كل عيب ونقص وعن كل ما لا يليق بكماله"
    },
    {
        name: "السلام",
        meaning: "السالم من النقائص",
        explanation: "هو السالم من كل عيب ونقص وآفة، والذي يسلم عباده المؤمنين"
    },
    {
        name: "المؤمن",
        meaning: "الذي يؤمن عباده",
        explanation: "هو الذي يؤمن عباده من عذابه، ويصدق وعده لرسله وأوليائه"
    },
    {
        name: "المهيمن",
        meaning: "الرقيب الحافظ",
        explanation: "هو الرقيب على خلقه، المطلع على كل شيء، الحافظ لكل شيء"
    },
    {
        name: "العزيز",
        meaning: "القوي الغالب",
        explanation: "هو القوي الذي لا يُغلب، والغالب الذي لا يُقهر"
    },
    {
        name: "الجبار",
        meaning: "العالي القاهر",
        explanation: "هو العالي فوق خلقه، القاهر لهم على ما أراد، الذي يجبر الكسير ويغني الفقير"
    },
    {
        name: "المتكبر",
        meaning: "المتعالي عن صفات الخلق",
        explanation: "هو المتعالي عن صفات الخلق ونقائصهم، المتفرد بالعظمة والكبرياء"
    },
    {
        name: "الخالق",
        meaning: "الموجد من العدم",
        explanation: "هو الذي خلق كل شيء من العدم، وقدر كل شيء تقديراً"
    },
    {
        name: "البارئ",
        meaning: "المنشئ الموجد",
        explanation: "هو الذي خلق الخلق بريئاً من التفاوت، وأنشأهم على غير مثال سابق"
    },
    {
        name: "المصور",
        meaning: "المعطي للصور",
        explanation: "هو الذي صور جميع الموجودات، وأعطى كل شيء صورته وشكله المميز له عن غيره"
    },
    {
        name: "الغفار",
        meaning: "كثير المغفرة",
        explanation: "هو الذي يغفر الذنوب ويستر العيوب، ويتجاوز عن السيئات"
    },
    {
        name: "القهار",
        meaning: "الغالب لكل شيء",
        explanation: "هو الذي قهر جميع الخلائق بقدرته، وخضعت له الرقاب وذلت له الجبابرة"
    },
    {
        name: "الوهاب",
        meaning: "كثير العطاء",
        explanation: "هو الذي يهب ويعطي بلا عوض ولا مقابل، الجواد الكريم"
    },
    {
        name: "الرزاق",
        meaning: "المتكفل بالرزق",
        explanation: "هو الذي يخلق الرزق ويوصله إلى جميع المخلوقات"
    },
    {
        name: "الفتاح",
        meaning: "الحاكم العادل",
        explanation: "هو الذي يفتح أبواب الرحمة والرزق لعباده، ويحكم بينهم بالعدل"
    },
    {
        name: "العليم",
        meaning: "العالم بكل شيء",
        explanation: "هو الذي أحاط علمه بكل شيء ظاهراً وباطناً، سراً وعلانية"
    },
    {
        name: "القابض",
        meaning: "المضيق",
        explanation: "هو الذي يقبض الرزق عمن يشاء بحكمته وعدله"
    },
    {
        name: "الباسط",
        meaning: "الموسع",
        explanation: "هو الذي يبسط الرزق ويوسعه على من يشاء من عباده"
    },
    {
        name: "الخافض",
        meaning: "المذل",
        explanation: "هو الذي يخفض من شاء من الظالمين والمتكبرين"
    },
    {
        name: "الرافع",
        meaning: "المعز المكرم",
        explanation: "هو الذي يرفع من يشاء من عباده بالعلم والإيمان والطاعة"
    },
    {
        name: "المعز",
        meaning: "المكرم المقوي",
        explanation: "هو الذي يهب العزة لمن يشاء من عباده"
    },
    {
        name: "المذل",
        meaning: "المهين",
        explanation: "هو الذي يذل من يشاء من عباده بعدله وحكمته"
    },
    {
        name: "السميع",
        meaning: "السامع لكل شيء",
        explanation: "هو الذي يسمع جميع الأصوات الظاهرة والخفية"
    },
    {
        name: "البصير",
        meaning: "المبصر لكل شيء",
        explanation: "هو الذي يرى كل شيء وإن دق وصغر"
    },
    {
        name: "الحكم",
        meaning: "القاضي",
        explanation: "هو الذي يحكم بين عباده بالعدل والقسط"
    },
    {
        name: "العدل",
        meaning: "العادل في كل شيء",
        explanation: "هو الذي لا يجور في حكمه، ويضع كل شيء في موضعه"
    }
];

// الآية القرآنية
const quranVerse = "وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا ۖ وَذَرُوا الَّذِينَ يُلْحِدُونَ فِي أَسْمَائِهِ ۚ سَيُجْزَوْنَ مَا كَانُوا يَعْمَلُونَ";

// المتغيرات العامة
let currentNameIndex = 0;

// تحميل محتوى أسماء الله الحسنى
function loadNamesContent() {
    const namesContainer = document.getElementById('names-container');
    if (!namesContainer) return;

    // إنشاء هيكل القسم
    namesContainer.innerHTML = `
        <div class="quran-verse">${quranVerse}</div>
        
        <div class="names-strip">
            <button class="nav-btn prev-btn" onclick="prevName()">
                <i class="fas fa-chevron-right"></i>
            </button>
            
            <div class="names-scroll"></div>
            
            <button class="nav-btn next-btn" onclick="nextName()">
                <i class="fas fa-chevron-left"></i>
            </button>
        </div>
        
        <div class="explanation-section">
            <div class="name-display"></div>
            
            <div class="meaning-section">
                <div class="meaning-label">المعنى:</div>
                <div class="meaning-text"></div>
            </div>
            
            <div class="explanation-text">
                <div class="explanation-label">الشرح:</div>
                <div class="explanation-content"></div>
            </div>
        </div>
    `;

    // تحميل الأسماء في الشريط
    loadNamesStrip();
    
    // عرض الاسم الأول
    displayName(0);
}

// تحميل الأسماء في الشريط
function loadNamesStrip() {
    const namesScroll = document.querySelector('.names-scroll');
    if (!namesScroll) return;

    namesScroll.innerHTML = divineNames.map((name, index) => `
        <div class="name-card ${index === currentNameIndex ? 'active' : ''}" 
             onclick="displayName(${index})">
            ${name.name}
        </div>
    `).join('');
}

// عرض اسم معين
function displayName(index) {
    if (index < 0 || index >= divineNames.length) return;
    
    currentNameIndex = index;
    const name = divineNames[index];
    
    // تحديث العرض
    document.querySelector('.name-display').textContent = name.name;
    document.querySelector('.meaning-text').textContent = name.meaning;
    document.querySelector('.explanation-content').textContent = name.explanation;
    
    // تحديث الأسماء النشطة
    document.querySelectorAll('.name-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    // تمرير الاسم النشط إلى مركز الشريط
    const activeCard = document.querySelector('.name-card.active');
    if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// الانتقال إلى الاسم السابق
function prevName() {
    const newIndex = currentNameIndex - 1;
    if (newIndex >= 0) {
        displayName(newIndex);
    }
}

// الانتقال إلى الاسم التالي
function nextName() {
    const newIndex = currentNameIndex + 1;
    if (newIndex < divineNames.length) {
        displayName(newIndex);
    }
}

// تحميل المحتوى عند فتح النافذة
document.addEventListener('DOMContentLoaded', () => {
    const namesModal = document.getElementById('names-modal');
    if (namesModal) {
        namesModal.addEventListener('show', loadNamesContent);
    }
});
